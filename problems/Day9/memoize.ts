type Fn = (...params: any[]) => any;

function memoize(fn: Fn): Fn {
  const map = new Map();

  return (...args) => {
    const paramsKey = JSON.stringify(args);
    if (map.has(paramsKey)) {
      return map.get(paramsKey);
    }

    map.set(paramsKey, fn(...args));
    return map.get(paramsKey);
  };
}

// ==== Alternatives ====
type Cache = Record<string, number>;

// prettier-ignore
const memoize1 = (fn: Fn, cache:Cache = {}): Fn => (...args) => (cache[args.join()] = cache[args.join()] ?? fn(...args));

export { memoize };
