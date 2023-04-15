import { useContext, useState, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';

import { SearchContext } from '../../App';

export const Search = () => {
	const [value, setValue] = useState(''); //<== Локальный стэйт внутри компонента Search. Нужен для того, чтобы моментально получать информацию
	const { setSearchValue } = useContext(SearchContext);
	const dispatch = useDispatch;
	const inputRef = useRef(null);

	const onClickClearInput = () => {
		dispatch(setSearchValue(''));
		setValue(''); // Очищение поля input
		inputRef.current.focus(); // Фокусировка в поле для ввода после очистки
	};

	const updateSearchValue = useCallback(
		debounce(string => {
			setSearchValue(string);
		}, 350),
		[],
	); //<=== сохранение ссылки на функцию и вызов ее через 350 милисекунд

	const onChangeInput = event => {
		setValue(event.target.value); // При вызове onChangeInput будет меняться input. Данное действие сохранится моментально
		updateSearchValue(event.target.value); //И вызывать updateSearchValue каждый раз при изменении input.
	};

	return (
		<div className={styles.main}>
			<svg
				className={styles.searchIcon}
				height='50px'
				id='Layer_1'
				version='1.1'
				viewBox='0 0 50 50'
				width='50px'>
				<rect fill='none' height='50' width='50' />
				<circle
					cx='21'
					cy='20'
					fill='none'
					r='16'
					stroke='#000000'
					strokeLinecap='round'
					strokeMiterlimit='10'
					strokeWidth='2'
				/>
				<line
					fill='none'
					stroke='#000000'
					strokeMiterlimit='10'
					strokeWidth='4'
					x1='32.229'
					x2='45.5'
					y1='32.229'
					y2='45.5'
				/>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.searchPlace}
				placeholder='Поиск пиццы... '
			/>

			{value && (
				<svg
					onClick={onClickClearInput}
					className={styles.clearInput}
					version='1.1'
					viewBox='0 0 24 24'>
					<path d='M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z' />
				</svg>
			)}
		</div>
	);
};
