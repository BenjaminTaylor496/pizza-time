import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
	reducer: {
		filter: filterReducer,
	},
});

/**Для лучшего понимания того, что получаю, что передаю и что возвращаю. Лучше проверить его с помощью console.log */
