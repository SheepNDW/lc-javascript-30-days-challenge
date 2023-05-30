declare global {
  interface Function {
    callPolyfill(context: Record<any, any>, ...args: any[]): any;
  }
}

Function.prototype.callPolyfill = function (context, ...args): any {
  // 在這裡 `this` 代表原本的函式
  const originalFunction = this;

  // 回傳一個新的函式，這個新的函式會使用指定的 `context` 作為 `this` 值去呼叫原本的函式
  return (function () {
    return originalFunction.apply(context, args);
  })();
};

/**
 * function increment() { this.count++; return this.count; }
 * increment.callPolyfill({count: 1}); // 2
 */

export {};
