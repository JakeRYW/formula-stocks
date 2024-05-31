import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function convertPercentage(currentPrice: number, change: number) {
	if (currentPrice === 0 && change === 0) return 0;

	const originalPrice = currentPrice - change;

	if (originalPrice === 0) {
		return 100;
	}

	return Math.abs(((originalPrice - currentPrice) / currentPrice) * 100);
}

export function addOrdinalSuffix(number: number) {
	if (number === 0) return '0';
	let numStr = number.toString();
	let lastDigit = parseInt(numStr[numStr.length - 1]);

	if (
		numStr.slice(-2) === '11' ||
		numStr.slice(-2) === '12' ||
		numStr.slice(-2) === '13'
	) {
		return numStr + 'th';
	}

	switch (lastDigit) {
		case 1:
			return numStr + 'st';
		case 2:
			return numStr + 'nd';
		case 3:
			return numStr + 'rd';
		default:
			return numStr + 'th';
	}
}
