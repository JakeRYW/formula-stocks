'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Switch } from './ui/switch';
interface ModeToggleProps {
	mode?: 'button' | 'switch';
}

export function ModeToggle({ mode = 'redirect' }) {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		if (theme === 'dark') setTheme('light');
		if (theme === 'light') setTheme('dark');
	};

	if (mode === 'switch') {
		return (
			<Switch
				color='red'
				className=''
				checked={theme === 'dark'}
				onClick={() => toggleTheme()}
			/>
		);
	}

	return (
		<Button
			variant='outline'
			size='icon'
			className='!bg-formulared !text-white dark:bg-formulared dark:border-white'
			onClick={() => toggleTheme()}
		>
			<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
			<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
