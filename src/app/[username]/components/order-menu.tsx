'use client';

import { transaction } from '@/app/_actions';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Stock } from '@/types';
import { Loader2 } from 'lucide-react';

interface OrderMenuProps {
  stock: Stock;
  balance: number;
}

const SellMenu = () => {
  return (
    <>
      <div className='mt-5'>
        <p className='text-sm text-gray-600'>Shares Owned</p>
        <div className='border-b border-gray-400 border-dotted'>
          <p className='mt-[.125rem] mb-[.25rem] '>{`100`}</p>
        </div>
      </div>
      <div className='mt-5'>
        <p className='text-sm text-gray-600'>Shares to sell</p>
        <input className='px-3 py-2 border border-gray-300 rounded-md'></input>
        <div className='mt-1'>
          <Button className='px-[0.55rem] py-[0.20rem] h-fit text-xs font-semibold text-white bg-black rounded-md'>
            +1
          </Button>
          <Button className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'>
            +10
          </Button>
          <Button className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'>
            +100
          </Button>
          <Button className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'>
            +1000
          </Button>
          <Button className='h-fit ml-[0.25rem] px-[0.41rem] py-[0.20rem] text-xs font-semibold text-white bg-black rounded-md'>
            MAX
          </Button>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-sm text-gray-600'>Market Price</p>
        <div className='border-b border-gray-400 border-dotted'>
          <p className='mt-[.125rem] mb-[.25rem] '>{`$ 43.69`}</p>
        </div>
      </div>
      <div className='mt-5'>
        <p className='text-sm text-gray-600'>Total Value</p>
        <div className='border-b border-gray-400 border-dotted'>
          <p className='mt-[.125rem] mb-[.25rem] '>{`$ 3,033.14`}</p>
        </div>
      </div>
      <div className='mt-6'>
        {/* <p className='font-semibold text-red-700'>
            You're broke idiot! You can't afford this!
        </p> */}
        <button className='w-full py-2 mt-1 font-semibold text-white bg-black rounded-md'>
          {' '}
          Sell
        </button>
      </div>
    </>
  );
};

interface BuyMenuProps {
  stockId: number;
  sharesToBuy: number;
  buyingPower: number;
  marketPrice: number;
  setSharesToBuy: (amount: number) => void;
}

const BuyMenu = ({
  stockId,
  sharesToBuy,
  setSharesToBuy,
  buyingPower,
  marketPrice,
}: BuyMenuProps) => {
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: Event) {
    if (e.target.value >= 0) setSharesToBuy(Number(e.target.value));
  }

  function handleKeyDown(e: Event) {
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
    setSharesToBuy(sharesToBuy + amount);
  }

  function handleMax() {
    const maxAmount = Math.trunc(buyingPower / (marketPrice * (1 + 0.0025)));
    setSharesToBuy(maxAmount);
  }

  async function handleClickBuy() {
    setIsLoading(true);
    transaction(stockId, sharesToBuy);
    setTimeout(() => {
      setIsLoading(false);
      setSharesToBuy(0);
    }, 1500);
  }

  return (
    <>
      <div className='mt-5'>
        <p className='text-sm text-gray-600'>Buying Power</p>
        <div className='border-b border-gray-400 border-dotted'>
          <p className='mt-[.125rem] mb-[.25rem] '>{`$ ${buyingPower}`}</p>
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
          <p className='mt-[.125rem] mb-[.25rem] '>{`$ ${marketPrice}`}</p>
        </div>
      </div>
      <div className='mt-5'>
        <p className='text-sm text-gray-600'>Transaction Fee (0.25%)</p>
        <div className='border-b border-gray-400 border-dotted'>
          <p className='mt-[.125rem] mb-[.25rem] '>{`$ ${(
            sharesToBuy *
            marketPrice *
            0.0025
          ).toFixed(2)}`}</p>
        </div>
      </div>
      <div className='mt-5'>
        <p className='text-sm text-gray-600'>Total Cost</p>
        <div className='border-b border-gray-400 border-dotted'>
          <p className='mt-[.125rem] mb-[.25rem] '>{`$ ${(
            sharesToBuy * marketPrice +
            sharesToBuy * marketPrice * 0.0025
          ).toFixed(2)}`}</p>
        </div>
      </div>
      <div className='mt-6'>
        {/* <p className='font-semibold text-red-700'>
					You're broke idiot! You can't afford this!
				</p> */}
        <Button
          disabled={
            marketPrice * sharesToBuy > buyingPower ||
            sharesToBuy <= 0 ||
            isLoading
          }
          className='w-full'
          onClick={handleClickBuy}
        >
          {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : ''}
          {isLoading ? 'Buying' : 'Buy'}
        </Button>
        {/* <button className='w-full py-2 mt-1 font-semibold text-white bg-black rounded-md'>
					{' '}
					Buy
				</button> */}
      </div>
    </>
  );
};

const OrderMenu = ({ stock, balance }: OrderMenuProps) => {
  const [tradeOption, setTradeOption] = useState('buy');
  const [sharesToBuy, setSharesToBuy] = useState(0);

  function handleChangeTradeOption(tradeOption: string) {
    if (tradeOption === 'buy') setTradeOption('buy');

    if (tradeOption === 'sell') setTradeOption('sell');
  }

  async function handleBuy(amount: number) {
    console.log('test');
  }

  return (
    <div className='px-4 py-5 bg-white rounded-md shadow-lg h-fit'>
      <div>
        <button
          onClick={() => handleChangeTradeOption('buy')}
          className={`px-5 py-3 border border-gray-200 rounded-l-md ${
            tradeOption !== 'buy' ? 'bg-white text-gray-500' : 'bg-gray-200'
          }`}
        >
          Buy {stock.symbol}
        </button>
        <button
          onClick={() => handleChangeTradeOption('sell')}
          className={`px-5 py-3 bg-white border border-gray-200 rounded-r-md ${
            tradeOption !== 'sell' ? 'bg-white text-gray-500' : 'bg-gray-200'
          }`}
        >
          Sell {stock.symbol}
        </button>
        {tradeOption === 'buy' ? (
          <BuyMenu
            stockId={stock.id}
            sharesToBuy={sharesToBuy}
            setSharesToBuy={setSharesToBuy}
            marketPrice={stock.price}
            buyingPower={balance}
            handleBuy={handleBuy}
          />
        ) : (
          <SellMenu />
        )}
      </div>
    </div>
  );
};

export default OrderMenu;
