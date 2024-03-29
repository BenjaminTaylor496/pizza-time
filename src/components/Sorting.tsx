import { useState, useRef, useEffect, memo, FC } from 'react';
import { useDispatch } from 'react-redux';

import { sortPropertyEnum } from '../redux/filter/types';
import { SortType } from '../redux/filter/types';
import { setSort } from '../redux/filter/slice';

type SortPizza = {
	title: string;
	sortProperty: sortPropertyEnum;
};

export const sortList: SortPizza[] = [
	{ title: 'популярности (DESC)', sortProperty: sortPropertyEnum.RATING_DESC },
	{ title: 'популярности (ASC)', sortProperty: sortPropertyEnum.RATING_ASC },
	{ title: 'алфавиту (DESC)', sortProperty: sortPropertyEnum.TITLE_DESC },
	{ title: 'алфавиту (ASC)', sortProperty: sortPropertyEnum.TITLE_ASC },
	{ title: 'цене (DESC)', sortProperty: sortPropertyEnum.PRICE_DESC },
	{ title: 'цене (ASC)', sortProperty: sortPropertyEnum.PRICE_ASC },
];

type SortingProps = {
	value: SortType;
};

const Sorting: FC<SortingProps> = memo(({ value }) => {
	const dispatch = useDispatch();
	const sortRef = useRef<HTMLDivElement>(null);

	const [isVisible, setIsVisible] = useState(false);

	const changeSortMenu = (obj: SortPizza) => {
		dispatch(setSort(obj));
		setIsVisible(false);
	};

	useEffect(() => {
		const onClickOutside = (event: Event) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setIsVisible(false);
			}
		};
		document.body.addEventListener('click', onClickOutside); // ОБЯЗАТЕЛЬНО СЮДА ВЕРНУТЬСЯ И ИСПРАВИТЬ ОШИБКИ! УРОК №23 36 минута

		return () => {
			document.body.removeEventListener('click', onClickOutside);
		};
	}, []); //!!Обычно нельзя обращаться к 'document.', но так можно делать если необходимо обработчик клика навешать на самый главный "родитель"

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setIsVisible(!isVisible)}>{value.title}</span>
				{/** При помощи {sorttitle} сделал так, что при выборе какого-то элемента из массива, sortList заменит собой предыдущее значение
				 * Например: было: Сортировка по: цене;
				 * Стало: Сортировка по: алфавиту*/}
			</div>
			{isVisible && (
				<div className='sort__popup'>
					<ul>
						{sortList.map((obj, i) => (
							<li
								key={i}
								onClick={() => changeSortMenu(obj)}
								className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
								{obj.title}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});
export default Sorting;
