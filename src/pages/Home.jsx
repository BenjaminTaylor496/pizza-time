import { useState, useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { PizzaBlock } from '../components/PizzaBlock';
import { MyPizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import Sorting, { sortList } from '../components/Sorting';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { sort, categoryId, currentPage } = useSelector(state => state.filter);
	/** 2 useSelector-а можно превратить в 1, это не обязательно, но это помогает в сокращении кода.
	 * Тем более, если обращаюсь к одному и тому же filter.
	 * Переменные categoryId и sort были созданы для того, чтобы потом вытащить state
	 * Иными словами,c помощью useSelector возвращаю то, что нужно из всего state и передаю в переменную {categoryId и sort}*/
	const sortType = sort.sortProperty;
	const { searchValue } = useContext(SearchContext);
	/**context слушает изменение контекста. Если SearchContext изменится, весь компонент перерисуется.
	 * И в случае его изменении, компоненты, где был использован useContext() будут перерисовываться.*/
	const [pizzas, setPizzas] = useState([]);
	const [pageIsLoading, setPageIsLoading] = useState(true);

	const changeCategory = id => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = pageNum => {
		dispatch(setCurrentPage(pageNum));
	};

	const fetchPizzas = async () => {
		setPageIsLoading(true);
		/**Перед отправкой запроса на бекэнд setPageIsloading переводится на true, чтобы при сортировке по категориям был виден скелетон карточек  */

		const sortBy = sortType.replace('-', '');
		const order = sortType.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		// await axios
		// 	.get(
		// 		`https://642e83dd8ca0fe3352d1a166.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		// 	)
		// 	.then(res => {
		// 		// console.log(res);
		// 		setPizzas(res.data);
		// 		setPageIsLoading(false);
		// 	})
		// 	.catch(err => {
		// 		setPageIsLoading(false);
		// 	});

		/**В строке снизу сказано следующее:
		 * Дождись выполнения запроса (он для себя хранит промисы (Promise));
		 * Когда axios выполнится, свой ответ, который хранится в .then();
		 * Вытащи его из .then() автоматически и передай его в переменную 'res'. Название переменноц может быть любое 
     
     * То есть запрос axios.get() избавляется от .then, вытаскивает ответ(res) из .then() и передает переменной 'res'
     * Данный метод позволяет сократить код избавляясь от .then()
		 */
		const res = await axios.get(
			`https://642e83dd8ca0fe3352d1a166.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		);
		setPizzas(res.data);
		setPageIsLoading(false);

		window.scrollTo(0, 0);
	};

	useEffect(() => {
		//Если был первый рендер, то только тогда проверяй изменениe параметров, нужно ли их вшивать в URL или не нужно
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortType, currentPage]);

	// Если был первый рендер, то проеверяем URL-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, []); // <=== Парсинг параметров, которые находятся в url

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0);
		/** window.scrollTo() скроллит страницу при рендере на верх или вниз в зависимости от цифр, что написано в () */

		if (!isSearch.current) {
			fetchPizzas();
		}
		/**Урок Арчакова №15 про объяснение этого момента на: 18 минуте:00 секунде */

		isSearch.current = false;
	}, [categoryId, sortType, searchValue, currentPage]);

	const items = pizzas.map(obj => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...Array(6)].map((_, index) => <MyPizzaSkeleton key={index} />);

	/**const items = pizzas.filter(obj => {
	  if (obj.title.toLowerCase().includes(searchValue.toLowerCase)) {
	    return true;
	  }

	  return false;
	}) <== Это поиск по статичному массиву */

	return (
		<>
			<div className='content__top'>
				{/* <button onClick={click}> CheckSortBy</button> */}
				<Categories value={categoryId} changeCategory={changeCategory} />
				<Sorting />
			</div>
			<h2 className='content__title'>Все пиццы:</h2>
			<div className='content__items'>{pageIsLoading ? skeletons : items}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	);
};
//  rfc - создание нового компонента

export default Home;
