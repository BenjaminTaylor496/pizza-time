/** Отвечает за корзину с товарами в приложении */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
	const { sortBy, order, category, search, currentPage } = params;
	const { data } = await axios.get(
		`https://642e83dd8ca0fe3352d1a166.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
	);

	// if (data.length === 0) {
	// 	thunkAPI.rejectWithValue('Пиццы пустые'); //Сообщение "Пиццы пустые" будет появляться тогда, когда будут возникать ошибки
	// 	/**Если ассинхронная функция делает несколько await и я не знаю при каком await-e хочу что-то вернуть в payload
	// 	 * Можно с помощью thunkAPI.rejectWithValue вернуть какой-то специфичный payload.
	// 	 * Т.е не конечный один payload вернуть, а дополнительно указать что-то еще
	// 	 */
	// }

	return data;
}); //<== Называется бизнес-логикой. "Отправь запрос на бекэнд и верни ответ"

const initialState = {
	items: [],
	status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},

	extraReducers: {
		[fetchPizzas.pending]: state => {
			state.status = 'loading';
			state.items = []; // Очищение старых пицц перед отправкой получения новых данных и делать состояние 'loading
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.status = 'error';
			state.items = [];
		},
	},
});

export const selectPizzaData = state => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
