function objDiff(obj1: any, obj2: any): any {
  const diff: Record<string, any> = {};

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    for (let i = 0; i < Math.max(obj1.length, obj2.length); i++) {
      const val1 = obj1[i];
      const val2 = obj2[i];

      if (val1 !== undefined && val2 !== undefined) {
        if (
          (isObjectLiteral(val1) && isObjectLiteral(val2)) ||
          (Array.isArray(val1) && Array.isArray(val2))
        ) {
          const nestedDiff = objDiff(val1, val2);
          if (Object.keys(nestedDiff).length > 0) {
            diff[i] = nestedDiff;
          }
        } else if (val1 !== val2) {
          diff[i] = [val1, val2];
        }
      }
    }
  } else {
    for (const key of Object.keys(obj1)) {
      if (key in obj2) {
        if (
          (isObjectLiteral(obj1[key]) && isObjectLiteral(obj2[key])) ||
          (Array.isArray(obj1[key]) && Array.isArray(obj2[key]))
        ) {
          const nestedDiff = objDiff(obj1[key], obj2[key]);
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        } else if (obj1[key] !== obj2[key]) {
          diff[key] = [obj1[key], obj2[key]];
        }
      }
    }
  }

  return diff;
}

const isObjectLiteral = (obj: any) => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};

// ==== Alternatives ====

// function objDiff(obj1: any, obj2: any): any {
//   if (obj1 === obj2) return {};
//   if (obj1 === null || obj2 === null) return [obj1, obj2];
//   if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return [obj1, obj2];
//   if (Array.isArray(obj1) !== Array.isArray(obj2)) return [obj1, obj2];

//   const diff: Record<string, any> = {};
//   for (const key of Object.keys(obj1)) {
//     if (key in obj2) {
//       const nestedDiff = objDiff(obj1[key], obj2[key]);
//       if (Object.keys(nestedDiff).length > 0) {
//         diff[key] = nestedDiff;
//       }
//     }
//   }
//   return diff;
// }

export { objDiff };
