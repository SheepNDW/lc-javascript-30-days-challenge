import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cancellable } from './cancellable';

describe('cancellable', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the function after delay if not cancelled', async () => {
    const fn = vi.fn((x: number) => x * 5);
    const args = [2];
    const t = 20;
    const cancelTime = 50;

    const cancelFn = cancellable(fn, args, t);
    setTimeout(cancelFn, cancelTime);

    vi.runAllTimers();

    expect(fn).toHaveBeenCalledWith(2);
    expect(fn).toHaveReturnedWith(10);
  });

  it('does not call the function if cancelled before delay', async () => {
    const fn = vi.fn((x: number) => x ** 2);
    const args = [2];
    const t = 100;
    const cancelTime = 50;

    const cancelFn = cancellable(fn, args, t);
    const mockCancel = vi.fn(cancelFn);
    setTimeout(mockCancel, cancelTime);

    vi.runAllTimers();

    expect(fn).not.toHaveBeenCalled();
    expect(mockCancel).toHaveBeenCalled();
  });

  it('calls the function with multiple arguments after delay if not cancelled', async () => {
    const fn = vi.fn((x: number, y: number) => x * y);
    const args = [2, 4];
    const t = 30;
    const cancelTime = 100;

    const cancelFn = cancellable(fn, args, t);
    setTimeout(cancelFn, cancelTime);

    vi.runAllTimers();

    expect(fn).toHaveBeenCalledWith(2, 4);
    expect(fn).toHaveReturnedWith(8);
  });
});
