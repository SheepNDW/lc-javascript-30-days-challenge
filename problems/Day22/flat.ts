type MultiDimensionalArray = (number | MultiDimensionalArray)[];

// recursive
function flat(arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  const flattened: MultiDimensionalArray = [];

  for (const element of arr) {
    if (Array.isArray(element) && n > 0) {
      flat(element, n - 1).forEach((d) => flattened.push(d));
    } else {
      flattened.push(element);
    }
  }

  return flattened;
}

// ==== Alternatives ====

// Using Iterative Stack
function flat1(arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  const stack: [MultiDimensionalArray | number, number][] = arr.map((item) => [item, n]);

  const result: MultiDimensionalArray = [];

  while (stack.length > 0) {
    const [item, depth] = stack.pop() as [MultiDimensionalArray | number, number];
    if (Array.isArray(item) && depth > 0) {
      stack.push(...item.map((el) => [el, depth - 1] as [MultiDimensionalArray, number]));
    } else {
      result.push(item);
    }
  }

  return result.reverse();
}

export { flat };
