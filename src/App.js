import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
/**Хук useSelector отвечает за вытаскивание данных из хранилища. Что-то похожее на useContext
 * useDispatch - Хук который говорит "сделай что-то". useDispatch возвращает функцию */
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import './scss/app.scss';

export const SearchContext = React.createContext('');

/**
 *     Когда НУЖНО использовать redux вместо context ?
 * Так же redux необходим если нужно сделать большое приложение
 * Или же если нужно сделать так, чтобы компоненты не делали перерисовку
 * И если много данных хранятся в приложении. Тогда лучше использовать Redux
 * ================================================================
 * А если мало данных или приложение маленькое и нет разницы на перерисовку компонентов,
 * То тогда можно использовать useContext. И приложение не будет тормозить при перерисовке компонентов
 * Но если приложение небольшое, то от перерисовки оно не пострадает и не будет
 */

const App = () => {
	const [searchValue, setSearchValue] = React.useState();

	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				{/**В SearchContext.Provider по умолчанию будет храниться переменная searchValue и метод setSearchValue
				 * .Provider оповести все компоненты, что находятся внутри тебя о том, что у контекста есть searchValue, setSearchValue*/}
				<Header />
				<div className='content'>
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='*' element={<NotFound />} />
							{/**<Route path='*' element={<NotFound />} /> <== Здесь говорится о том, что если ни один из вышеперечисленных роутов не подошел, тогда покажи страницу NotFound*/}
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
		</div>
	);
};

export default App;
