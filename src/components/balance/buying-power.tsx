'use client';

import { useContext } from 'react';
import { BalanceContext } from '../balance-provider';

export default function BuyingPower({ initialBuyingPower }) {
	const { buyingPower } = useContext(BalanceContext);
	return (
		<div>
			{`$${Number(
				buyingPower >= 0 ? buyingPower : initialBuyingPower
			)?.toLocaleString(undefined, {
				minimumFractionDigits: 2,
			})}`}
			<p className='text-muted-foreground text-xs'>Buying Power</p>
		</div>
	);
}

export function PortfolioValue({ initialPortfolioValue }) {
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

export function Networth({ initialNetworth }) {
	const { networth } = useContext(BalanceContext);
	return (
		<div>
			<p>{`$${Number(
				networth >= 0 ? networth : initialNetworth
			).toLocaleString(undefined, {
				minimumFractionDigits: 2,
			})}`}</p>
			<p className='text-muted-foreground font-semibold text-xs'>
				Net Worth
			</p>
		</div>
	);
}
