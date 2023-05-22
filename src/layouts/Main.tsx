import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

import '../scss/app.scss';

const Main: FC = () => {
	return (
		<div className='wrapper'>
			<Header /> {/**<== статика */}
			<div className='container'>
				<Outlet /> {/**<== динамика*/}
			</div>
		</div>
	);
};

export default Main;
