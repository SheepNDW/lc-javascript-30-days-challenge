function* fibGenerator(): Generator<number, any, number> {
  let prev = 0;
  let curr = 1;

  while (true) {
    yield prev;

    let next = prev + curr;
    prev = curr;
    curr = next;
  }
}

// ==== Alternatives ====

// Using Destructuring Assignment in Fibonacci Sequence Update
function* fibGenerator1(): Generator<number, any, number> {
  let [prev, curr] = [0, 1];

  while (true) {
    yield prev;

    [prev, curr] = [curr, prev + curr];
  }
}

/**
 * const gen = fibGenerator();
 * gen.next().value; // 0
 * gen.next().value; // 1
 */

export { fibGenerator };
