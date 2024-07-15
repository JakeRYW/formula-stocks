'use client';

import { useContext } from 'react';
import { BalanceContext } from '../balance-provider';

type BuyingPowerProps = {
	initialBuyingPower: Number | null;
};

export function BuyingPower({ initialBuyingPower }: BuyingPowerProps) {
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
