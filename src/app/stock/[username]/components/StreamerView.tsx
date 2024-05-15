'use client';

import {
  MonitorPlay,
  UsersRound,
  Gamepad2,
  MessageSquareText,
  Text,
} from 'lucide-react';

import { Stock } from '@/types';
import { useState } from 'react';
import { addOrdinalSuffix } from '@/lib/utils';

import Chart from '@/components/chart';

interface StreamerViewProps {
  stock: Stock;
  changeData: any;
}

export default function StreamerView({ stock, changeData }: StreamerViewProps) {
  let currentPrice =
    changeData !== null ? changeData.day[changeData.day.length - 1].y : null;
  let firstPrice = changeData !== null ? changeData.day[0].y : null;
  let currentChange =
    changeData !== null
      ? changeData.day[changeData.day.length - 1].y - changeData.day[0].y
      : null;

  const [hoveredPrice, setHoveredPrice] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [data, setData] = useState(changeData !== null ? changeData.day : null);
  const [range, setRange] = useState(1);

  function handleChangeChartTime(type: number) {
    switch (type) {
      case 0:
        setData(changeData.hour);
        break;
      case 1:
        setData(changeData.day);
        break;
      case 2:
        setData(changeData.week);
        break;
      case 3:
        setData(changeData.month);
        break;
      case 4:
        setData(changeData.all);
        break;
    }

    setRange(type);
  }

  return (
    <div>
      <div className='flex flex-row justify-center'>
        <div className='flex flex-row justify-center'>
          <div className='px-10 py-5 bg-white shadow-lg max-w-[55rem] rounded-md dark:bg-[#1f1f1f]'>
            <div className='flex flex-row items-center'>
              <h1 className='text-3xl font-semibold'>{stock.name}</h1>
              <p className='ml-3 text-xl font-semibold'>{stock.symbol}</p>
            </div>
            {changeData === null ? (
              <></>
            ) : (
              <div className='mt-4'>
                <div>
                  <p className='text-3xl font-semibold'>
                    {isHovering
                      ? `$${hoveredPrice}`
                      : `$${currentPrice.toFixed(2)}`}
                  </p>
                </div>
                <div className='mt-0'>
                  <p
                    className={`font-semibold text-md ${
                      isHovering
                        ? hoveredPrice - firstPrice > 0
                          ? 'text-green-600'
                          : 'text-red-600'
                        : currentChange > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {isHovering
                      ? `${hoveredPrice - firstPrice > 0 ? '$' : '-$'}${(Math.abs(hoveredPrice - firstPrice)).toFixed(2)} (${(
										((hoveredPrice - firstPrice) /
											firstPrice) *
										100
								  ).toFixed(2)}%)` //prettier-ignore
                      : `${currentChange > 0 ? '$' : '-$'}${Math.abs(
                          currentChange
                        ).toFixed(2)} (${(
                          ((currentPrice - firstPrice) / firstPrice) *
                          100
                        ).toFixed(2)}%)`}
                    <span className='text-black opacity-50 dark:text-white'>
                      {isHovering ? '' : ' past 24 hours'}
                    </span>
                  </p>
                </div>
              </div>
            )}
            <div className='mt-5 border border-b-0 h-[30rem]'>
              {/* LOADING SPINNER */}
              {changeData === null ? (
                <div className='relative top-[45%] left-[45%]'>
                  <div
                    className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                    role='status'
                  >
                    <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'></span>
                  </div>
                </div>
              ) : (
                <Chart
                  changeData={data}
                  setIsHovering={setIsHovering}
                  setHoveredPrice={setHoveredPrice}
                />
              )}
            </div>
            <div className='flex flex-row border border-t-0'>
              <button
                className={
                  range === 0
                    ? 'px-6 py-3 mt-auto font-semibold text-black border-b-[3px] border-black'
                    : 'px-6 py-3 mt-auto font-semibold text-gray-500'
                }
                onClick={() => handleChangeChartTime(0)}
              >
                1H
              </button>
              <button
                className={
                  range === 1
                    ? 'px-6 py-3 mt-auto font-semibold text-black border-b-[3px] border-black'
                    : 'px-6 py-3 mt-auto font-semibold text-gray-500'
                }
                onClick={() => handleChangeChartTime(1)}
              >
                1D
              </button>
              <button
                className={
                  range === 2
                    ? 'px-6 py-3 mt-auto font-semibold text-black border-b-[3px] border-black'
                    : 'px-6 py-3 mt-auto font-semibold text-gray-500'
                }
                onClick={() => handleChangeChartTime(2)}
              >
                1W
              </button>
              <button
                className={
                  range === 3
                    ? 'px-6 py-3 mt-auto font-semibold text-black border-b-[3px] border-black'
                    : 'px-6 py-3 mt-auto font-semibold text-gray-500'
                }
                onClick={() => handleChangeChartTime(3)}
              >
                1M
              </button>
              <button
                className={
                  range === 4
                    ? 'px-6 py-3 mt-auto font-semibold text-black border-b-[3px] border-black'
                    : 'px-6 py-3 mt-auto font-semibold text-gray-500'
                }
                onClick={() => handleChangeChartTime(4)}
              >
                All
              </button>
            </div>
            <div className='mt-6'>
              <div>
                <h2 className='text-2xl font-semibold'>{`About ${stock.symbol?.toUpperCase()}`}</h2>
              </div>
              {/*ROW*/}
              <div className='flex flex-row mt-4'>
                {/*BUTTON*/}
                <div className='flex flex-row px-8 w-fit'>
                  <div className='flex items-center justify-center text-center'>
                    <MonitorPlay />
                  </div>
                  <div className='px-5 py-3 leading-5 text-md'>
                    <p>{addOrdinalSuffix(stock.championship_pos)}</p>
                    <p className='text-sm opacity-75'>Championship Standing</p>
                  </div>
                </div>
                {/*BUTTON*/}
                <div className='flex flex-row px-8 w-fit'>
                  <div className='flex items-center justify-center text-center'>
                    <UsersRound />
                  </div>
                  <div className='px-5 py-3 leading-5 text-md'>
                    <p>{stock.points}</p>
                    <p className='text-sm opacity-75'>Points</p>
                  </div>
                </div>
                {/*BUTTON*/}
                <div className='flex flex-row px-8 w-fit'>
                  <div className='flex items-center justify-center text-center'>
                    <Gamepad2 />
                  </div>
                  <div className='px-5 py-3 leading-5 text-md'>
                    <p>{stock.live ? stock.game : '-'}</p>
                    <p className='text-sm opacity-75'>Current Game</p>
                  </div>
                </div>
              </div>
              <div className='mt-2'>
                <div className='flex flex-row w-full px-8'>
                  <div className='flex items-center justify-center text-center'>
                    <MessageSquareText />
                  </div>
                  <div className='px-5 py-3 leading-5 text-md'>
                    <p>{stock.team}</p>
                    <p className='text-sm opacity-75'>Team</p>
                  </div>
                </div>
              </div>
              <div className='mt-2'>
                <div className='flex flex-row w-full px-8'>
                  <div className='flex items-center justify-center text-center'>
                    <Text />
                  </div>
                  <div className='px-5 py-3 leading-5 text-md'>
                    <p>{stock.country}</p>
                    <p className='text-sm opacity-75'>Country</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
