import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

const FullPizza = () => {
	const navigate = useNavigate();
	const [pizza, setPizza] = useState();
	const { id } = useParams();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://642e83dd8ca0fe3352d1a166.mockapi.io/pizzas/' + id,
				);
				setPizza(data);
			} catch (error) {
				alert('Такой пиццы нету. =(');
				navigate('/');
			}
		}

		fetchPizza();
	}, []);

	if (!pizza) {
		return 'Loading...';
	} //До того как вытаскивать что-то из undefined, сначала проводится проверка: "нужно ли это делать"

	// console.log(params);

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='img' />
			<h2>{pizza.title}</h2>
			<h3>{pizza.price} ₽</h3>
		</div>
	);
};

export default FullPizza;
