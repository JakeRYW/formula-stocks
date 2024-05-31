import { addOrdinalSuffix, convertPercentage } from '@/lib/utils';
import { describe, expect, it } from 'vitest';

describe('convertPercentage', () => {
	it('should return 100 for a 100% increase', () => {
		const result = convertPercentage(100, 100);
		expect(result).toBeCloseTo(100, 5);
	});

	it('should return 50 for a 50% increase', () => {
		const result = convertPercentage(50, 25);
		expect(result).toBeCloseTo(50, 5);
	});

	it('should return 33.33 for a 33.33% increase', () => {
		const result = convertPercentage(75, 25);
		expect(result).toBeCloseTo(33.33, 2);
	});

	it('should return 10 for a 10% increase', () => {
		const result = convertPercentage(100, 10);
		expect(result).toBeCloseTo(10, 5);
	});

	it('should return 0 for no change', () => {
		const result = convertPercentage(100, 0);
		expect(result).toBeCloseTo(0, 5);
	});

	it('should handle negative changes correctly', () => {
		const result = convertPercentage(100, -5);
		expect(result).toBeCloseTo(5, 5);
	});

	it('should handle zero currentPrice', () => {
		const result = convertPercentage(0, 0);
		expect(result).toBeCloseTo(0, 5);
	});

	it('should handle negative currentPrice correctly', () => {
		const result = convertPercentage(-50, 25);
		console.log(result);
		expect(result).toBeCloseTo(50, 2);
	});

	it('should handle both negative currentPrice and change correctly', () => {
		const result = convertPercentage(-200, -100);
		expect(result).toBeCloseTo(50, 5);
	});
});

describe('addOrdinalSuffix', () => {
	it('should add st to 1', () => {
		const result = addOrdinalSuffix(1);
		expect(result).toBe('1st');
	});

	it('should add nd to 2', () => {
		const result = addOrdinalSuffix(2);
		expect(result).toBe('2nd');
	});

	it('should add rd to 3', () => {
		const result = addOrdinalSuffix(3);
		expect(result).toBe('3rd');
	});

	it('should add th to 4', () => {
		const result = addOrdinalSuffix(4);
		expect(result).toBe('4th');
	});

	it('should add nd to 222', () => {
		const result = addOrdinalSuffix(222);
		expect(result).toBe('222nd');
	});

	it('should add th to 349', () => {
		const result = addOrdinalSuffix(349);
		expect(result).toBe('349th');
	});

	it('should return 0 if 0', () => {
		const result = addOrdinalSuffix(0);
		expect(result).toBe('0');
	});

	it('should handle negatives', () => {
		const result = addOrdinalSuffix(-5);
		expect(result).toBe('-5th');
	});
});
