import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { timeLimit } from './timeLimit';

describe('timeLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should resolve if the function resolves before the time limit', async () => {
    const fn = async (n: number) => {
      await new Promise((res) => setTimeout(res, 100));
      return n * n;
    };
    const limitedFn = timeLimit(fn, 150);

    const promise = limitedFn(5);
    vi.advanceTimersByTime(100);

    await expect(promise).resolves.toBe(25);
  });

  it('should resolve if the function resolves before the time limit', async () => {
    const fn = async (a: number, b: number) => {
      await new Promise((res) => setTimeout(res, 120));
      return a + b;
    };
    const limitedFn = timeLimit(fn, 121);

    const promise = limitedFn(5, 10);
    vi.advanceTimersByTime(120);

    await expect(promise).resolves.toBe(15);
  });

  it('should reject if the function does not resolve before the time limit', async () => {
    const fn = async (n: number) => {
      await new Promise((res) => setTimeout(res, 100));
      return n * n;
    };

    const limitedFn = timeLimit(fn, 50);

    const promise = limitedFn(5);
    vi.advanceTimersByTime(100);

    await expect(promise).rejects.toThrow('Time Limit Exceeded');
  });

  it('should immediately throw an error', async () => {
    const fn = async () => {
      throw 'Error';
    };

    const limitedFn = timeLimit(fn, 1000);

    const promise = limitedFn();
    vi.advanceTimersByTime(0);

    await expect(promise).rejects.toThrow('Error');
  });
});
