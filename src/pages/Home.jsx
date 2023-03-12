import React from 'react';

import { Categories } from '../components/Categories';
import Sorting from '../components/Sorting';
import { PizzaBlock } from '../components/PizzaBlock';
import { MyPizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';

const Home = () => {
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

		fetch(
			`https://63fccb13677c41587314110b.mockapi.io/pizza-list?${category}&sortBy=${sortBy}&border=${order}`,
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
	]); /**useEffect следи за переменной React.useEffect(()=> {},[categoryIndex]) */

	return (
		<>
			<div className='content__top'>
				<Categories value={categoryIndex} changeCategory={id => setCategoryIndex(id)} />
				<Sorting sortValue={sortType} changeSort={id => setSortingType(id)} />
			</div>
			<h2 className='content__title'>Все пиццы:</h2>
			<div className='content__items'>
				{pageIsLoading
					? [...Array(6)].map((_, index) => <MyPizzaSkeleton key={index} />)
					: pizzas.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</>
	);
};
//  rfc - создание нового компонента

export default Home;
