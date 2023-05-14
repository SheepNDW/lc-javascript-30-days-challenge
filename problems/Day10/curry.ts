function curry(fn: Function): Function {
  return function curried(...args: unknown[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (...nextArgs: unknown[]) => curried(...args, ...nextArgs);
  };
}

// ==== Alternatives ====
function curry1(fn: Function): Function {
  const accumulator: unknown[] = [];

  return function curried(...args: unknown[]) {
    args.forEach((arg) => accumulator.push(arg));
    if (accumulator.length === fn.length) {
      return fn(...accumulator);
    }

    return (...nextArgs: unknown[]) => curried(...nextArgs);
  };
}

/**
 * function sum(a, b) { return a + b; }
 * const csum = curry(sum);
 * csum(1)(2) // 3
 */

export { curry };

/**
 * Note:
 * - Function.length: 函式預期被傳入的參數數量
 */
