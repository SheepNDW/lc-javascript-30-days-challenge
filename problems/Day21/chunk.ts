// slice
function chunk0<T = unknown>(arr: T[], size: number): T[][] {
  const chunksCount = Math.ceil(arr.length / size);
  const chunkedArray: T[][] = [];

  for (let i = 0; i < chunksCount; i++) {
    chunkedArray.push(arr.slice(i * size, i * size + size));
  }

  return chunkedArray;
}

// ==== Alternatives ====

// reduce
function chunk<T = unknown>(arr: T[], size: number): T[][] {
  return arr.reduce((chunkedArray: T[][], currentElement, index) => {
    const chunkIndex = Math.floor(index / size);

    if (!chunkedArray[chunkIndex]) {
      chunkedArray[chunkIndex] = [];
    }

    chunkedArray[chunkIndex].push(currentElement);

    return chunkedArray;
  }, []);
}

export { chunk };
