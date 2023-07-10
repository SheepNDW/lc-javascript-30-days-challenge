async function promiseAll<T>(functions: (() => Promise<T>)[]): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const promises = functions.map((fn) => fn());
    const result: T[] = [];
    let pending = functions.length;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          result[index] = value;
          pending--;

          if (pending === 0) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
}

export { promiseAll };

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
