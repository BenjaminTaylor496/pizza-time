import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
});

/**Для лучшего понимания того, что получаю, что передаю и что возвращаю. Лучше проверить его с помощью console.log */
