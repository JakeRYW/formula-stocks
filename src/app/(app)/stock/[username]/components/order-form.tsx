'use client';

import { transaction } from '@/app/actions/actions';
import { TradeOptions } from '@/types';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import { useContext, useRef, useState, useTransition } from 'react';
import { BalanceContext } from '@/components/balance-provider';

interface OrderFormProps {
	stockId: string;
	stockSymbol: string;
	buyingPower: number;
	price: number;
	quantity: number;
	tradeOption: TradeOptions;
}

export const OrderForm = ({
	stockId,
	stockSymbol,
	buyingPower,
	price,
	tradeOption,
	quantity,
}: OrderFormProps) => {
	const [sharesToBuy, setSharesToBuy] = useState(0);
	const [sharesToSell, setSharesToSell] = useState(0);
	const [sharesOwned, setSharedOwned] = useState(quantity);

	const buyInputRef = useRef<HTMLInputElement>(null);
	const sellInputRef = useRef<HTMLInputElement>(null);

	const [isPending, startTransition] = useTransition();
	const { toast } = useToast();

	const {
		buyingPower: clientBuyingPower,
		changeNetworth,
		changeBuyingPower,
		changePortfolioValue,
	} = useContext(BalanceContext);

	const handleTransaction = () => {
		startTransition(() => {
			transaction(
				stockId,
				tradeOption === 'buy' ? sharesToBuy : sharesToSell,
				tradeOption
			).then((data) => {
				if (data.error) {
					toast({
						className: 'mt-2',
						variant: 'destructive',
						title: 'Uh oh! Something went wrong.',
						description: data.error,
					});
					return;
				}

				toast({
					className: 'mt-2',
					title: `${
						tradeOption === 'buy'
							? 'Buy order filled'
							: 'Sell order filled'
					}`,
					description: (
						<>
							{formatTransactionMessage()}{' '}
							<span className='font-bold'>{stockSymbol}</span>
							{'!'}
						</>
					),
				});

				if (data.balance) changeBuyingPower(data.balance);
				if (data.portfolioValue)
					changePortfolioValue(data.portfolioValue);

				changeNetworth(
					Number(data.balance) + Number(data.portfolioValue)
				);

				setSharedOwned(
					tradeOption === 'buy'
						? sharesOwned + sharesToBuy
						: sharesOwned - sharesToSell
				);
			});
		});
	};

	function formatTransactionMessage() {
		if (tradeOption === 'buy') {
			return `You have successfully bought ${sharesToBuy} ${
				sharesToBuy > 1 ? 'shares' : 'share'
			} of`;
		} else {
			return `You have successfully sold ${sharesToSell} ${
				sharesToSell > 1 ? 'shares' : 'share'
			} of`;
		}
	}

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
			const maxAmount = Math.trunc(
				(clientBuyingPower >= 0 ? clientBuyingPower : buyingPower) /
					(price * (1 + 0.0025))
			);
			setSharesToBuy(maxAmount);
		} else {
			setSharesToSell(sharesOwned);
		}
	}

	if (tradeOption === 'buy') {
		return (
			<>
				<div className='mt-5'>
					<p className='text-sm text-black/70 dark:text-white/70'>
						Buying Power
					</p>
					<div className='border-b border-gray-400 border-dotted'>
						<p className='mt-[.125rem] mb-[.25rem] '>{`$ ${Number(
							clientBuyingPower >= 0
								? clientBuyingPower
								: buyingPower
						).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}`}</p>
					</div>
				</div>
				<div className='mt-5'>
					<p className='text-sm text-black/70 dark:text-white/70'>
						Shares to buy
					</p>
					<div className='relative'>
						<input
							className='peer px-3 py-2 border border-gray-300 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
							type='number'
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							value={sharesToBuy > 0 ? sharesToBuy : ''}
							ref={buyInputRef}
						/>
						<div className='absolute right-2 bottom-1 hidden peer-hover:block peer-focus:block hover:block'>
							<div className='flex flex-row items-center'>
								<Button
									className='p-0 h-8 w-6 rounded-none rounded-l-md hover:bg-transparent text-stone-400'
									variant={'ghost'}
									size={'sm'}
									onClick={() => {
										setSharesToBuy(0);
										buyInputRef.current?.focus();
									}}
								>
									X
								</Button>
								<div className='flex flex-col'>
									<Button
										className='p-0 h-4 w-4 rounded-none rounded-tr-md hover:bg-transparent text-stone-400'
										variant={'ghost'}
										size={'sm'}
										onClick={() =>
											setSharesToBuy(sharesToBuy + 1)
										}
									>
										<RiArrowUpSLine />
									</Button>
									<Button
										className='p-0 h-4 w-4 rounded-none rounded-br-md hover:bg-transparent text-stone-400'
										variant={'ghost'}
										size={'sm'}
										onClick={() => {
											if (sharesToBuy > 0)
												setSharesToBuy(sharesToBuy - 1);
										}}
									>
										<RiArrowDownSLine />
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className='mt-1'>
						<Button
							onClick={() => handleQuickChange(1)}
							className='h-fit px-[0.55rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md hover:dark:bg-white/10'
						>
							+1
						</Button>
						<Button
							onClick={() => handleQuickChange(10)}
							className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md hover:dark:bg-white/10'
						>
							+10
						</Button>
						<Button
							onClick={() => handleQuickChange(100)}
							className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md hover:dark:bg-white/10'
						>
							+100
						</Button>
						<Button
							onClick={() => handleQuickChange(1000)}
							className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md hover:dark:bg-white/10'
						>
							+1000
						</Button>
						<Button
							onClick={handleMax}
							className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md hover:dark:bg-white/10'
						>
							MAX
						</Button>
					</div>
				</div>
				<div className='mt-4'>
					<p className='text-sm text-black/70 dark:text-white/70'>
						Market Price
					</p>
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
					<p className='text-sm text-black/70 dark:text-white/70'>
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
					<p className='text-sm text-black/70 dark:text-white/70'>
						Total Cost
					</p>
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
								(clientBuyingPower >= 0
									? clientBuyingPower
									: buyingPower) ||
							sharesToBuy <= 0 ||
							isPending
						}
						className='w-full'
						onClick={handleTransaction}
					>
						{isPending ? (
							<Loader2 className='w-4 h-4 mr-2 animate-spin' />
						) : (
							''
						)}
						{isPending ? 'Buying' : 'Buy'}
					</Button>
				</div>
			</>
		);
	}

	return (
		<>
			<div className='mt-5'>
				<p className='text-sm text-black/70 dark:text-white/70'>
					Shares Owned
				</p>
				<div className='border-b border-gray-400 border-dotted'>
					<p className='mt-[.125rem] mb-[.25rem] '>{`${sharesOwned}`}</p>
				</div>
			</div>
			<div className='mt-5'>
				<p className='text-sm text-black/70 dark:text-white/70'>
					Shares to sell
				</p>
				<div className='relative'>
					<input
						className='peer px-3 py-2 border border-gray-300 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
						type='number'
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						value={sharesToSell > 0 ? sharesToSell : ''}
						ref={sellInputRef}
					/>
					<div className='absolute right-2 bottom-1 hidden peer-hover:block peer-focus:block hover:block'>
						<div className='flex flex-row items-center'>
							<Button
								className='p-0 h-8 w-8 rounded-none rounded-l-md border-none'
								variant={'ghost'}
								size={'sm'}
								onClick={() => {
									setSharesToSell(0);
									sellInputRef.current?.focus();
								}}
							>
								X
							</Button>
							<div className='flex flex-col'>
								<Button
									className='p-0 h-4 w-4 rounded-none rounded-tr-md'
									variant={'outline'}
									size={'sm'}
									onClick={() =>
										setSharesToSell(sharesToSell + 1)
									}
								>
									<RiArrowUpSLine />
								</Button>
								<Button
									className='p-0 h-4 w-4 rounded-none rounded-br-md'
									variant={'outline'}
									size={'sm'}
									onClick={() => {
										if (sharesToSell > 0)
											setSharesToSell(sharesToSell - 1);
									}}
								>
									<RiArrowDownSLine />
								</Button>
							</div>
						</div>
					</div>
				</div>
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
				<p className='text-sm text-black/70 dark:text-white/70'>
					Market Price
				</p>
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
				<p className='text-sm text-black/70 dark:text-white/70'>
					Total Value
				</p>
				<div className='border-b border-gray-400 border-dotted'>
					<p className='mt-[.125rem] mb-[.25rem] '>
						{`$ ${(price * sharesToSell).toLocaleString()}`}
					</p>
				</div>
			</div>
			<div className='mt-6'>
				<Button
					disabled={
						sharesToSell > sharesOwned ||
						sharesToSell <= 0 ||
						isPending
					}
					className='w-full'
					onClick={handleTransaction}
				>
					{isPending ? (
						<Loader2 className='w-4 h-4 mr-2 animate-spin' />
					) : (
						''
					)}
					{isPending ? 'Selling' : 'Sell'}
				</Button>
			</div>
		</>
	);
};
