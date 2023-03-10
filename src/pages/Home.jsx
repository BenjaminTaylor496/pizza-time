import React from 'react';

import { Categories } from '../components/Categories';
import { Sorting } from '../components/Sorting';
import { PizzaBlock } from '../components/PizzaBlock';
import { MyPizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';

const Home = () => {
	const [pizzas, setPizzas] = React.useState([]);
	const [pageIsLoading, setPageIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetch('https://63fccb13677c41587314110b.mockapi.io/pizza-list')
			.then(res => res.json())
			.then(json => {
				setPizzas(json);
				setPageIsLoading(false);
			});
	}, []);

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sorting />
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
