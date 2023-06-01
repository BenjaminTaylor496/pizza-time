/** Отвечает за корзину с товарами в приложении */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart' /**Название слайса необходимо для того, чтобы slice понимал где - что менять и откуда что вытаскивать*/,
	initialState /**Первое состояние слайса(изначальное) */,
	reducers: {
		// addPizza(state, action) {
		// 	state.items.push(action.payload); // <=== Добавление продукта в корзину
		// 	state.totalPrice = state.items.reduce((sum, obj) => {
		// 		return obj.price + sum;
		// 	}, 0); //<== Вычисление общей суммы всех пицц

		addPizza(state, action: PayloadAction<CartItem>) {
			const findPizza = state.items.find(obj => obj.id === action.payload.id);

			if (findPizza) {
				findPizza.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},

		minusPizza(state, action: PayloadAction<string>) {
			const findPizza = state.items.find(obj => obj.id === action.payload);

			if (findPizza) {
				findPizza.count--;
			}
		},

		removePizza(state, action: PayloadAction<string>) {
			state.items = state.items.filter(obj => obj.id !== action.payload);
		},

		clearPizzas(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
	state.cart.items.find(obj => obj.id === id);

export const { addPizza, removePizza, clearPizzas, minusPizza } = cartSlice.actions;
export default cartSlice.reducer;
