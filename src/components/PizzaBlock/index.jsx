import React from 'react';

export const PizzaBlock = ({ title, price, imageUrl, sizes, types, inLoad = false }) => {
	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);

	const pizzaTypes = ['тонкое', 'традиционное'];

	// 	const [addPizza, setAddPizza] = React.useState(0);
	// 	// !!При каждом изменении useState компонент будет перерисовываться

	// 	const onClickQty = () => {
	// 		// const onClickQuantity <= количество
	// 		setAddPizza(addPizza + 1);
	// 	};

	return (
		<div className='pizza-block'>
			<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
			<h4 className='pizza-block__title'>{title}</h4>
			<div className='pizza-block__selector'>
				<ul>
					{types.map(pizzaTypeIndex => (
						<li
							key={pizzaTypeIndex}
							/**Тег <li> является родительским(дальше р\т).
							 * И если р\т в списке который будет рендерится с помощью .map не будет содержать "ключ"(key) с каким-то уникальным значением
							 * То Реакт может некорректно отрендерить список. Под "уникальным значением" понимается значение в рамках конкретного блока
							 * Например в данном примере у меня уникален "pizzaTypeIndex"*/
							onClick={
								() => setActiveType(pizzaTypeIndex)
								/** Если данная анонимная функция выполняет только 1 функцию, тогда можно не создавать отдельную переменную, где хранится функция */
							}
							className={activeType === pizzaTypeIndex ? 'active' : ''}>
							{pizzaTypes[pizzaTypeIndex]}
						</li>
						/**То, что находитя в <li> поменял 0 и 1 из 'pizzas.json' на то, что находится в pizzaTypes*/
					))}
				</ul>
				<ul>
					{sizes.map((size, index) => (
						<li
							key={size}
							onClick={() => setActiveSize(index)}
							className={activeSize === index ? 'active' : ''}>
							{size} cм.
						</li>
					))}
				</ul>
			</div>
			<div className='pizza-block__bottom'>
				<div className='pizza-block__price'>от {price} ₽</div>
				<button className='button button--outline button--add'>
					<svg
						width='12'
						height='12'
						viewBox='0 0 12 12'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
							fill='white'
						/>
					</svg>
					<span>Добавить</span>
					<i>0</i>
				</button>
			</div>
		</div>
	);
};
