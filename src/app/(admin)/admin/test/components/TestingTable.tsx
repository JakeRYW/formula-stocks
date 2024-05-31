'use client';

import { transaction, setBalance } from '@/app/actions/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export default function TestingTable() {
	const [transactionAmount, setTransactionAmount] = useState(0);
	const [balanceAmount, setBalanceAmount] = useState(0);

	const [transactionUsername, setTransactionUsername] = useState('');
	const [balanceUsername, setBalanceUsername] = useState('');

	function handleAddMoney() {
		transaction(transactionUsername, transactionAmount);
		setTransactionAmount(0);
		setTransactionUsername('');
	}

	function handleChangeBalance() {
		setBalance(balanceUsername, balanceAmount);
		setBalanceAmount(0);
		setBalanceUsername('');
	}

	return (
		<>
			<div className='w-full px-10 mt-10'>
				<div className='bg-white p-8 rounded-lg shadow-md outline outline-1 outline-[#e4e4e7]'>
					<h2 className='text-2xl font-semibold tracking-tight scroll-m-20 lg:text-5xl text-center'>
						Routes
					</h2>
					<h3 className='mt-2 font-semibold'>Transactions</h3>
					<Separator className='mt-2' />
					<div className='mt-3 flex flex-row items-center justify-between'>
						<p>Add/Remove money</p>
						<div className='flex flex-row gap-3'>
							<Input
								className='max-w-36'
								placeholder='Username'
								type='text'
								value={transactionUsername}
								onChange={(e) =>
									setTransactionUsername(e.target.value)
								}
							/>
							<Input
								className='max-w-36'
								placeholder='5000'
								type='number'
								value={
									transactionAmount === 0
										? ''
										: transactionAmount
								}
								onChange={(e) =>
									setTransactionAmount(e.target.value)
								}
							/>
							<Button onClick={handleAddMoney}>Send</Button>
						</div>
					</div>
					<div className='mt-3 flex flex-row items-center justify-between'>
						<p>Set balance</p>
						<div className='flex flex-row gap-3'>
							<Input
								className='max-w-36'
								placeholder='Username'
								type='text'
								value={balanceUsername}
								onChange={(e) =>
									setBalanceUsername(e.target.value)
								}
							/>
							<Input
								className='max-w-36'
								placeholder='5000'
								type='number'
								value={balanceAmount === 0 ? '' : balanceAmount}
								onChange={(e) =>
									setBalanceAmount(e.target.value)
								}
							/>
							<Button onClick={handleChangeBalance}>Send</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
