function checkIfInstanceOf(obj: any, classFunction: any): boolean {
  if (obj === null || obj === undefined || typeof classFunction !== 'function') return false;
  if (obj instanceof classFunction) return true;

  let proto = Object.getPrototypeOf(obj);

  while (proto !== null) {
    if (proto === classFunction.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

// ==== Alternatives ====
function checkIfInstanceOf1(obj: any, classFunction: any): boolean {
  if (obj === null || obj === undefined || typeof classFunction !== 'function') return false;
  return Object(obj) instanceof classFunction;
}

function checkIfInstanceOf2(obj: any, classFunction: any): boolean {
  if (obj === null || obj === undefined || typeof classFunction !== 'function') return false;

  const primitiveTypes = {
    string: String,
    number: Number,
    boolean: Boolean,
    symbol: Symbol,
    bigint: BigInt,
  };

  if (
    (typeof obj in primitiveTypes && (primitiveTypes as any)[typeof obj] === classFunction) ||
    classFunction === Object
  ) {
    return true;
  }

  return obj instanceof classFunction;
}

/**
 * checkIfInstanceOf(new Date(), Date); // true
 */

export { checkIfInstanceOf };
