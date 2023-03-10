import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

function App() {
	return (
		<div className='wrapper'>
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
		</div>
	);
}

export default App;
