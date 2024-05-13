'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ErrorMessage() {
	return (
		<div className='w-full'>
			<Alert variant='destructive'>
				<AlertCircle className='h-4 w-4' />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					No stocks found. Please try again later.
				</AlertDescription>
			</Alert>
		</div>
	);
}
