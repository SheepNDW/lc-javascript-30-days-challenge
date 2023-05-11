import { describe, expect, it } from 'vitest';
import { compose } from './compose';

describe('compose', () => {
  it('should compose functions from right to left', () => {
    const fn = compose([(x) => x + 1, (x) => x * x, (x) => 2 * x]);

    const result = fn(4);

    expect(result).toBe(65);

    const fn2 = compose([(x) => 10 * x, (x) => 10 * x, (x) => 10 * x]);

    const result2 = fn2(1);

    expect(result2).toBe(1000);
  });

  it('should return an identity function if an empty array is passed', () => {
    const fn = compose([]);

    const result = fn(42);

    expect(result).toBe(42);
  });
});
