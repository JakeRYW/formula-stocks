import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import TestingTable from './components/TestingTable';

function handleAddMoney() {
  console.log('test');
}

export default async function AdminTestPage() {
  return (
    <>
      <div className='flex flex-col items-center justify-center mt-10 mb-20'>
        <h1 className='text-4xl font-semibold tracking-tight scroll-m-20 lg:text-5xl'>
          Admin Test
        </h1>
        <TestingTable />
      </div>
    </>
  );
}
