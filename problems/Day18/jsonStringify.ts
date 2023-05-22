function jsonStringify(object: any): string {
  // string 需要用 "" 包
  if (typeof object === 'string') {
    return `"${object}"`;
  }

  if (Array.isArray(object)) {
    // array 需要用 `[]` 包，並使用 `join(',')` 分隔
    return `[${object.map((item) => jsonStringify(item)).join(',')}]`;
  } else if (typeof object === 'object' && object !== null) {
    // object 可以使用一個陣列來存放所有的 `"key":value` 字串，最後用 `join(',')` 來分隔
    const oKeys = Object.keys(object);
    const props: string[] = oKeys.map((key) => `"${key}":${jsonStringify(object[key])}`);

    return `{${props.join(',')}}`;
  }

  // number, boolean, null
  return String(object);
}

// ==== Alternatives ====

// Using Switch Case
// function jsonStringify(object: any): string {
//   switch (typeof object) {
//     case 'object':
//       if (Array.isArray(object)) {
//         return `[${object.map((item) => jsonStringify(item)).join(',')}]`;
//       } else if (object) {
//         const oKeys = Object.keys(object);
//         const keyValuePairs: string[] = oKeys.map(
//           (key) => `"${key}":${jsonStringify(object[key])}`
//         );

//         return `{${keyValuePairs.join(',')}}`;
//       } else {
//         return 'null';
//       }
//     case 'boolean':
//     case 'number':
//       return `${object}`;
//     case 'string':
//       return `"${object}"`;
//     default:
//       return '';
//   }
// }

// Using Ternary Operator
// function jsonStringify(object: any): string {
//   return typeof object === 'string'
//     ? '"' + object + '"'
//     : object === null || typeof object !== 'object'
//     ? object
//     : Array.isArray(object)
//     ? '[' + object.reduce((acc, x) => acc + jsonStringify(x) + ',', '').slice(0, -1) + ']'
//     : '{' +
//       Object.entries(object)
//         .reduce((acc, x) => acc + jsonStringify(x[0]) + ':' + jsonStringify(x[1]) + ',', '')
//         .slice(0, -1) +
//       '}';
// }

export { jsonStringify };
