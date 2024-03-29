import { useDispatch } from 'react-redux';
import { FC } from 'react';

import { addPizza, minusPizza, removePizza } from '../redux/cart/slice';
import { CartItem } from '../redux/cart/types';
import cancel from '../assets/img/cancel.png';
import minus from '../assets/img/minus.png';
import plus from '../assets/img/plus.png';

type CartItemsProps = {
	id: string;
	title: string;
	type: string;
	size: number;
	price: number;
	count: number;
	imageUrl: string;
};

const CartItems: FC<CartItemsProps> = ({ id, title, type, size, price, count, imageUrl }) => {
	const dispatch = useDispatch();

	const onClickPlus = () => {
		dispatch(addPizza({ id } as CartItem));
	};

	const onClickMinus = () => {
		dispatch(minusPizza(id));
	};

	const onClickRemove = () => {
		if (window.confirm('Ты действительно хочешь удалить товар?')) {
			dispatch(removePizza(id));
		}
	};

	return (
		<div className='cart__item'>
			<div className='cart__item-img'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
			</div>
			<div className='cart__item-info'>
				<h3>{title}</h3>
				<p>
					{type}, {size} см.
				</p>
			</div>
			<div className='cart__item-count'>
				<button
					disabled={count === 1}
					onClick={onClickMinus}
					className='button button--outline button--circle cart__item-count-minus'>
					<img src={minus} alt='minus' />
				</button>
				<b>{count}</b>
				<button className='button button--outline button--circle cart__item-count-plus'>
					<img onClick={onClickPlus} src={plus} alt='plus' />
				</button>
			</div>
			<div className='cart__item-price'>
				<b>{price * count} ₽</b>
			</div>
			<div className='cart__item-remove'>
				<button onClick={onClickRemove} className='button button--outline button--circle'>
					<img width={10} src={cancel} alt='cancel' />
				</button>
			</div>
		</div>
	);
};

export default CartItems;
