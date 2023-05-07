import { describe, expect, it } from 'vitest';
import { createCounter } from '../Day3/createCounter';

describe('createCounter II', () => {
  it('should return an object with increment, decrement, and reset functions', () => {
    const counter = createCounter(5);

    expect(counter).toMatchObject({
      increment: expect.any(Function),
      decrement: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it('should increment the counter by 1', () => {
    const counter = createCounter(5);

    const result = counter.increment();

    expect(result).toBe(6);
  });

  it('should decrement the counter by 1', () => {
    const counter = createCounter(5);

    const result = counter.decrement();

    expect(result).toBe(4);
  });

  it('should reset the counter to the initial value', () => {
    const counter = createCounter(5);
    counter.increment();
    counter.increment();
    counter.increment();
    counter.reset();

    const result = counter.increment();

    expect(result).toBe(6);
  });
});
