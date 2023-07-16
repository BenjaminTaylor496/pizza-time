/** Отвечает за фильтрацию товара в приложении */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceState, sortPropertyEnum, SortType } from './types';

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		title: 'популярности',
		sortProperty: sortPropertyEnum.RATING_DESC,
	},
};

const filterSlice = createSlice({
	name: 'filters' /**Название слайса необходимо для того, чтобы slice понимал где - что менять и откуда что вытаскивать*/,
	initialState /**Первое состояние слайса(изначальное) */,

	//Actions(методы, действия):
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload; //В state сохраняется, то, что приходит в action.payload
			/**Т.е придет объект, который будет содержать в себе обязательно любой action,
			 * Который содержит в себе: какую-то команду или любую информацию. Обычно любая информация хранится в payload */
		},

		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},

		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload;
		},

		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},

		setFilters(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage);
				state.categoryId = Number(action.payload.categoryId);
				state.sort = action.payload.sort;
			} else {
				state.currentPage = 1;
				state.categoryId = 0;
				state.sort = { title: 'популярности', sortProperty: sortPropertyEnum.RATING_DESC };
			}
		},
	},
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
