import { describe, expect, it, vi } from 'vitest';
import { once } from './once';

describe('once', () => {
  it('should return a function that can only be called once', () => {
    const fn = vi.fn();
    const onceFn = once(fn);

    onceFn();
    onceFn();
    onceFn();

    expect(fn).toBeCalledTimes(1);
  });

  it('should return 6 for the first call and undefined for the second call', () => {
    const fn = vi.fn((a, b, c) => a + b + c);
    const onceFn = once(fn);

    expect(onceFn(1, 2, 3)).toBe(6);
    expect(onceFn(2, 3, 6)).toBe(undefined);
    expect(fn).toBeCalledTimes(1);
  });

  it('should return 140 for the first call and undefined for the second and third call', () => {
    const fn = vi.fn((a, b, c) => a * b * c);
    const onceFn = once(fn);

    expect(onceFn(5, 7, 4)).toBe(140);
    expect(onceFn(2, 3, 6)).toBe(undefined);
    expect(onceFn(4, 6, 8)).toBe(undefined);
    expect(fn).toBeCalledTimes(1);
  });
});
