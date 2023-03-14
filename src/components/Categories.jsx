import React from 'react';

const Categories = ({ value, changeCategory }) => {
	const categories = ['Все', 'Мясные', 'Вегuтарuанское', 'Грuль', 'Острые', 'Закрытые'];

	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, index) => (
					/**onClick={() => onClickCategory()} <= Вызови анонимную функцию, которая вызовет функцию onClickCategory
					 * Теперь при клике на <li> будет вызываться анонимная функция, которая внутри себя вызовет onClickCategory
					 * onClick={() => onClickCategory()} <= это делается для того, чтобы сайт не сломался и не выдал предупреждение о том, что сайт много раз рендерится
					 * Иными словами, сказал onClick: "Не надо мне сразу вызывать функцию onClickCategory()
					 * А вызови ее только тогда, когда я сделаю клик".
					 * Благодаря такому способу можно избежать бесконечных перерисовок
					 */
					<li
						key={index}
						onClick={() => changeCategory(index)}
						className={value === index ? 'active' : ''}>
						{categoryName}
						{/** Вместо того, чтобы снова и снова переписывать одну и ту же строку кода столько раз, сколько у меня категорий
						 * Создал массив categories, затем этот массив прогнал через .map и передал в неё 2 аргумента(value и index),
						 * Где categoryName - это название категории, а index -это индекс той или иной категории из массива.
						 * И потом, на основе данных из массива создал компонент <li>. Т.е сказал следующее:
						 * Посмотри сколько элементов в массиве
						 * И исходя из этого количества создай столько же элементов <li>
						 */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
