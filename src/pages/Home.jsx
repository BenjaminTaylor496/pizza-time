import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sorting from '../components/Sorting';
import { PizzaBlock } from '../components/PizzaBlock';
import { MyPizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const dispatch = useDispatch();
	//Вытаскиваю хук useDispatch
	const { sort, categoryId } = useSelector(state => state.filter);
	/** 2 useSelector-а можно превратить в 1, это не обязательно, но это помогает в сокращении кода.
	 * Тем более, если обращаюсь к одному и тому же filter.
	 * Переменные categoryId и sort были созданы для того, чтобы потом вытащить state
	 * Иными словами,c помощью useSelector возвращаю то, что нужно из всего state и передаю в переменную {categoryId и sort}*/
	const sortType = sort.sortProperty;
	const { searchValue } = React.useContext(SearchContext);
	/**context слушает изменение контекста. Если SearchContext изменится, весь компонент перерисуется.
	 * И в случае его изменении, компоненты, где был использован useContext() будут перерисовываться.*/
	const [pizzas, setPizzas] = React.useState([]);
	const [pageIsLoading, setPageIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);

	const changeCategory = id => {
		dispatch(setCategoryId(id));
	};

	React.useEffect(() => {
		setPageIsLoading(true);
		/**Перед отправкой запроса на бекэнд setPageIsloading переводится на true, чтобы при сортировке по категориям был виден скелетон карточек  */

		const sortBy = sortType.replace('-', '');
		const order = sortType.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(
			`https://63fccb13677c41587314110b.mockapi.io/pizza-list?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
			.then(res => res.json())
			.then(json => {
				setPizzas(json);
				setPageIsLoading(false);
			});
		window.scrollTo(0, 0);
		/** window.scrollTo() скроллит страницу при рендере на верх или вниз в зависимости от цифр, что написано в () */
	}, [
		categoryId,
		sortType,
		searchValue,
		currentPage,
	]); /**useEffect следи за переменной React.useEffect(()=> {},[categoryIndex]) */
	// const sortBy = sortType.sortProperty.replace('-', '');
	// const click = console.log(sortBy);

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
			<Pagination onChangePage={num => setCurrentPage(num)} />
		</>
	);
};
//  rfc - создание нового компонента

export default Home;
