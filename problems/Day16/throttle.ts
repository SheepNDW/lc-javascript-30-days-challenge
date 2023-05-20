type F = (...args: any[]) => void;

// Recursive setTimeout Calls
function throttle(fn: F, t: number): F {
  let timeoutInProgress: ReturnType<typeof setTimeout> | null = null;
  let argsToProcess: any[] | null = null;

  const timeoutFunc = () => {
    if (argsToProcess === null) {
      clearTimeout(timeoutInProgress as ReturnType<typeof setTimeout>);
      timeoutInProgress = null;
    } else {
      fn(...argsToProcess);
      argsToProcess = null;
      timeoutInProgress = setTimeout(timeoutFunc, t);
    }
  };

  return (...args) => {
    if (timeoutInProgress) {
      argsToProcess = args;
    } else {
      fn(...args);
      timeoutInProgress = setTimeout(timeoutFunc, t);
    }
  };
}

// ==== Alternatives ====

// setInterval + clearInterval
function throttle1(fn: F, t: number): F {
  let intervalInProgress: any = null;
  let argsToProcess: any = null;

  const intervalFunction = () => {
    if (argsToProcess === null) {
      clearInterval(intervalInProgress);
      intervalInProgress = null; // enter the waiting phase
    } else {
      fn(...argsToProcess);
      argsToProcess = null;
    }
  };

  return function throttled(...args) {
    if (intervalInProgress) {
      argsToProcess = args;
    } else {
      fn(...args); // enter the looping phase
      intervalInProgress = setInterval(intervalFunction, t);
    }
  };
}

// Keep Track of Next Time to Call Function
function throttle2(fn: F, t: number): F {
  let timeout: ReturnType<typeof setTimeout>;
  let nextTimeToCall = 0;

  return (...args) => {
    const delay = Math.max(0, nextTimeToCall - Date.now());
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
      nextTimeToCall = Date.now() + t;
    }, delay);
  };
}

export { throttle };
