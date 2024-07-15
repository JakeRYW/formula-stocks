'use client';

import React, { createContext, ReactNode, useState } from 'react';

type BalanceProviderProps = {
	children: ReactNode;
};

export const BalanceContext = createContext({
	networth: -1,
	buyingPower: -1,
	portfolioValue: -1,
	changeNetworth: (value: number) => {},
	changeBuyingPower: (value: number) => {},
	changePortfolioValue: (value: number) => {},
});

export default function BalanceProvider({ children }: BalanceProviderProps) {
	const [networth, setNetworth] = useState(-1);
	const [buyingPower, setBuyingPower] = useState(-1);
	const [portfolioValue, setPortfolioValue] = useState(-1);

	const changeBuyingPower = (value: number) => {
		setBuyingPower(value);
	};

	const changePortfolioValue = (value: number) => {
		setPortfolioValue(value);
	};

	const changeNetworth = (value: number) => {
		setNetworth(value);
	};

	return (
		<BalanceContext.Provider
			value={{
				networth,
				buyingPower,
				portfolioValue,
				changeNetworth,
				changeBuyingPower,
				changePortfolioValue,
			}}
		>
			{children}
		</BalanceContext.Provider>
	);
}
