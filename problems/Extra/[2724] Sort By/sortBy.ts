function sortBy(arr: unknown[], fn: Function): unknown[] {
  return arr.sort((a, b) => fn(a) - fn(b));
}

// ==== Alternatives ====

// Comparison-Based Comparator
function sortBy1(arr: unknown[], fn: Function): unknown[] {
  const swap = (a: unknown, b: unknown) => {
    return fn(a) < fn(b) ? -1 : 1;
  };

  return arr.sort(swap);
}

export { sortBy };
