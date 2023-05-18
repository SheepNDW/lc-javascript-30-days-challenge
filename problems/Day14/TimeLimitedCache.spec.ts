import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TimeLimitedCache } from './TimeLimitedCache';

describe('TimeLimitedCache', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should correctly handle cache operations in given time frame', async () => {
    const cache = new TimeLimitedCache();

    // At t=0, a key-value pair (1: 42) is added with a time limit of 100ms.
    expect(cache.set(1, 42, 100)).toBe(false);

    // Wait for 50ms then request the key=1 and check the value.
    vi.advanceTimersByTime(50);
    expect(cache.get(1)).toBe(42);

    // // At t=50, count() is called and there is one active key in the cache.
    expect(cache.count()).toBe(1);

    // // Wait for another 100ms then request the key=1 which should be expired by now.
    vi.advanceTimersByTime(100);
    expect(cache.get(1)).toBe(-1);
  });

  it('should correctly handle overwritten key-value pair', async () => {
    const cache = new TimeLimitedCache();

    // At t=0, a key-value pair (1: 42) is added with a time limit of 50ms.
    expect(cache.set(1, 42, 50)).toBe(false);

    // At t=40, a key-value pair (1: 50) is added with a time limit of 100ms.
    vi.advanceTimersByTime(40);
    expect(cache.set(1, 50, 100)).toBe(true);

    // At t=50, get(1) is called which returned 50.
    vi.advanceTimersByTime(10);
    expect(cache.get(1)).toBe(50);

    // At t=120, get(1) is called which returned 50.
    vi.advanceTimersByTime(70);
    expect(cache.get(1)).toBe(50);

    // At t=200, get(1) is called but the cache is empty so -1 is returned.
    vi.advanceTimersByTime(80);
    expect(cache.get(1)).toBe(-1);

    // At t=250, count() returns 0 because the cache is empty.
    vi.advanceTimersByTime(50);
    expect(cache.count()).toBe(0);
  });
});
