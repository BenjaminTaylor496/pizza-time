import React from 'react';
import plus from '../assets/img/plus.png';
import minus from '../assets/img/minus.png';
import cancel from '../assets/img/cancel.png';
import { useDispatch } from 'react-redux';
import { addPizza, minusPizza, removePizza } from '../redux/slices/cartSlice';

const CartItems = ({ id, title, type, size, price, count, imageUrl }) => {
	const dispatch = useDispatch();

	const onClickPlus = () => {
		dispatch(addPizza({ id }));
	};

	const onClickMinus = () => {
		dispatch(minusPizza(id));
	};

	const onClickRemove = () => {
		if (window.confirm('Are you sure you want to remove?')) {
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
				<p>{type}, 26 см.</p>
			</div>
			<div className='cart__item-count'>
				<div className='button button--outline button--circle cart__item-count-minus'>
					<img onClick={onClickMinus} src={minus} alt='minus' />
				</div>
				<b>{count}</b>
				<div className='button button--outline button--circle cart__item-count-plus'>
					<img onClick={onClickPlus} src={plus} alt='plus' />
				</div>
			</div>
			<div className='cart__item-price'>
				<b>{price * count} ₽</b>
			</div>
			<div className='cart__item-remove'>
				<div className='button button--outline button--circle'>
					<img onClick={onClickRemove} width={10} src={cancel} alt='cancel' />
				</div>
			</div>
		</div>
	);
};

export default CartItems;