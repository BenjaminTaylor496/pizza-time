import React from 'react';

import Categories from '../components/Categories';
import Sorting from '../components/Sorting';
import { PizzaBlock } from '../components/PizzaBlock';
import { MyPizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';

const Home = ({ searchValue }) => {
	const [pizzas, setPizzas] = React.useState([]);
	const [pageIsLoading, setPageIsLoading] = React.useState(true);
	const [categoryIndex, setCategoryIndex] = React.useState(0);
	const [sortType, setSortingType] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
	});

	React.useEffect(() => {
		setPageIsLoading(true);
		/**Перед отправкой запроса на бекэнд setPageIsloading переводится на true, чтобы при сортировке по категориям был виден скелетон карточек  */

		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(
			`https://63fccb13677c41587314110b.mockapi.io/pizza-list?${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
			.then(res => res.json())
			.then(json => {
				setPizzas(json);
				setPageIsLoading(false);
			});
		window.scrollTo(0, 0);
		/** window.scrollTo() скроллит страницу при рендере на верх или вниз в зависимости от цифр, что написано в () */
	}, [
		categoryIndex,
		sortType,
		searchValue,
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
				<Categories value={categoryIndex} changeCategory={id => setCategoryIndex(id)} />
				<Sorting value={sortType} changeSort={id => setSortingType(id)} />
			</div>
			<h2 className='content__title'>Все пиццы:</h2>
			<div className='content__items'>{pageIsLoading ? skeletons : items}</div>
		</>
	);
};
//  rfc - создание нового компонента

export default Home;
