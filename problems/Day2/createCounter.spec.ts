import { describe, expect, it } from 'vitest';
import { createCounter } from './createCounter';

describe('createCounter', () => {
  it('should return a function that returns the next number', () => {
    const counter = createCounter(10);
    expect(counter()).toBe(10);
    expect(counter()).toBe(11);
    expect(counter()).toBe(12);
  });

  it('should return a function that returns the next number', () => {
    const counter = createCounter(-2);
    expect(counter()).toBe(-2);
    expect(counter()).toBe(-1);
    expect(counter()).toBe(0);
    expect(counter()).toBe(1);
    expect(counter()).toBe(2);
  });
});
