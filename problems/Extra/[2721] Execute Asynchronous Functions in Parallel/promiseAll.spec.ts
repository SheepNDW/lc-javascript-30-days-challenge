import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { promiseAll } from './promiseAll';

describe('promiseAll', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an array of resolved values when all promises are resolved', async () => {
    const mockFn1 = vi.fn(() => new Promise((resolve) => setTimeout(() => resolve(5), 200)));
    const functions = [mockFn1];

    const resultPromise = promiseAll(functions);
    vi.runAllTimers();
    const result = await resultPromise;

    expect(result).toEqual([5]);
  });

  it('should reject if any of the promises is rejected', async () => {
    const mockFn1 = vi.fn(() => new Promise((_, reject) => setTimeout(() => reject('Error'), 100)));
    const mockFn2 = vi.fn(() => new Promise((resolve) => setTimeout(() => resolve(1), 200)));
    const functions = [mockFn1, mockFn2];

    const resultPromise = promiseAll(functions);
    vi.runAllTimers();

    await expect(resultPromise).rejects.toBe('Error');
  });

  it('should keep the order of the results as their original functions', async () => {
    const mockFn1 = vi.fn(() => new Promise((resolve) => setTimeout(() => resolve(5), 200)));
    const mockFn2 = vi.fn(() => new Promise((resolve) => setTimeout(() => resolve(3), 100)));
    const functions = [mockFn1, mockFn2];

    const resultPromise = promiseAll(functions);
    vi.runAllTimers();
    const result = await resultPromise;

    expect(result).toEqual([5, 3]);
  });
});
