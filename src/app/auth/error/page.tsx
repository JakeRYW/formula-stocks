import { BarChart2 } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import Link from 'next/link';
import { FormError } from '../components/form-error';

export default function ErrorPage() {
	return (
		<>
			<div className='min-h-[calc(100vh-88px)] flex items-center justify-center bg-black/5'>
				<Card className='mx-auto max-w-sm w-full'>
					<CardHeader>
						<CardTitle className='text-2xl flex flex-row items-center justify-center'>
							<BarChart2 className='mr-2' />
							FormulaStocks
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid gap-x-2'>
							<FormError message='Oops! Something went wrong!' />
							<div className='mt-4 text-center text-sm'>
								<Link href='/auth/login' className='underline'>
									Back to login
								</Link>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
