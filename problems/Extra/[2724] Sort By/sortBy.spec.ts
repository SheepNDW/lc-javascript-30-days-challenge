import { describe, expect, it } from 'vitest';
import { sortBy } from './sortBy';

describe('sortBy', () => {
  it('sorts a number array', () => {
    const arr = [5, 4, 1, 2, 3];
    const fn = (x: number) => x;

    const result = sortBy(arr, fn);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('sorts an object array', () => {
    const arr = [{ x: 1 }, { x: 0 }, { x: -1 }];
    const fn = (d: { x: number }) => d.x;

    const result = sortBy(arr, fn);

    expect(result).toEqual([{ x: -1 }, { x: 0 }, { x: 1 }]);
  });

  it('sorts a 2D array', () => {
    const arr = [
      [3, 4],
      [5, 2],
      [10, 1],
    ];
    const fn = (x: number[]) => x[1];

    const result = sortBy(arr, fn);

    expect(result).toEqual([
      [10, 1],
      [5, 2],
      [3, 4],
    ]);
  });
});
