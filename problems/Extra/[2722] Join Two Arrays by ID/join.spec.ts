import { describe, expect, it } from 'vitest';
import { join } from './join';

describe('join', () => {
  it('should return an array that includes all objects when arr1 and arr2 only have one object with different id', () => {
    const arr1 = [{ id: 1, x: 1 }];
    const arr2 = [{ id: 2, x: 2 }];

    const result = join(arr1, arr2);

    expect(result).toEqual([
      { id: 1, x: 1 },
      { id: 2, x: 2 },
    ]);
  });

  it('should merge the objects with the same id and the value from arr2 should override the value from arr1', () => {
    const arr1 = [
      { id: 1, x: 2, y: 3 },
      { id: 2, x: 3, y: 6 },
    ];
    const arr2 = [
      { id: 2, x: 10, y: 20 },
      { id: 3, x: 0, y: 0 },
    ];

    const result = join(arr1, arr2);

    expect(result).toEqual([
      { id: 1, x: 2, y: 3 },
      { id: 2, x: 10, y: 20 },
      { id: 3, x: 0, y: 0 },
    ]);
  });

  it('should merge the objects with complex structure and the value from arr2 should override the value from arr1', () => {
    const arr1 = [{ id: 1, b: { b: 94 }, v: [4, 3], y: 48 }];
    const arr2 = [{ id: 1, b: { c: 84 }, v: [1, 3] }];

    const result = join(arr1, arr2);

    expect(result).toEqual([{ id: 1, b: { c: 84 }, v: [1, 3], y: 48 }]);
  });
});
