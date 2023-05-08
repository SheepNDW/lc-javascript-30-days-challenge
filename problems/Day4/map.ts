function map(arr: number[], fn: (n: number, i: number) => number): number[] {
  const result: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i));
  }

  return result;
}

// ==== Alternatives ====

// Preallocate Memory
// 預先分配記憶體，可以提升效能
function map1(arr: number[], fn: (n: number, i: number) => number): number[] {
  const newArr = new Array<number>(arr.length);

  for (let i = 0; i < arr.length; i++) {
    newArr[i] = fn(arr[i], i);
  }

  return newArr;
}

// 32 Bit Integer Array
function map2(arr: number[], fn: (n: number, i: number) => number): number[] {
  const newArr = new Int32Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    newArr[i] = fn(arr[i], i);
  }

  return newArr as unknown as number[];
}

export { map };
