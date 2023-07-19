function join(arr1: any[], arr2: any[]): any[] {
  const mergedArr = [...arr1, ...arr2];

  const mergedObj = mergedArr.reduce((acc, curr) => {
    if (acc[curr.id]) {
      acc[curr.id] = { ...acc[curr.id], ...curr };
    } else {
      acc[curr.id] = curr;
    }
    return acc;
  }, {});

  const result = Object.values(mergedObj).sort((a: any, b: any) => a.id - b.id);

  return result;
}

export { join };
