import React from 'react';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sorting } from './components/Sorting';
import { PizzaBlock } from './components/PizzaBlock';
import { MyPizzaSkeleton } from './components/PizzaBlock/PizzaSkeleton';

import pizzas from './assets/pizzas.json';

function App() {
	const [pageIsLoading, setPageIsLoading] = React.useState(false);
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sorting />
					</div>
					<h2 className='content__title'>Все пиццы:</h2>
					<div className='content__items'>
						{pizzas.map(obj => (
							<MyPizzaSkeleton
								/**Когда react производит рендеринг через .map, он не понимает чем 1 компонент отличается от другого
								 * Если родительский компонент произведет перерисовку, тогда должны указать ключи для тех элементов, которые будут рендериться автоматически
								 * Благодаря этим ключам react будет понимать что да как сделать. Это нужно для того чтобы когда react будет делать перерендеры элемента
								 * Чтобы он не перепутал 'pizzaBlock'-и, например : Чтобы если удалю один 'pizzaBlock', случайно не удалился третий 'pizzaBlock'
								 * !! Передача в ключ index можно при:
								 * 1) Если рендерится список и если список статичный(т.е список всегда содержит определенное количество элементов). Но если массив меняется, то индекс передавать в ключ нельзя !!!!!!
								 * 2) Если есть что-то более уникальное, можно передавать её спокойно, не слушая других!!!*/
								key={obj.id}
								{...obj}
								/** {...obj} - заменяет весь нижний код. Делая его тем самым короче
								 * <PizzaBlock
								 * title={obj.title}
								 * price={obj.price}
								 * imageUrl={obj.imageUrl}
								 * sizes={obj.sizes}
								 * types={obj.types}/> */
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

//rfc - быстро создает шаблон компонента

export default App;
