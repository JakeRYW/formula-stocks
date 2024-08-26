'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { createGraphStyleCookie } from '@/app/actions/actions';

export function SettingsForm() {
	function handleGraphStyleChange(event: any) {
		createGraphStyleCookie(event);
	}

	const cookieValue = document.cookie
		.split('; ')
		.find((row) => row.startsWith('graphStyle='))
		?.split('=')[1];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Random Settings</CardTitle>
				<CardDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-3'>
					<Label>Graph Style</Label>
					<Select onValueChange={handleGraphStyleChange}>
						<SelectTrigger>
							<SelectValue
								placeholder={
									cookieValue === 'curved'
										? 'Curved'
										: 'Linear'
								}
							/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='linear'>Linear</SelectItem>
							<SelectItem value='curved'>Curved</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
}
