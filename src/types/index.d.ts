export interface Stock {
	id: number;
	name: string;
	price: number;
	symbol: string;
	avatar: string;
	country: string;
	category: string;
	color: string;
	championship_pos: number;
	team: string;
	points: number;
	change_1hr: number;
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
