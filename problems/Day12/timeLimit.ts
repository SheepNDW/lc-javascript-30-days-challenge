type Fn = (...params: any[]) => Promise<any>;

// function timeLimit(fn: Fn, t: number): Fn {
//   return async function (...args) {
//     return new Promise(async (resolve, reject) => {
//       const timer = setTimeout(() => {
//         reject('Time Limit Exceeded');
//       }, t);

//       fn(...args)
//         .then((res) => {
//           clearTimeout(timer);
//           resolve(res);
//         })
//         .catch((err) => {
//           clearTimeout(timer);
//           reject(err);
//         });
//     });
//   };
// }

// Promise.race
function timeLimit(fn: Fn, t: number): Fn {
  return async function (...args) {
    const timerFn = new Promise((_, reject) => setTimeout(() => reject('Time Limit Exceeded'), t));

    return Promise.race([fn(...args), timerFn]);
  };
}

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */

export { timeLimit };
