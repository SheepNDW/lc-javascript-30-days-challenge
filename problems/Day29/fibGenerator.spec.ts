import { describe, expect, it } from 'vitest';
import { fibGenerator } from './fibGenerator';

describe('fibGenerator', () => {
  it('should generate 0 as the first number', () => {
    const gen = fibGenerator();

    const first = gen.next().value;

    expect(first).toBe(0);
  });

  it('should generate the correct Fibonacci sequence for the first five calls', () => {
    const gen = fibGenerator();

    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(gen.next().value);
    }

    expect(result).toEqual([0, 1, 1, 2, 3]);
  });

  it('should generate the correct Fibonacci sequence for the first ten calls', () => {
    const gen = fibGenerator();

    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push(gen.next().value);
    }

    expect(result).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });
});
