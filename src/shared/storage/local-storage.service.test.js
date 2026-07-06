import { describe, it, expect, beforeEach } from 'vitest';
import { localStorageService } from './local-storage.service.js';

describe('localStorageService', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns null when the key does not exist', () => {
    expect(localStorageService.get('missing-key')).toBeNull();
  });

  it('stores and retrieves a JSON-serializable value', () => {
    localStorageService.set('count', 3);
    expect(localStorageService.get('count')).toBe(3);
  });

  it('stores and retrieves an object', () => {
    const value = { data: [1, 2, 3], timestamp: 123 };
    localStorageService.set('entry', value);
    expect(localStorageService.get('entry')).toEqual(value);
  });

  it('removes a stored value', () => {
    localStorageService.set('count', 3);
    localStorageService.remove('count');
    expect(localStorageService.get('count')).toBeNull();
  });

  it('returns null for corrupted (non-JSON) stored data instead of throwing', () => {
    window.localStorage.setItem('broken', '{not-json');
    expect(localStorageService.get('broken')).toBeNull();
  });
});
