export type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

export enum Status {
	/**!Примечание: Когда пишется ключ в enum принято этот ключ писать большими буквами
	 * Ключ обязательно большими буквами, а зачение может быть написан как угодно
	 * ВАЖНОЕ ПРИМЕЧАНИЕ! enum - не замена объекту*/
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
};
