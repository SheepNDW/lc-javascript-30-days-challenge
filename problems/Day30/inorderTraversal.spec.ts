import { describe, expect, it } from 'vitest';
import { inorderTraversal, MultidimensionalArray } from './inorderTraversal';

describe('inorderTraversal', () => {
  it('should return a generator that yields integers in the same order as inorder traversal', () => {
    const arr: MultidimensionalArray = [[[6]], [1, 3], []];
    const generator = inorderTraversal(arr);

    expect(generator.next().value).toBe(6);
    expect(generator.next().value).toBe(1);
    expect(generator.next().value).toBe(3);
    expect(generator.next().done).toBe(true);
  });

  it('should return a generator that does not yield anything if there are no integers', () => {
    const arr: MultidimensionalArray = [];
    const generator = inorderTraversal(arr);

    expect(generator.next().done).toBe(true);
  });
});
