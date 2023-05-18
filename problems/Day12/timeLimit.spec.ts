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
    const RESPONSE_TIME = 100;
    const TIME_LIMIT = 150;

    const fn = async (n: number) => {
      await new Promise((res) => setTimeout(res, RESPONSE_TIME));
      return n * n;
    };
    const limitedFn = timeLimit(fn, TIME_LIMIT);

    const promise = limitedFn(5);
    vi.advanceTimersByTime(RESPONSE_TIME);

    await expect(promise).resolves.toBe(25);
  });

  it('should resolve if the function with multiple parameters resolves before the time limit', async () => {
    const RESPONSE_TIME = 120;
    const TIME_LIMIT = 121;

    const fn = async (a: number, b: number) => {
      await new Promise((res) => setTimeout(res, RESPONSE_TIME));
      return a + b;
    };
    const limitedFn = timeLimit(fn, TIME_LIMIT);

    const promise = limitedFn(5, 10);
    vi.advanceTimersByTime(RESPONSE_TIME);

    await expect(promise).resolves.toBe(15);
  });

  it('should reject if the function does not resolve before the time limit', async () => {
    const RESPONSE_TIME = 100;
    const TIME_LIMIT = 50;

    const fn = async (n: number) => {
      await new Promise((res) => setTimeout(res, RESPONSE_TIME));
      return n * n;
    };

    const limitedFn = timeLimit(fn, TIME_LIMIT);

    const promise = limitedFn(5);
    vi.advanceTimersByTime(RESPONSE_TIME);

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
