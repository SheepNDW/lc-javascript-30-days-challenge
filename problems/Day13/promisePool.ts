type F = () => Promise<any>;

// Recursive Helper Function
function promisePool0(functions: F[], n: number): Promise<any> {
  return new Promise((resolve) => {
    let inProgressCount = 0;
    let functionIndex = 0;

    function helper() {
      if (functionIndex >= functions.length) {
        if (inProgressCount === 0) resolve(0);
        return;
      }

      while (inProgressCount < n && functionIndex < functions.length) {
        inProgressCount++;
        const promise = functions[functionIndex]();
        functionIndex++;
        promise.then(() => {
          inProgressCount--;
          helper();
        });
      }
    }

    helper();
  });
}

// ==== Alternatives ====
// Async/Await + Promise.all() + Array.shift()
async function promisePool1(functions: F[], n: number): Promise<any> {
  async function evaluateNext() {
    if (functions.length === 0) return;
    const fn = functions.shift()!;
    await fn();
    await evaluateNext();
  }
  const nPromises = Array(n).fill(0).map(evaluateNext);
  await Promise.all(nPromises);
}

// 2-Liner
async function promisePool(functions: F[], n: number): Promise<any> {
  const evaluateNext: F = () => functions[n++]?.().then(evaluateNext);
  return Promise.all(functions.slice(0, n).map((f) => f().then(evaluateNext)));
}

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */

export { promisePool };
