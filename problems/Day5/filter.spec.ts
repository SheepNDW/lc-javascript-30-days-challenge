import { describe, expect, it } from 'vitest';
import { filter } from './filter';

describe('filter', () => {
  it('should filter out numbers greater than 10', () => {
    const arr = [0, 10, 20, 30];

    const result = filter(arr, (n) => n > 10);

    expect(result).toEqual([20, 30]);
  });

  it('should filter out elements not at index 0', () => {
    const arr = [1, 2, 3];

    const result = filter(arr, (n, i) => i === 0);

    expect(result).toEqual([1]);
  });

  it('should filter out falsy values', () => {
    const arr = [-2, -1, 0, 1, 2];

    const result = filter(arr, (n) => n + 1);

    expect(result).toEqual([-2, 0, 1, 2]);
  });

  it('should filter out odd numbers', () => {
    const arr = [1, 2, 3, 4, 5];

    const result = filter(arr, (n) => n % 2 === 0);

    expect(result).toEqual([2, 4]);
  });

  it('should filter out even numbers', () => {
    const arr = [1, 2, 3, 4, 5];

    const result = filter(arr, (n) => n % 2 !== 0);

    expect(result).toEqual([1, 3, 5]);
  });
});
