type F = (x: number) => number;

// function compose(functions: F[]): F {
//   return (x) => {
//     if (functions.length === 0) return x;

//     let accumulator = x;
//     const reverseFuncs = functions.reverse();

//     for (const fn of reverseFuncs) {
//       accumulator = fn(accumulator);
//     }

//     return accumulator;
//   };
// }

// reduceRight
function compose(functions: F[]): F {
  return (x) => functions.reduceRight((accumulator, currentFn) => currentFn(accumulator), x);
}

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */

export { compose };
