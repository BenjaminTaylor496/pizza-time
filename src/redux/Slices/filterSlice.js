/** Отвечает за фильтрацию товара в приложении */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		title: 'популярности',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters' /**Название слайса необходимо для того, чтобы slice понимал где - что менять и откуда что вытаскивать*/,
	initialState /**Первое состояние слайса(изначальное) */,

	//Actions(методы, действия):
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload; //В state сохраняется, то, что приходит в action.payload
			/**Т.е придет объект, который будет содержать в себе обязательно любой action,
			 * Который содержит в себе: какую-то команду или любую информацию. Обычно любая информация хранится в payload */
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
