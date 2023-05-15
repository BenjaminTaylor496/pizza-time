import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useNavigate } from 'react-router';
import qs from 'qs';

import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';
import { PizzaBlock } from '../components/PizzaBlock';
import { MyPizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import Sorting, { sortList } from '../components/Sorting';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isMounted = useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);
	/** 2 useSelector-а можно превратить в 1, это не обязательно, но это помогает в сокращении кода.
	 * Тем более, если обращаюсь к одному и тому же filter.
	 * Переменные categoryId и sort были созданы для того, чтобы потом вытащить state
	 * Иными словами,c помощью useSelector возвращаю то, что нужно из всего state и передаю в переменную {categoryId и sort}*/

	const sortType = sort.sortProperty;
	/**context слушает изменение контекста. Если SearchContext изменится, весь компонент перерисуется.
	 * И в случае его изменении, компоненты, где был использован useContext() будут перерисовываться.*/

	const changeCategory = id => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = pageNum => {
		dispatch(setCurrentPage(pageNum));
	};

	const getPizzas = async () => {
		/**Перед отправкой запроса на бекэнд setPageIsloading переводится на true, чтобы при сортировке по категориям был виден скелетон карточек  */

		const sortBy = sortType.replace('-', '');
		const order = sortType.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		/**В строках снизу содержится следующее:
		 * С помощью try/catch отлавливай ошибки,
		 * И не смотря на то, получил "ОШИБКУ" или "ПИЦЦЫ" из бекэнда,
		 * При помощи finally выполни (setPageIsLoading(false)) <= благодаря finally setPageIsLoading(false) не дублируется, что очень упрощает понимание кода
		 * ===================================================================
		 * Дождись выполнения запроса ;
		 * Когда axios выполнится, свой ответ который хранится в .then(), вытащи из .then() автоматически
		 * А затем, передай его в переменную 'res'. Название переменной может быть любое
		 */

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage,
			}),
		);

		window.scrollTo(0, 0);
	};

	//Если был первый рендер, то только тогда проверяй изменениe параметров, нужно ли их вшивать в URL или не нужно
	useEffect(() => {
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

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		getPizzas();
	}, [categoryId, sortType, searchValue, currentPage]);

	useEffect(() => {
		// Если был первый рендер, то проеверяем URL-параметры и сохраняем в редуксе
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
		}
	}, []); // <=== Парсинг параметров, которые находятся в url

	const pizza = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...Array(4)].map((_, index) => <MyPizzaSkeleton key={index} />);

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
			{status === 'error' ? (
				<div className='content_errorInfo'>
					<h2>Что-то пошло не по плану...</h2>
					<p>К большому сожалению произошла ошибка при получении пицц. Попробуйсте снова</p>
				</div>
			) : (
				<div className='content__items'>{status === 'loading' ? skeletons : pizza}</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	);
};
//  rfc - создание нового компонента

export default Home;
