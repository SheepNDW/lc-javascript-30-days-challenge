import { describe, expect, it } from 'vitest';

Array.prototype.last = function () {
  return this.length === 0 ? -1 : this[this.length - 1];
};

describe('last', () => {
  it('should return the last element of an array', () => {
    const arr = [1, 2, 3];
    expect(arr.last()).toBe(3);
  });

  it('should return -1 if the array is empty', () => {
    const arr: number[] = [];
    expect(arr.last()).toBe(-1);
  });
});
