import { describe, expect, it } from 'vitest';
import { objDiff } from './objDiff';

describe('Testing objDiff function with different scenarios', () => {
  it('should return an empty object when there are no common keys', () => {
    const obj1 = {};
    const obj2 = {
      a: 1,
      b: 2,
    };
    const expected = {};

    const result = objDiff(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('should return an object with differences for matching keys', () => {
    const obj1 = {
      a: 1,
      v: 3,
      x: [],
      z: {
        a: null,
      },
    };
    const obj2 = {
      a: 2,
      v: 4,
      x: [],
      z: {
        a: 2,
      },
    };
    const expected = {
      a: [1, 2],
      v: [3, 4],
      z: {
        a: [null, 2],
      },
    };

    const result = objDiff(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('should return an object with differences including arrays', () => {
    const obj1 = {
      a: 5,
      v: 6,
      z: [1, 2, 4, [2, 5, 7]],
    };
    const obj2 = {
      a: 5,
      v: 7,
      z: [1, 2, 3, [1]],
    };
    const expected = {
      v: [6, 7],
      z: {
        '2': [4, 3],
        '3': {
          '0': [2, 1],
        },
      },
    };

    const result = objDiff(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('should return an object with differences when types of values for the same key are different', () => {
    const obj1 = {
      a: { b: 1 },
    };
    const obj2 = {
      a: [5],
    };
    const expected = {
      a: [{ b: 1 }, [5]],
    };

    const result = objDiff(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('should return an empty object when objects are identical despite different key orders', () => {
    const obj1 = {
      a: [1, 2, {}],
      b: false,
    };
    const obj2 = {
      b: false,
      a: [1, 2, {}],
    };
    const expected = {};

    const result = objDiff(obj1, obj2);

    expect(result).toEqual(expected);
  });

  it('should return an object with differences when the values are nested arrays and objects', () => {
    const obj1 = {
      x: {
        a: {
          a: 0,
        },
      },
      c: [1, [3, 4, [5, 6]]],
      p: 0,
    };
    const obj2 = {
      x: {
        a: {
          a: false,
        },
      },
      c: [1, [3, 4, 7, 9, [5, 6]]],
      p: 1,
    };
    const expected = {
      x: {
        a: { a: [0, false] },
      },
      c: {
        '1': {
          '2': [[5, 6], 7],
        },
      },
      p: [0, 1],
    };

    const result = objDiff(obj1, obj2);

    expect(result).toEqual(expected);
  });
});
