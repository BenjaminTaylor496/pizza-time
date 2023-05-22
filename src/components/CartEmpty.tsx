import { Link } from 'react-router-dom';
import { FC } from 'react';

import cartIsEmpty from '../assets/img/empty.png';

export const CartEmpty: FC = () => {
	return (
		<>
			<div className='cart cart-empty'>
				<h2>
					Корзина пуста <span>😕</span>
				</h2>
				<p>
					Вероятней всего, вы не заказывали еще пиццу. <br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src={cartIsEmpty} alt='cart is empty(' />
				<Link to='/' className='button button--black'>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</>
	);
};
