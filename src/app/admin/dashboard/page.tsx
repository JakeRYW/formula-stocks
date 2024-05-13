import { Toaster } from '@/components/ui/toaster';
import { Stock } from '@/types';
import Dashboard from './dashboard';

async function getStockData() {
  try {
    const res = await fetch(`${process.env.API_BASE}/api/stocks`, {
      cache: 'no-store',
    });
    return res.json();
  } catch (error) {
    console.error('Failed to fetch data');
    return {};
  }
}

export default async function AdminPage() {
  let stockData = await getStockData();

  //Only map the stock data if the API actually returned valid data
  if (Object.keys(stockData).length !== 0) {
    stockData = stockData.map((stock: Stock) => ({
      id: stock.id,
      name: stock.name,
      symbol: stock.symbol,
      price: stock.price,
      category: stock.category,
      dateAdded: new Date(stock.date_added).toLocaleDateString('en-us'),
    }));
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-10 mb-20'>
        <h1 className='text-4xl font-semibold tracking-tight scroll-m-20 lg:text-5xl'>
          Admin Dashboard
        </h1>
        <Dashboard apiData={stockData} />
        <Toaster />
      </div>
    </>
  );
}
