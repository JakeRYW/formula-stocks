'use client';

import { useContext } from 'react';
import { BalanceContext } from '../balance-provider';

type NetworthProps = {
	initialNetworth: Number;
};

export function Networth({ initialNetworth }: NetworthProps) {
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
