import { describe, expect, it } from 'vitest';
import { promisePool } from './promisePool';

function mockAsyncFunction(delay: number, calls: number[]) {
  return function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        calls.push(Date.now());
        resolve(`Resolved after ${delay}ms`);
      }, delay);
    });
  };
}

describe('promisePool', () => {
  it('should resolve all functions in the pool', async () => {
    const calls: number[] = [];
    const functions = [
      mockAsyncFunction(10, calls),
      mockAsyncFunction(20, calls),
      mockAsyncFunction(30, calls),
    ];

    await promisePool(functions, 2);

    // 檢查是否所有的函式都被執行了
    expect(calls.length).toBe(3);
  });

  it('should execute n functions at the same time', async () => {
    const calls: number[] = [];
    const functions = [
      mockAsyncFunction(10, calls),
      mockAsyncFunction(10, calls),
      mockAsyncFunction(10, calls),
    ];
    const start = Date.now();
    await promisePool(functions, 2);
    const end = Date.now();
    const duration = end - start;

    // 檢查是否同時執行了 n 個函式
    expect(duration).toBeGreaterThanOrEqual(10);
    expect(duration).toBeLessThan(30);

    // 檢查是否所有的函式都被執行了
    expect(calls.length).toBe(3);
  });

  it('should execute functions in order when n = 1', async () => {
    const calls: number[] = [];
    const functions = [
      mockAsyncFunction(30, calls),
      mockAsyncFunction(40, calls),
      mockAsyncFunction(20, calls),
    ];
    await promisePool(functions, 1);

    // 檢查是否所有的函式都被執行了
    expect(calls.length).toBe(3);

    // 檢查調用順序
    expect(calls[0]).toBeLessThan(calls[1]);
    expect(calls[1]).toBeLessThan(calls[2]);
  });
});
