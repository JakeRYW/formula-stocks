'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ErrorMessage() {
	return (
		<div className='w-full'>
			<Alert
				variant='destructive'
				className='dark:text-red-700 dark:!border-red-700'
			>
				<AlertCircle className='h-4 w-4 dark:!text-red-700' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					No stocks found. Please try again later.
				</AlertDescription>
			</Alert>
		</div>
	);
}
