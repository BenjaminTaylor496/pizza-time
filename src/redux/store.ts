import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filter from './filter/slice';
import pizza from './pizza/slice';
import cart from './cart/slice';

export const store = configureStore({
	reducer: {
		filter,
		pizza,
		cart,
	},
});

export type RootState = ReturnType<typeof store.getState>; //<== Глобальный тип редюсоров

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () =>
	useDispatch<AppDispatch>(); /**Это тот же самый dispatch, но типизированный  */

/**Для лучшего понимания того, что получаю, что передаю и что возвращаю. Лучше проверить его с помощью console.log */
