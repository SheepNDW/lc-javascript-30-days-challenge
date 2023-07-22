type Obj = Record<any, any>;

function compactObject(obj: Obj): Obj {
  // obj is not an object or is null
  if (typeof obj !== 'object' || obj === null) return obj;

  // obj is an array
  if (Array.isArray(obj))
    return obj.reduce((acc, iter) => {
      if (!iter) return acc;
      acc.push(compactObject(iter));
      return acc;
    }, []);

  // obj is an ordinary object
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (val) acc[key] = compactObject(val);
    return acc;
  }, {} as Obj);
}

// ==== Alternatives ====

// const isObject = (obj: any) => typeof obj === 'object' && obj !== null;

// function compactObject(obj: Obj): Obj {
//   if (Array.isArray(obj)) {
//     return compactArray(obj);
//   } else if (isObject(obj)) {
//     return compactPlainObject(obj);
//   }
//   return obj;
// }

// function compactArray(array: any[]): any[] {
//   return array.reduce((result, item) => {
//     if (isObject(item)) {
//       const compactedItem = compactObject(item);
//       if (Boolean(compactedItem)) {
//         result.push(compactedItem);
//       }
//     } else if (item) {
//       result.push(item);
//     }
//     return result;
//   }, [] as any[]);
// }

// function compactPlainObject(obj: Obj): Obj {
//   const result: Obj = {};

//   for (const [key, value] of Object.entries(obj)) {
//     if (isObject(value)) {
//       result[key] = compactObject(value);
//     } else if (Boolean(value)) {
//       result[key] = value;
//     }
//   }

//   return result;
// }

// Original
// function compactObject(obj: Obj): Obj {
//   let result: Obj = {};

//   if (Array.isArray(obj)) {
//     result = [];

//     obj.forEach((item) => {
//       if (Boolean(item)) {
//         if (isObject(item)) {
//           const nestedObj = compactObject(item);
//           result.push(nestedObj);
//         } else {
//           result.push(item);
//         }
//       }
//     });
//   } else if (isObject(obj)) {
//     for (const key in obj) {
//       if (Boolean(obj[key])) {
//         if (isObject(obj[key])) {
//           const nestedObj = compactObject(obj[key]);
//           result[key] = nestedObj;
//         } else {
//           result[key] = obj[key];
//         }
//       }
//     }
//   }

//   return result;
// }

export { compactObject };
