import React from 'react';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sorting } from './components/Sorting';
import { PizzaBlock } from './components/PizzaBlock';

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sorting />
					</div>
					<h2 className='content__title'>Всё меню</h2>
					<div className='content__items'>
						<PizzaBlock title='Пицца четыре сыра' price={400} />
						<PizzaBlock title='Домашняя пицца' price={999} />
					</div>
				</div>
			</div>
		</div>
	);
}

//rfc - быстро создает шаблон компонента

export default App;
