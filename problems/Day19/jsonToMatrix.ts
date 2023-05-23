function jsonToMatrix(arr: any[]): (string | number | boolean | null)[][] {
  const isObject = (x: any): x is object => x !== null && typeof x === 'object';
  const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
    let result: Record<string, any> = {};

    for (let key in obj) {
      let value = obj[key];

      if (isObject(value)) {
        const flattened = flattenObject(value, prefix + key + '.');
        result = { ...result, ...flattened };
      } else {
        result[prefix + key] = value;
      }
    }

    return result;
  };

  const flattenedArr = arr.map((obj) => flattenObject(obj));

  const columnSet = new Set<string>();
  flattenedArr.forEach((obj) => {
    Object.keys(obj).forEach((key) => columnSet.add(key));
  });

  const columns = Array.from(columnSet).sort();

  const matrix: (string | number | boolean | null)[][] = [columns];

  flattenedArr.forEach((obj) => {
    const row = columns.map((key) => (obj[key] !== undefined ? obj[key] : ''));
    matrix.push(row);
  });

  return matrix;
}

// ==== Alternatives ====

// Backtracking
// const flattenBacktracking = (
//   element: any,
//   path: string,
//   object: Record<string, any>,
//   columns: Set<string>
// ) => {
//   if (element != null && typeof element === 'object') {
//     Object.entries(element).forEach(([key, value]) => {
//       flattenBacktracking(value, path + (path ? '.' : '') + key, object, columns);
//     });
//   } else {
//     object[path] = element;
//     columns.add(path);
//   }

//   return object;
// };

// function jsonToMatrix(arr: any[]): (string | number | boolean | null)[][] {
//   const matrix: (string | number | boolean | null)[][] = [];
//   const columns = new Set<string>();

//   arr = arr.map((element) => flattenBacktracking(element, '', {}, columns));
//   matrix.push([...columns].sort());

//   const columnsIndex = matrix[0].reduce(
//     (acc, curr, index) => ((acc[curr as string] = index), acc),
//     {} as Record<string, number>
//   );

//   arr.forEach((element) => {
//     matrix.push(Array(columns.size).fill(''));
//     Object.entries(element).forEach(([key, value]) => {
//       matrix[matrix.length - 1][columnsIndex[key]] = value as any;
//     });
//   });

//   return matrix;
// }

export { jsonToMatrix };
