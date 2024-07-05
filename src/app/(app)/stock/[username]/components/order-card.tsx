'use client';

import { useState } from 'react';
import { Stock, TradeOptions } from '@/types';
import { OrderForm } from './order-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OrderCardProps {
	stock: Stock;
	balance: number;
	quantity: number;
}

const OrderCard = ({ stock, balance, quantity }: OrderCardProps) => {
	const [tradeOption, setTradeOption] = useState<TradeOptions>('buy');

	function handleChangeTradeOption(tradeOption: TradeOptions) {
		if (tradeOption === 'buy') setTradeOption('buy');

		if (tradeOption === 'sell') setTradeOption('sell');
	}

	return (
		<>
			<Card className='shadow-lg'>
				<CardContent>
					<div className='flex justify-center mt-6'>
						<Button
							onClick={() => handleChangeTradeOption('buy')}
							className={`px-5 py-6 border border-gray-200 font-normal text-md rounded-r-none ${
								tradeOption !== 'buy'
									? 'bg-white text-gray-500 hover:bg-black/5'
									: 'bg-gray-200 text-black hover:bg-gray-200 dark:bg-black/50 dark:text-white'
							}`}
						>
							Buy {stock.symbol}
						</Button>
						<Button
							onClick={() => handleChangeTradeOption('sell')}
							className={`px-5 py-6 border font-normal border-gray-200 text-md rounded-l-none ${
								tradeOption !== 'sell'
									? 'bg-white text-gray-500 hover:bg-black/5 dark:bg-black/5 hover:text-black'
									: 'bg-gray-200 text-black hover:bg-gray-200'
							}`}
						>
							Sell {stock.symbol}
						</Button>
					</div>
					<OrderForm
						stockId={stock.id}
						stockSymbol={stock.symbol}
						price={Number(stock.price)}
						buyingPower={balance}
						tradeOption={tradeOption}
						quantity={quantity}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default OrderCard;
