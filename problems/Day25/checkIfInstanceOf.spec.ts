import { describe, expect, it } from 'vitest';
import { checkIfInstanceOf } from './checkIfInstanceOf';

describe('checkIfInstanceOf', () => {
  it('should return true when the object is an instance of the class', () => {
    const result = checkIfInstanceOf(new Date(), Date);
    expect(result).toBe(true);
  });

  it('should return true when the object is an instance of the superclass', () => {
    class Animal {}
    class Dog extends Animal {}
    const result = checkIfInstanceOf(new Dog(), Animal);
    expect(result).toBe(true);
  });

  it('should return false when the constructor is not an instance of itself', () => {
    const result = checkIfInstanceOf(Date, Date);
    expect(result).toBe(false);
  });

  it('should return true when the primitive type can access the class methods', () => {
    const result = checkIfInstanceOf(5, Number);
    expect(result).toBe(true);
  });

  it('should return false when both arguments are null', () => {
    const result = checkIfInstanceOf(null, null);
    expect(result).toBe(false);
  });

  it('should return false when both arguments are undefined', () => {
    const result = checkIfInstanceOf(undefined, undefined);
    expect(result).toBe(false);
  });

  it('should return false when classFunction is an array', () => {
    const result = checkIfInstanceOf([], []);
    expect(result).toBe(false);
  });
});
