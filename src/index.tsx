import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
/**Библиотека 'react-redux' позволяет объект js использовать на все приложение */

import './scss/app.scss';

import App from './App';

import { store } from './redux/store';
/**{store} возвращает redux логику, а redux -js библиотека и не умеет работать с react
 *И для того чтобы js смог работать с react с помощью библиотеки, react-redux который хранит в себе, <Provider> необходимо оборернуть 'store' */

const rootElem = document.getElementById('root');

//Проверка: Есть ли в приложении html элемент
if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);

	root.render(
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>,
	);
}
