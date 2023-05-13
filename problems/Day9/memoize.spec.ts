import { describe, expect, it } from 'vitest';
import { memoize } from './memoize';

describe('memoize', () => {
  it('should return a memoized sum function', () => {
    let callCount = 0;
    const sum = (a: number, b: number) => {
      callCount++;
      return a + b;
    };
    const memoizedSum = memoize(sum);

    expect(memoizedSum(2, 3)).toBe(5);
    expect(memoizedSum(2, 3)).toBe(5);
    expect(callCount).toBe(1);
  });

  it('should return a memoized factorial function', () => {
    let callCount = 0;
    const factorial = (n: number): number => {
      callCount++;
      return n <= 1 ? 1 : n * factorial(n - 1);
    };
    const memoizedFactorial = memoize(factorial);

    expect(memoizedFactorial(2)).toBe(2);

    expect(callCount).toBe(2); // Normal factorial would be called 2 times for factorial(2)

    expect(memoizedFactorial(3)).toBe(6); // Normal factorial would be called 3 times for factorial(3)
    expect(memoizedFactorial(2)).toBe(2); // count remains the same as the result is retrieved from cache

    expect(callCount).toBe(5); // 2 + 3 = 5

    expect(memoizedFactorial(3)).toBe(6);

    expect(callCount).toBe(5); // Count remains the same as the result is retrieved from cache
  });

  it('should return a memoized fibonacci function', () => {
    let callCount = 0;
    const fibonacci = (n: number): number => {
      callCount++;
      return n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
    };
    const memoizedFibonacci = memoize(fibonacci);

    expect(memoizedFibonacci(5)).toBe(8);
    expect(memoizedFibonacci(5)).toBe(8);
    expect(callCount).toBe(15); // Normal fibonacci would be called 15 times for fibonacci(5)

    expect(memoizedFibonacci(5)).toBe(8);
    expect(callCount).toBe(15); // Count remains the same as the result is retrieved from cache
  });

  it('should return a memoized expensive computation function', () => {
    let callCount = 0;
    const expensiveComputation = (n: number): number => {
      callCount++;
      return n * n; // Just a placeholder for a "expensive" computation
    };
    const memoizedComputation = memoize(expensiveComputation);

    expect(memoizedComputation(3)).toBe(9);
    expect(callCount).toBe(1);

    expect(memoizedComputation(3)).toBe(9);
    expect(callCount).toBe(1); // Count remains the same as the result is retrieved from cache

    expect(memoizedComputation(4)).toBe(16);
    expect(callCount).toBe(2); // Count increases as a new value is computed

    expect(memoizedComputation(4)).toBe(16);
    expect(callCount).toBe(2); // Count remains the same as the result is retrieved from cache
  });
});
