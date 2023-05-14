import { describe, expect, it, vi } from 'vitest';
import { curry } from './curry';

describe('curry', () => {
  it('should return a function that can be called with curriedSum(1)(2)(3)', () => {
    const fn = function sum(a: number, b: number, c: number) {
      return a + b + c;
    };
    const curriedSum = curry(fn);
    expect(curriedSum(1)(2)(3)).toBe(fn(1, 2, 3));
  });

  it('should return a function that can be called with curriedSum(1, 2)(3)', () => {
    const fn = function sum(a: number, b: number, c: number) {
      return a + b + c;
    };
    const curriedSum = curry(fn);
    expect(curriedSum(1, 2)(3)).toBe(fn(1, 2, 3));
  });

  it('should return a function that can be called with curriedSum()(1, 2, 3)', () => {
    const fn = function sum(a: number, b: number, c: number) {
      return a + b + c;
    };
    const curriedSum = curry(fn);
    expect(curriedSum()(1, 2, 3)).toBe(fn(1, 2, 3));
  });

  it('should curry a function that accepts zero parameters should effectively do nothing', () => {
    const fn = function life() {
      return 42;
    };
    const curriedLife = curry(fn);
    expect(curriedLife()).toBe(fn());
  });
});
