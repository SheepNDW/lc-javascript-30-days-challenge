import { describe, expect, it } from 'vitest';
import { expect as expectToBeOrNoToBe } from './expect';

describe('expect', () => {
  describe('toBe', () => {
    it('should return true if values are equal', () => {
      const result = expectToBeOrNoToBe(5).toBe(5);

      expect(result).toBe(true);
    });

    it('should throw an error if values are not equal', () => {
      expect(() => expectToBeOrNoToBe(5).toBe(null)).toThrow('Not Equal');
    });
  });

  describe('notToBe', () => {
    it('should return true if values are not equal', () => {
      const result = expectToBeOrNoToBe(5).notToBe(null);

      expect(result).toBe(true);
    });

    it('should throw an error if values are equal', () => {
      expect(() => expectToBeOrNoToBe(5).notToBe(5)).toThrow('Equal');
    });
  });
});
