import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

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

export type RootState = ReturnType<typeof store.getState>; //<== Глобальный тип редюсоров

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () =>
	useDispatch<AppDispatch>(); /**Это тот же самый dispatch, но типизированный  */

/**Для лучшего понимания того, что получаю, что передаю и что возвращаю. Лучше проверить его с помощью console.log */
