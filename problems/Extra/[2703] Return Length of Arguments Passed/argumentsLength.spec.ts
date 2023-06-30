import { describe, expect, it } from 'vitest';
import { argumentsLength } from './argumentsLength';

describe('argumentsLength', () => {
  it('should return length of arguments passed', () => {
    expect(argumentsLength(5)).toBe(1);
    expect(argumentsLength({}, null, 3)).toBe(3);
  });
});
