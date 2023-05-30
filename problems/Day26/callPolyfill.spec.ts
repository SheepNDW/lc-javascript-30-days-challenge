import { describe, expect, it } from 'vitest';

Function.prototype.callPolyfill = function (context, ...args): any {
  const originalFunction = this;

  return (function () {
    return originalFunction.apply(context, args);
  })();
};

describe('callPolyfill', () => {
  it('should correctly call the function with custom context (Example 1)', () => {
    const fn = function add(this: Record<string, any>, b: number): number {
      return this.a + b;
    };

    const result = fn.callPolyfill({ a: 5 }, 7);

    expect(result).toBe(12);
  });

  it('should correctly call the function with custom context (Example 2)', () => {
    const fn = function tax(this: Record<string, any>, price: number, taxRate: number): string {
      return `The cost of the ${this.item} is ${price * taxRate}`;
    };

    const result = fn.callPolyfill({ item: 'burger' }, 10, 1.1);

    expect(result).toBe('The cost of the burger is 11');
  });
});
