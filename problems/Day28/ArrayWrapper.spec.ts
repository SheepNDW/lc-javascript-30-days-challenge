import { describe, expect, it } from 'vitest';
import { ArrayWrapper } from './ArrayWrapper';

describe('ArrayWrapper', () => {
  it('should add all elements of two instances', () => {
    const obj1 = new ArrayWrapper([1, 2]);
    const obj2 = new ArrayWrapper([3, 4]);

    // JavaScript 會自動呼叫 valueOf() 來取得數值
    // 但是 TypeScript 不允許直接使用 + 來相加兩個物件，這裡顯式的先呼叫 valueOf() 來取得數值
    const result = obj1.valueOf() + obj2.valueOf();

    expect(result).toEqual(10);
  });

  it('should convert an instance into a string with the correct format', () => {
    const obj = new ArrayWrapper([23, 98, 42, 70]);

    const result = String(obj);

    expect(result).toEqual('[23,98,42,70]');
  });

  it('should add all elements of two empty instances to 0', () => {
    const obj1 = new ArrayWrapper([]);
    const obj2 = new ArrayWrapper([]);

    const result = obj1.valueOf() + obj2.valueOf();

    expect(result).toEqual(0);
  });
});
