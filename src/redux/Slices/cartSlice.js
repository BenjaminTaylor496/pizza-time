/** Отвечает за корзину с товарами в приложении */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	pizzas: [],
};

const cartSlice = createSlice({
	name: 'cart' /**Название слайса необходимо для того, чтобы slice понимал где - что менять и откуда что вытаскивать*/,
	initialState /**Первое состояние слайса(изначальное) */,
	reducers: {
		// addPizza(state, action) {
		// 	state.pizzas.push(action.payload); // <=== Добавление продукта в корзину
		// 	state.totalPrice = state.pizzas.reduce((sum, obj) => {
		// 		return obj.price + sum;
		// 	}, 0); //<== Вычисление общей суммы всех пицц

		addPizza(state, action) {
			const findPizza = state.pizzas.find(obj => obj.id === action.payload.id);

			if (findPizza) {
				findPizza.count++;
			} else {
				state.pizzas.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = state.pizzas.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},

		minusPizza(state, action) {
			const findPizza = state.pizzas.find(obj => obj.id === action.payload);

			if (findPizza) {
				findPizza.count--;
			}
		},

		removePizza(state, action) {
			state.pizzas = state.pizzas.filter(obj => obj.id !== action.payload);
		},
		clearPizzas(state) {
			state.pizzas = [];
			state.totalPrice = 0;
		},
	},
});

export const { addPizza, removePizza, clearPizzas, minusPizza } = cartSlice.actions;
export default cartSlice.reducer;
