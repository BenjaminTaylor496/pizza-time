/** Отвечает за корзину с товарами в приложении */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types';

// type FetchPizzasArgs = Record<string, string>
/**С помощью Record<> можно все значения в объекте сделать в 1 типе.
 * Например, есть объект в котором все значения иимеют тип 'number'.
 * То в таком случае пишу следующее: Record<string, number>.
 * Или если все значения являются строчками: Record<string, string> и т.д */

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async params => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://642e83dd8ca0fe3352d1a166.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		);

		// if (data.length === 0) {
		// 	thunkAPI.rejectWithValue('Пиццы пустые'); //Сообщение "Пиццы пустые" будет появляться тогда, когда будут возникать ошибки
		// 	/**Если ассинхронная функция делает несколько await и я не знаю при каком await-e хочу что-то вернуть в payload
		// 	 * Можно с помощью thunkAPI.rejectWithValue вернуть какой-то специфичный payload.
		// 	 * Т.е не конечный один payload вернуть, а дополнительно указать что-то еще */
		// }

		return data;
	},
); //<== Называется бизнес-логикой. "Отправь запрос на бекэнд и верни ответ"

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},

	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});

		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},

	// extraReducers: {
	// 	[fetchPizzas.pending]: state => {
	// 		state.status = 'loading';
	// 		state.items = []; // Очищение старых пицц перед отправкой получения новых данных и делать состояние 'loading
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'success';
	// 	},
	// 	[fetchPizzas.rejected]: (state, action) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	},
	// },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
