import { describe, expect, it } from 'vitest';
import { isEmpty } from './isEmpty';

describe('isEmpty', () => {
  it('should return false if the object has key-value pairs', () => {
    const obj = { x: 5, y: 42 };

    const result = isEmpty(obj);

    expect(result).toBe(false);
  });

  it('should return true if the object does not have any key-value pairs', () => {
    const obj = {};

    const result = isEmpty(obj);

    expect(result).toBe(true);
  });

  it('should return false if the array has elements', () => {
    const obj = [null, false, 0];

    const result = isEmpty(obj);

    expect(result).toBe(false);
  });

  it('should return true if the array does not have any elements', () => {
    const obj: any[] = [];

    const result = isEmpty(obj);

    expect(result).toBe(true);
  });
});
