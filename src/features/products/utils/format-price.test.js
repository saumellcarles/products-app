import { describe, it, expect } from 'vitest';
import { formatPrice } from './format-price.js';

const EXPECTED_170_EUR = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(170);

describe('formatPrice', () => {
  it('formats a numeric string price as EUR currency', () => {
    expect(formatPrice('170')).toBe(EXPECTED_170_EUR);
  });

  it('returns a placeholder when the price is an empty string', () => {
    expect(formatPrice('')).toBe('—');
  });

  it('returns a placeholder when the price is null or undefined', () => {
    expect(formatPrice(null)).toBe('—');
    expect(formatPrice(undefined)).toBe('—');
  });

  it('returns the raw value when it cannot be parsed as a number', () => {
    expect(formatPrice('n/a')).toBe('n/a');
  });
});
