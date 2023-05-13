import { describe, expect, it, vi } from 'vitest';
import { memoize } from './memoize';

describe('memoize', () => {
  it('should return a memoized sum function', () => {
    const sum = (a: number, b: number) => {
      return a + b;
    };
    const mockSum = vi.fn(sum);
    const memoizedSum = memoize(mockSum);

    expect(memoizedSum(2, 3)).toBe(5);
    expect(memoizedSum(2, 3)).toBe(5);
    expect(mockSum).toHaveBeenCalledTimes(1);
  });

  it('should return a memoized factorial function', () => {
    const factorial = (n: number): number => {
      return n <= 1 ? 1 : n * factorial(n - 1);
    };
    const mockFactorial = vi.fn(factorial);
    const memoizedFactorial = memoize(mockFactorial);

    expect(memoizedFactorial(2)).toBe(2);
    expect(memoizedFactorial(3)).toBe(6);
    expect(memoizedFactorial(2)).toBe(2);

    expect(mockFactorial).toHaveBeenCalledTimes(2);

    expect(memoizedFactorial(3)).toBe(6);

    expect(mockFactorial).toHaveBeenCalledTimes(2);
  });

  it('should return a memoized fibonacci function', () => {
    const fibonacci = (n: number): number => {
      return n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
    };
    const mockFib = vi.fn(fibonacci);
    const memoizedFibonacci = memoize(mockFib);

    expect(memoizedFibonacci(5)).toBe(8);
    expect(memoizedFibonacci(5)).toBe(8);
    expect(mockFib).toHaveBeenCalledTimes(1);

    expect(memoizedFibonacci(6)).toBe(13);
    expect(mockFib).toHaveBeenCalledTimes(2);
  });

  it('should return a memoized expensive computation function', () => {
    const expensiveComputation = (n: number): number => {
      return n * n; // Just a placeholder for a "expensive" computation
    };
    const mockExpensiveComputation = vi.fn(expensiveComputation);
    const memoizedComputation = memoize(mockExpensiveComputation);

    expect(memoizedComputation(3)).toBe(9);
    expect(mockExpensiveComputation).toHaveBeenCalledTimes(1);

    expect(memoizedComputation(3)).toBe(9);
    expect(mockExpensiveComputation).toHaveBeenCalledTimes(1);

    expect(memoizedComputation(4)).toBe(16);
    expect(mockExpensiveComputation).toHaveBeenCalledTimes(2);

    expect(memoizedComputation(4)).toBe(16);
    expect(mockExpensiveComputation).toHaveBeenCalledTimes(2);
  });
});
