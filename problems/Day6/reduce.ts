type Fn = (accum: number, curr: number) => number;

function reduce(nums: number[], fn: Fn, init: number): number {
  let result = init;
  if (nums.length === 0) return result;

  nums.forEach((item) => (result = fn(result, item)));

  return result;
}

export { reduce };
