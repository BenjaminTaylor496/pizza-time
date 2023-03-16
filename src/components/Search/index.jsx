import React from 'react';

import styles from './Search.module.scss';

import { SearchContext } from '../../App';

const Search = () => {
	const { searchValue, setSearchValue } = React.useContext(SearchContext);
	/**Данный useContext будет ссылаться на переменную SearchContext, который находится в файле App.js
	 * Из переменной SearchContext вытащи searchValue, setSearchValuе*/

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
					stroke-linecap='round'
					stroke-miterlimit='10'
					stroke-width='2'
				/>
				<line
					fill='none'
					stroke='#000000'
					stroke-miterlimit='10'
					stroke-width='4'
					x1='32.229'
					x2='45.5'
					y1='32.229'
					y2='45.5'
				/>
			</svg>
			<input
				onChange={event => setSearchValue(event.target.value)}
				value={searchValue}
				className={styles.searchPlace}
				placeholder='Поиск пиццы... '
			/>

			{searchValue && (
				<svg
					onClick={() => setSearchValue('')}
					className={styles.clearInput}
					version='1.1'
					viewBox='0 0 24 24'>
					<path d='M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z' />
				</svg>
			)}
		</div>
	);
};

export default Search;
