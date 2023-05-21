import { describe, expect, it } from 'vitest';
import { areDeeplyEqual } from './areDeeplyEqual';

describe('areDeeplyEqual', () => {
  it('should return true if the keys and values match exactly', () => {
    const o1 = { x: 1, y: 2 };
    const o2 = { x: 1, y: 2 };

    const result = areDeeplyEqual(o1, o2);

    expect(result).toBe(true);
  });

  it('should return true if the keys are in a different order but the values match exactly', () => {
    const o1 = { y: 2, x: 1 };
    const o2 = { x: 1, y: 2 };

    const result = areDeeplyEqual(o1, o2);

    expect(result).toBe(true);
  });

  it('should return false if the values are not the same type', () => {
    const o1 = { x: null, L: [1, 2, 3] };
    const o2 = { x: null, L: ['1', '2', '3'] };

    const result = areDeeplyEqual(o1, o2);

    expect(result).toBe(false);
  });

  it('should return false if the values are not the same', () => {
    const o1 = true;
    const o2 = false;

    const result = areDeeplyEqual(o1, o2);

    expect(result).toBe(false);
  });

  it('should return false if the keys are not the same', () => {
    const o1 = { '0': 1 };
    const o2 = [1];

    const result = areDeeplyEqual(o1, o2);

    expect(result).toBe(false);
  });
});
