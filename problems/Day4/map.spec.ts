import { describe, expect, it } from 'vitest';
import { map } from './map';

describe('map', () => {
  it('should return an array of the same length', () => {
    const arr = [1, 2, 3];

    const result = map(arr, (n) => n);

    expect(result.length).toBe(arr.length);
  });

  it('should return an array with the same values', () => {
    const arr = [1, 2, 3];

    const result = map(arr, (n) => n);

    expect(result).toEqual(arr);
  });

  it('should return an array with the values doubled', () => {
    const arr = [1, 2, 3];

    const result = map(arr, (n) => n * 2);

    expect(result).toEqual([2, 4, 6]);
  });

  it('should return an array with the values squared', () => {
    const arr = [1, 2, 3];

    const result = map(arr, (n) => n * n);

    expect(result).toEqual([1, 4, 9]);
  });

  it('should return an array with the constant value', () => {
    const arr = [1, 2, 3];

    const result = map(arr, () => 1);

    expect(result).toEqual([1, 1, 1]);
  });

  it('should return an array with the values plus their index', () => {
    const arr = [1, 2, 3];

    const result = map(arr, (n, i) => n + i);

    expect(result).toEqual([1, 3, 5]);
  });
});
