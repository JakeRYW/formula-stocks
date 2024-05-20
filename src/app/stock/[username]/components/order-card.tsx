'use client';

import { useState } from 'react';
import { Stock, TradeOptions } from '@/types';
import { OrderForm } from './order-form';

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
		<div className='px-4 py-5 bg-white rounded-md shadow-lg h-fit'>
			<div>
				<button
					onClick={() => handleChangeTradeOption('buy')}
					className={`px-5 py-3 border border-gray-200 rounded-l-md ${
						tradeOption !== 'buy'
							? 'bg-white text-gray-500'
							: 'bg-gray-200'
					}`}
				>
					Buy {stock.symbol}
				</button>
				<button
					onClick={() => handleChangeTradeOption('sell')}
					className={`px-5 py-3 border border-gray-200 rounded-r-md ${
						tradeOption !== 'sell'
							? 'bg-white text-gray-500'
							: 'bg-gray-200'
					}`}
				>
					Sell {stock.symbol}
				</button>
				<OrderForm
					stockId={stock.id}
					stockSymbol={stock.symbol}
					price={stock.price}
					buyingPower={balance}
					tradeOption={tradeOption}
					quantity={quantity}
				/>
			</div>
		</div>
	);
};

export default OrderCard;
