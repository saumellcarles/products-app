import { describe, it, expect } from 'vitest';
import { toDisplayText } from './to-display-text.js';

describe('toDisplayText', () => {
  it('joins array values with a space', () => {
    expect(toDisplayText(['2 MP', '720p'])).toBe('2 MP 720p');
  });

  it('returns string values unchanged', () => {
    expect(toDisplayText('5 MP')).toBe('5 MP');
  });

  it('returns falsy values unchanged', () => {
    expect(toDisplayText(undefined)).toBeUndefined();
    expect(toDisplayText('')).toBe('');
  });
});
