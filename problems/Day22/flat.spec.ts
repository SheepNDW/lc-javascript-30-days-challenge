import { describe, expect, it } from 'vitest';
import { flat } from './flat';

describe('flat', () => {
  it('should return the original array when depth is 0', () => {
    const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
    const n = 0;
    const expected = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

    const result = flat(arr, n);

    expect(result).toEqual(expected);
  });

  it('should flatten arrays with depth less than 1', () => {
    const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
    const n = 1;
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15];

    const result = flat(arr, n);

    expect(result).toEqual(expected);
  });

  it('should flatten arrays with depth less than 2', () => {
    const arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, [9, 10, 11], 12],
      [13, 14, 15],
    ];
    const n = 2;
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const result = flat(arr, n);

    expect(result).toEqual(expected);
  });
});
