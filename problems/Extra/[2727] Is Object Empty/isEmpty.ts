function isEmpty(obj: Record<string, any> | any[]): boolean {
  // if (Array.isArray(obj)) {
  //   return obj.length === 0;
  // }
  return Object.keys(obj).length === 0;
}

// Using Loop
function isEmpty2(obj: Record<string, any> | any[]): boolean {
  for (const _ in obj) {
    return false;
  }
  return true;
}

export { isEmpty };
