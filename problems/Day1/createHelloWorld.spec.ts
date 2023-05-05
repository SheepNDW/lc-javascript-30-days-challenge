import { describe, expect, it } from 'vitest';
import { createHelloWorld } from './createHelloWorld';

describe('createHelloWorld', () => {
  it('should return a function that always returns "Hello World"', () => {
    const f = createHelloWorld();

    expect(f()).toBe('Hello World');
    expect(f(1)).toBe('Hello World');
    expect(f('a', 'b', 'c')).toBe('Hello World');
    expect(f({}, null, 42)).toBe('Hello World');
  });
});
