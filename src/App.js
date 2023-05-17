import React from 'react';
/**Хук useSelector отвечает за вытаскивание данных из хранилища. Что-то похожее на useContext
 * useDispatch - Хук который говорит "сделай что-то". useDispatch возвращает функцию */
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Main from './layouts/Main';
import FullPizza from './pages/FullPizza';

import './scss/app.scss';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Main />}>
				<Route path='' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='pizza/:id' element={<FullPizza />} />
				<Route path='*' element={<NotFound />} />
				{/**<Route path='*' element={<NotFound />} /> <== Здесь говорится о том, что если ни один из вышеперечисленных роутов не подошел, тогда покажи страницу NotFound*/}
			</Route>
		</Routes>
	);
};

export default App;
