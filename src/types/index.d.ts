export interface Stock {
	id: string;
	name: string;
	price: string;
	symbol: string;
	image: string;
	country: string;
	category: string;
	color: string;
	championship_pos: number;
	team: string;
	points: number;
	change_1hr: string;
	change_24hr: string;
	change_1wk: string;
	change_1mth: string;
	change_all: string;
}

export interface Portfolio {
	[id: string]: {
		amount: number;
	};
}
interface PortfolioStock {
	id: string;
	price: number;
}

export type TradeOptions = 'buy' | 'sell';
