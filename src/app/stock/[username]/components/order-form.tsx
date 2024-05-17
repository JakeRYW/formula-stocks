import { transaction, getStockQuantity } from '@/app/actions/actions';
import { Button } from '@/components/ui/button';
import { TradeOptions } from '@/types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface OrderFormProps {
	stockId: number;
	buyingPower: number;
	price: number;
	quantity: number;
	tradeOption: TradeOptions;
}

export const OrderForm = ({
	stockId,
	buyingPower,
	price,
	tradeOption,
	quantity,
}: OrderFormProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [sharesToBuy, setSharesToBuy] = useState(0);
	const [sharesToSell, setSharesToSell] = useState(0);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = Number(e.target.value);
		if (tradeOption === 'buy') {
			if (value >= 0) setSharesToBuy(Number(e.target.value));
		} else {
			if (value >= 0) setSharesToSell(Number(e.target.value));
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		// Allow only digits and backspace
		if (
			!/^\d$/.test(e.key) &&
			e.key !== 'Backspace' &&
			e.key !== 'ArrowLeft' &&
			e.key !== 'ArrowRight'
		) {
			e.preventDefault();
		}
	}

	function handleQuickChange(amount: number) {
		if (tradeOption === 'buy') setSharesToBuy(sharesToBuy + amount);
		else setSharesToSell(sharesToSell + amount);
	}

	function handleMax() {
		if (tradeOption === 'buy') {
			const maxAmount = Math.trunc(buyingPower / (price * (1 + 0.0025)));
			setSharesToBuy(maxAmount);
		} else {
			setSharesToSell(quantity);
		}
	}

	async function handleBuy() {
		setIsLoading(true);
		transaction(stockId, sharesToBuy, 'buy');
		setTimeout(() => {
			setIsLoading(false);
			setSharesToBuy(0);
		}, 1500);
	}

	async function handleSell() {
		setIsLoading(true);
		transaction(stockId, sharesToSell, 'sell');
		setTimeout(() => {
			setIsLoading(false);
			setSharesToSell(0);
		}, 1500);
	}

	if (tradeOption === 'buy') {
		return (
			<>
				<div className='mt-5'>
					<p className='text-sm text-gray-600'>Buying Power</p>
					<div className='border-b border-gray-400 border-dotted'>
						<p className='mt-[.125rem] mb-[.25rem] '>{`$ ${Number(
							buyingPower
						).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}`}</p>
					</div>
				</div>
				<div className='mt-5'>
					<p className='text-sm text-gray-600'>Shares to buy</p>
					<input
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						type='number'
						className='px-3 py-2 border border-gray-300 rounded-md'
						value={sharesToBuy > 0 ? sharesToBuy : ''}
					/>

					<div className='mt-1'>
						<Button
							onClick={() => handleQuickChange(1)}
							className='h-fit px-[0.55rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
						>
							+1
						</Button>
						<Button
							onClick={() => handleQuickChange(10)}
							className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
						>
							+10
						</Button>
						<Button
							onClick={() => handleQuickChange(100)}
							className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
						>
							+100
						</Button>
						<Button
							onClick={() => handleQuickChange(1000)}
							className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
						>
							+1000
						</Button>
						<Button
							onClick={handleMax}
							className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
						>
							MAX
						</Button>
					</div>
				</div>
				<div className='mt-4'>
					<p className='text-sm text-gray-600'>Market Price</p>
					<div className='border-b border-gray-400 border-dotted'>
						<p className='mt-[.125rem] mb-[.25rem] '>{`$ ${Number(
							price
						).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}`}</p>
					</div>
				</div>
				<div className='mt-5'>
					<p className='text-sm text-gray-600'>
						Transaction Fee (0.25%)
					</p>
					<div className='border-b border-gray-400 border-dotted'>
						<p className='mt-[.125rem] mb-[.25rem] '>{`$ ${(
							sharesToBuy *
							price *
							0.0025
						).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}`}</p>
					</div>
				</div>
				<div className='mt-5'>
					<p className='text-sm text-gray-600'>Total Cost</p>
					<div className='border-b border-gray-400 border-dotted'>
						<p className='mt-[.125rem] mb-[.25rem] '>{`$ ${(
							sharesToBuy * price +
							sharesToBuy * price * 0.0025
						).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}`}</p>
					</div>
				</div>
				<div className='mt-6'>
					<Button
						disabled={
							price * sharesToBuy + price * sharesToBuy * 0.0025 >
								buyingPower ||
							sharesToBuy <= 0 ||
							isLoading
						}
						className='w-full'
						onClick={handleBuy}
					>
						{isLoading ? (
							<Loader2 className='w-4 h-4 mr-2 animate-spin' />
						) : (
							''
						)}
						{isLoading ? 'Buying' : 'Buy'}
					</Button>
				</div>
			</>
		);
	}

	return (
		<>
			<div className='mt-5'>
				<p className='text-sm text-gray-600'>Shares Owned</p>
				<div className='border-b border-gray-400 border-dotted'>
					<p className='mt-[.125rem] mb-[.25rem] '>{`${quantity}`}</p>
				</div>
			</div>
			<div className='mt-5'>
				<p className='text-sm text-gray-600'>Shares to sell</p>
				<input
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					type='number'
					className='px-3 py-2 border border-gray-300 rounded-md'
					value={sharesToSell > 0 ? sharesToSell : ''}
				/>

				<div className='mt-1'>
					<Button
						onClick={() => handleQuickChange(1)}
						className='h-fit px-[0.55rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
					>
						+1
					</Button>
					<Button
						onClick={() => handleQuickChange(10)}
						className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
					>
						+10
					</Button>
					<Button
						onClick={() => handleQuickChange(100)}
						className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
					>
						+100
					</Button>
					<Button
						onClick={() => handleQuickChange(1000)}
						className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
					>
						+1000
					</Button>
					<Button
						onClick={handleMax}
						className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'
					>
						MAX
					</Button>
				</div>
			</div>
			<div className='mt-4'>
				<p className='text-sm text-gray-600'>Market Price</p>
				<div className='border-b border-gray-400 border-dotted'>
					<p className='mt-[.125rem] mb-[.25rem] '>{`$ ${Number(
						price
					).toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}`}</p>
				</div>
			</div>
			<div className='mt-5'>
				<p className='text-sm text-gray-600'>Total Value</p>
				<div className='border-b border-gray-400 border-dotted'>
					<p className='mt-[.125rem] mb-[.25rem] '>
						{`$ ${(price * sharesToSell).toLocaleString()}`}
					</p>
				</div>
			</div>
			<div className='mt-6'>
				<Button
					// TODO Add limit on going over shares owned
					disabled={
						sharesToSell > quantity ||
						sharesToSell <= 0 ||
						isLoading
					}
					className='w-full'
					onClick={handleSell}
				>
					{isLoading ? (
						<Loader2 className='w-4 h-4 mr-2 animate-spin' />
					) : (
						''
					)}
					{isLoading ? 'Selling' : 'Sell'}
				</Button>
			</div>
		</>
	);
};
