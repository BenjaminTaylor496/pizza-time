import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const MyPizzaSkeleton: FC = () => (
	<ContentLoader
		className='pizza-block' //Данный класс написан для того, чтобы применить стили scss от pizza-block
		speed={1}
		width={280}
		height={460}
		viewBox='0 0 280 460'
		backgroundColor='#ffdebb'
		foregroundColor='#6f8b77'>
		<circle cx='137' cy='120' r='120' />
		<rect x='0' y='258' rx='9' ry='9' width='282' height='21' />
		<rect x='0' y='301' rx='8' ry='8' width='282' height='54' />
		<rect x='0' y='380' rx='5' ry='5' width='90' height='30' />
		<rect x='160' y='373' rx='19' ry='19' width='120' height='40' />
	</ContentLoader>
);
