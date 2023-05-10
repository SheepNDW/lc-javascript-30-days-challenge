import { describe, expect, it } from 'vitest';
import { reduce } from './reduce';

describe('reduce', () => {
  it('should reduce an array of numbers', () => {
    const nums = [1, 2, 3, 4, 5];
    const fn = (accum: number, curr: number) => accum + curr;
    const init = 0;

    const result = reduce(nums, fn, init);
    const expected = 15;

    expect(result).toEqual(expected);
  });

  it('should reduce an array of numbers with a custom function', () => {
    const nums = [1, 2, 3, 4];
    const fn = (accum: number, curr: number) => accum + curr * curr;
    const init = 100;

    const result = reduce(nums, fn, init);
    const expected = 130;

    expect(result).toEqual(expected);
  });

  it('should return init for an empty array', () => {
    const nums: number[] = [];
    const fn = (accum: number, curr: number) => 0;
    const init = 25;

    const result = reduce(nums, fn, init);
    const expected = 25;

    expect(result).toEqual(expected);
  });
});
