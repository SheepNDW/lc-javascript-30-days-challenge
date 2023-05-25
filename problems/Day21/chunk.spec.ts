import { describe, expect, it } from 'vitest';
import { chunk } from './chunk';

describe('chunk', () => {
  it('should chunk an array with size 1', () => {
    const arr = [1, 2, 3, 4, 5];
    const size = 1;

    const result = chunk(arr, size);

    expect(result).toEqual([[1], [2], [3], [4], [5]]);
  });

  it('should chunk an array with size 3', () => {
    const arr = [1, 9, 6, 3, 2];
    const size = 3;

    const result = chunk(arr, size);

    expect(result).toEqual([
      [1, 9, 6],
      [3, 2],
    ]);
  });

  it('should chunk an array where size is greater than the array length', () => {
    const arr = [8, 5, 3, 2, 6];
    const size = 6;

    const result = chunk(arr, size);

    expect(result).toEqual([[8, 5, 3, 2, 6]]);
  });

  it('should return an empty array when given an empty array', () => {
    const arr: any[] = [];
    const size = 1;

    const result = chunk(arr, size);

    expect(result).toEqual([]);
  });
});
