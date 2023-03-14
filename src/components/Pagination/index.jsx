import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.pages}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4} /**<= Количество пицц на 1 странице */
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;