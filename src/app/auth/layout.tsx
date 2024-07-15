'use client';

import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';

interface Props {
	children: React.ReactNode;
}

export default function AuthLayout(props: Props) {
	return (
		<SessionProvider>
			<Suspense fallback={<div />}>{props.children}</Suspense>
		</SessionProvider>
	);
}
