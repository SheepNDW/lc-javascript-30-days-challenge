import { describe, expect, it } from 'vitest';

Array.prototype.groupBy = function (fn) {
  const grouped: Record<string, any[]> = {};

  this.forEach((item) => {
    const key = fn(item);

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(item);
  });

  return grouped;
};

describe('groupBy', () => {
  it('should group by id', () => {
    const array = [{ id: '1' }, { id: '1' }, { id: '2' }];
    const fn = function (item: { id: string }) {
      return item.id;
    };

    const result = array.groupBy(fn);

    expect(result).toEqual({ '1': [{ id: '1' }, { id: '1' }], '2': [{ id: '2' }] });
  });

  it('should group by first element in the array', () => {
    const array = [
      [1, 2, 3],
      [1, 3, 5],
      [1, 5, 9],
    ];
    const fn = function (list: number[]) {
      return String(list[0]);
    };

    const result = array.groupBy(fn);

    expect(result).toEqual({
      '1': [
        [1, 2, 3],
        [1, 3, 5],
        [1, 5, 9],
      ],
    });
  });

  it('should group by whether the number is greater than 5', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const fn = function (n: number) {
      return String(n > 5);
    };

    const result = array.groupBy(fn);

    expect(result).toEqual({ true: [6, 7, 8, 9, 10], false: [1, 2, 3, 4, 5] });
  });
});
