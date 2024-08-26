'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Session } from '@auth/core/types';
import { useState } from 'react';

interface ProfileFormProps {
	session: Session;
}

export function ProfileForm({ session }: ProfileFormProps) {
	const userName = session?.user?.name;
	const email = session?.user?.email;

	const [changed, setChanged] = useState(false);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-5'>
					<div>
						<Label>Username</Label>
						<Input
							type='text'
							id='username'
							value={userName ?? ''}
							disabled
						/>
					</div>
					<div>
						<Label>Email</Label>
						<Input
							type='text'
							id='email'
							value={email ?? ''}
							disabled
						/>
					</div>
					<div className='flex items-center space-x-2 justify-between'>
						<div>
							<Label>Anonymous Mode</Label>
							<p className='text-sm text-muted-foreground'>
								Don't show your username on leaderboards.
							</p>
						</div>
						<Switch onCheckedChange={() => setChanged(true)} />
					</div>
					<div className='flex justify-between !mt-10'>
						<Button variant='outline' disabled={!changed}>
							Cancel
						</Button>
						<Button disabled={!changed}>Save Changes</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
