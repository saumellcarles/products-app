import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setCacheEntry, getCacheEntry, invalidateCacheEntry, getOrFetch, ONE_HOUR_IN_MS } from './cache.service.js';

describe('cache.service', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns null when there is no cached entry', () => {
    expect(getCacheEntry('products:list')).toBeNull();
  });

  it('stores an entry with data, timestamp and ttl, and returns it while valid', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_000_000);

    setCacheEntry('products:list', ['a', 'b'], ONE_HOUR_IN_MS);
    const entry = getCacheEntry('products:list');

    expect(entry).toEqual({ data: ['a', 'b'], timestamp: 1_000_000, ttl: ONE_HOUR_IN_MS });
  });

  it('considers the entry expired once the TTL has elapsed', () => {
    vi.spyOn(Date, 'now').mockReturnValue(0);
    setCacheEntry('products:list', ['a'], ONE_HOUR_IN_MS);

    vi.spyOn(Date, 'now').mockReturnValue(ONE_HOUR_IN_MS + 1);

    expect(getCacheEntry('products:list')).toBeNull();
  });

  it('invalidateCacheEntry removes the stored entry', () => {
    setCacheEntry('products:list', ['a']);
    invalidateCacheEntry('products:list');

    expect(getCacheEntry('products:list')).toBeNull();
  });

  it('getOrFetch serves cached data without calling the fetcher again on a cache hit', async () => {
    const fetcher = vi.fn().mockResolvedValue(['fresh']);

    const first = await getOrFetch('products:list', fetcher);
    const second = await getOrFetch('products:list', fetcher);

    expect(first).toEqual(['fresh']);
    expect(second).toEqual(['fresh']);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('getOrFetch revalidates against the source once the cache has expired', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(0);
    const fetcher = vi.fn().mockResolvedValue(['stale']);
    await getOrFetch('products:list', fetcher, ONE_HOUR_IN_MS);

    vi.spyOn(Date, 'now').mockReturnValue(ONE_HOUR_IN_MS + 1);
    fetcher.mockResolvedValue(['revalidated']);
    const result = await getOrFetch('products:list', fetcher, ONE_HOUR_IN_MS);

    expect(result).toEqual(['revalidated']);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
