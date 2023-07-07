import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cancellable } from './cancellable';

describe('cancellable', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  it('should call the function immediately', () => {
    const fn = vi.fn().mockReturnValue(8);
    const args = [4];
    const t = 20;

    cancellable(fn, args, t);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call the function every t milliseconds', () => {
    const fn = vi.fn((x) => x * 2);
    const args = [4];
    const t = 20;
    const cancelTime = 110;

    const cancel = cancellable(fn, args, t);
    const mockCancel = vi.fn(cancel);
    setTimeout(mockCancel, cancelTime);

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(6);
    expect(fn).toHaveBeenCalledWith(4);
    expect(fn).toHaveReturnedWith(8);
    expect(vi.getTimerCount()).toBe(2);

    vi.advanceTimersByTime(10);

    expect(mockCancel).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);

    vi.advanceTimersByTime(10);

    expect(fn).toHaveBeenCalledTimes(6);
  });
});
