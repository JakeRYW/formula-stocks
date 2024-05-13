'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Session } from '@auth/core/types';

interface ProfileFormProps {
	session: Session;
}

export function ProfileForm({ session }: ProfileFormProps) {
	const userName = session?.user?.name;
	const email = session?.user?.email;

	return (
		<div>
			<Label>Username</Label>
			<Input type='text' id='username' value={userName ?? ''} disabled />
			<div className='mt-5'>
				<Label>Email</Label>
				<Input type='text' id='email' value={email ?? ''} disabled />
			</div>
		</div>
	);
}
