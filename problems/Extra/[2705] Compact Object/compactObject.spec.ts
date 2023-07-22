import { describe, expect, it } from 'vitest';
import { compactObject } from './compactObject';

describe('compactObject', () => {
  it('removes falsy values from an array', () => {
    const obj = [null, 0, false, 1];

    const result = compactObject(obj);

    expect(result).toEqual([1]);
  });

  it('removes falsy values from an object', () => {
    const obj = {
      a: null,
      b: [false, 1],
    };

    const result = compactObject(obj);

    expect(result).toEqual({ b: [1] });
  });

  it('removes falsy values from a nested array', () => {
    const obj = [null, 0, 5, [0], [false, 16]];

    const result = compactObject(obj);

    expect(result).toEqual([5, [], [16]]);
  });

  it('should remove all falsy values from an array of objects', () => {
    const obj = [
      { a: null, b: 0 },
      { c: 1, d: false },
    ];

    const result = compactObject(obj);

    expect(result).toEqual([{}, { c: 1 }]);
  });
});
