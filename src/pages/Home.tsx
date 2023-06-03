import { useEffect, useRef, useCallback, FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { PizzaBlock } from '../components/PizzaBlock';
import { MyPizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import { useAppDispatch } from '../redux/store';
import Sorting, { sortList } from '../components/Sorting';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isMounted = useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);
	/** 2 useSelector-а можно превратить в 1, это не обязательно, но это помогает в сокращении кода.
	 * Тем более, если обращаюсь к одному и тому же filter.
	 * Переменные categoryId и sort были созданы для того, чтобы потом вытащить state
	 * Иными словами,c помощью useSelector возвращаю то, что нужно из всего state и передаю в переменную {categoryId и sort}*/

	const sortType = sort.sortProperty;

	const changeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangePage = (pageNum: number) => {
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
				currentPage: String(currentPage),
			}),
		);
		// "@ts-ignore"- позволяет игнорировать

		window.scrollTo(0, 0);
	};

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		getPizzas();
	}, [categoryId, sortType, searchValue, currentPage]);

	// useEffect(() => {
	// 	// Если был первый рендер, то проеверяем URL-параметры и сохраняем в редуксе
	// 	if (window.location.search) {
	// 		const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
	// 		const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
	// 		dispatch(
	// 			setFilters({
	// 				searchValue: params.search,
	// 				categoryId: Number(params.category),
	// 				currentPage: Number(params.currentPage),
	// 				sort: sort || sortList[0],
	// 			}),
	// 		);
	// 	}
	// 	isMounted.current = true;
	// }, []); // <=== Парсинг параметров, которые находятся в url

	//Если был первый рендер, то только тогда проверяй изменениe параметров, нужно ли их вшивать в URL или не нужно
	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const params = {
	// 			categoryId: categoryId > 0 ? categoryId : null,
	// 			sortProperty: sort.sortProperty,
	// 			currentPage,
	// 		};
	// 		const queryString = qs.stringify(params, { skipNulls: true });

	// 		navigate(`/?${queryString}`);
	// 	}

	// 	if (!window.location.search) {
	// 		dispatch(fetchPizzas({} as SearchPizzaParams));
	// 	}
	// }, [categoryId, sortType, currentPage]);

	const pizza = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
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
				<Categories value={categoryId} changeCategory={changeCategory} />
				<Sorting value={sort} />
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
