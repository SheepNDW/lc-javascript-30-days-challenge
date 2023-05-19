import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should cancel the first call if the second call is within the debounce time', () => {
    const start = Date.now();
    const params: any[] = [];
    let executedAt = 0;

    function log(...inputs: any[]) {
      executedAt = Date.now() - start;
      params.push(...inputs);
    }
    const dlog = debounce(log, 50);

    setTimeout(() => dlog(1), 50); // first call
    setTimeout(() => dlog(2), 75); // second call should cancel first call
    vi.runAllTimers();

    expect(params).toEqual([2]);
    expect(executedAt).toEqual(125);
  });

  it('should execute all calls that are outside the debounce time', () => {
    const start = Date.now();
    const params: any[] = [];
    let executedAt = 0;

    function log(...inputs: any[]) {
      executedAt = Date.now() - start;
      params.push(...inputs);
    }
    const dlog = debounce(log, 20);

    setTimeout(() => dlog(1), 50); // first call
    setTimeout(() => dlog(2), 100); // second call

    vi.advanceTimersByTime(70);

    expect(params).toEqual([1]);
    expect(executedAt).toEqual(70);

    vi.advanceTimersByTime(120);

    expect(params).toEqual([1, 2]);
    expect(executedAt).toEqual(120);
  });

  it('should handle multiple parameters and multiple calls', () => {
    const start = Date.now();
    const params: any[] = [];
    let executedAt = 0;

    function log(...inputs: any[]) {
      executedAt = Date.now() - start;
      params.push(...inputs);
    }
    const dlog = debounce(log, 150);

    setTimeout(() => dlog(1, 2), 50); // first call
    setTimeout(() => dlog(3, 4), 300); // second call
    setTimeout(() => dlog(5, 6), 300); // third call should cancel second call
    vi.runAllTimers();

    expect(params).toEqual([1, 2, 5, 6]);
    expect(executedAt).toEqual(450);
  });
});
