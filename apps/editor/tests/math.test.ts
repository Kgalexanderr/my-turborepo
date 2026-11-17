import { describe, test, expect } from 'vitest';
import { calculateTotal } from './math';

describe('calculateTotal', () => {
  test('calculates price including tax', () => {
    expect(calculateTotal(100, 0.08)).toBe(108);
  });

  test('rounds to two decimal places', () => {
    expect(calculateTotal(19.99, 0.075)).toBe(21.49);
  });
});
