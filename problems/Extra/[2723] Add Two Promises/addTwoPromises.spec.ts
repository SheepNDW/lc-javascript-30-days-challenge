import { describe, expect, it } from 'vitest';
import { addTwoPromises } from './addTwoPromises';

describe('addTwoPromises', () => {
  it('should add two promises', async () => {
    const promise1 = new Promise<number>((resolve) => setTimeout(() => resolve(2), 20));
    const promise2 = new Promise<number>((resolve) => setTimeout(() => resolve(5), 60));

    const result = await addTwoPromises(promise1, promise2);

    expect(result).toBe(7);
  });

  it('should add two promises 2', async () => {
    const promise1 = new Promise<number>((resolve) => setTimeout(() => resolve(10), 50));
    const promise2 = new Promise<number>((resolve) => setTimeout(() => resolve(-12), 30));

    const result = await addTwoPromises(promise1, promise2);

    expect(result).toBe(-2);
  });
});
