import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
/**Библиотека 'react-redux' позволяет объект js использовать на все приложение */

import './scss/app.scss';

import App from './App';

import { store } from './redux/store';
/**{store} возвращает redux логику, а redux -js библиотека и не умеет работать с react
 *И для того чтобы js смог работать с react с помощью библиотеки, react-redux который хранит в себе, <Provider> необходимо оборернуть 'store' */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
);
