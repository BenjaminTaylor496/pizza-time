import ReactPaginate from 'react-paginate';
import { FC } from 'react';

import styles from './Pagination.module.scss';

type PaginationProps = {
	currentPage: number;
	onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.pages}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4} /**<= Количество пицц на 1 странице */
			pageCount={3}
			forcePage={currentPage - 1}
		/>
	);
};

export default Pagination;
