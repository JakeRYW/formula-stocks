'use client';

import { useContext } from 'react';
import { BalanceContext } from '../balance-provider';

type PortfolioValueProps = {
	initialPortfolioValue: Number | null;
};

export function PortfolioValue({ initialPortfolioValue }: PortfolioValueProps) {
	const { portfolioValue } = useContext(BalanceContext);

	return (
		<div>
			<p>{`$${Number(
				portfolioValue >= 0 ? portfolioValue : initialPortfolioValue
			).toLocaleString(undefined, {
				minimumFractionDigits: 2,
			})}`}</p>
			<p className='text-muted-foreground text-xs'>Portfolio Value</p>
		</div>
	);
}
