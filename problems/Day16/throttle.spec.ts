import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { throttle } from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call the first call without delay', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled(1);
    vi.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('should call the second call with delay', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);

    throttled(1);
    vi.advanceTimersByTime(25);
    throttled(2);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);

    vi.advanceTimersByTime(50);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(2);
  });

  it('should handle multiple parameters and multiple calls', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 70);

    throttled(1);
    vi.advanceTimersByTime(25);
    throttled(2);
    vi.advanceTimersByTime(40);
    throttled(8);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);

    vi.advanceTimersByTime(70);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(8);

    vi.advanceTimersByTime(90);
    throttled(5, 7);

    vi.advanceTimersByTime(140);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenCalledWith(5, 7);

    vi.advanceTimersByTime(250);
    throttled(9, 4);
    vi.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenCalledWith(9, 4);
  });
});
