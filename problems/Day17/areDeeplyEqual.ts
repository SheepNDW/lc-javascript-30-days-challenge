function areDeeplyEqual(o1: any, o2: any): boolean {
  if (o1 === o2) return true;

  if (o1 === null || o2 === null) return false;

  if (typeof o1 !== typeof o2) return false;

  if (Array.isArray(o1) !== Array.isArray(o2)) return false;

  if (typeof o1 === 'object') {
    const o1Keys = Object.keys(o1);
    const o2Keys = new Set(Object.keys(o2));

    if (o1Keys.length !== o2Keys.size) return false;

    for (const key of o1Keys) {
      if (!o2Keys.has(key)) return false;

      if (!areDeeplyEqual(o1[key], o2[key])) return false;
    }

    return true;
  }

  return false;
}

export { areDeeplyEqual };
