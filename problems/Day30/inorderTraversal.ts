type MultidimensionalArray = (MultidimensionalArray | number)[];

function* inorderTraversal(arr: MultidimensionalArray): Generator<number, void, unknown> {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') {
      yield arr[i] as number;
    } else {
      yield* inorderTraversal(arr[i] as MultidimensionalArray);
    }
  }
}

// ==== Alternatives ====

//  Interative Stack
function* inorderTraversal1(arr: MultidimensionalArray): Generator<number, void, unknown> {
  const stack: MultidimensionalArray[] = [arr];

  while (stack.length > 0) {
    const current = stack.pop() as MultidimensionalArray;

    if (!Array.isArray(current)) {
      yield current;
      continue;
    }

    for (let i = current.length - 1; i >= 0; i--) {
      stack.push(current[i] as MultidimensionalArray);
    }
  }
}

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */

export { inorderTraversal, MultidimensionalArray };
