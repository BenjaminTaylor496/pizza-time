import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
	return (
		<div className={styles.main}>
			<h1>
				<span>😓</span>
				<br />
				Ничего не найдено
			</h1>
			<p className={styles.description}>К сожалению данной страницы не существует 😭</p>
		</div>
	);
};

export default NotFoundBlock;
