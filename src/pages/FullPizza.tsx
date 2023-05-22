import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

const FullPizza: FC = () => {
	/**Буквы FC(functional component) которые написаны после двоеточия означают, что я задал тип(функционального компонента) странице 'FullPizza'
	 * Желательно прописывать данные две буквы в каждом компоненте приложения*/
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

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
		return <>Загрузка...</>;
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
