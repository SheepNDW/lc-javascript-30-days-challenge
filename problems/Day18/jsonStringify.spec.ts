import { describe, expect, it } from 'vitest';
import { jsonStringify } from './jsonStringify';

describe('jsonStringify', () => {
  it('should correctly convert an object with two integer properties', () => {
    const input = { y: 1, x: 2 };

    const result = jsonStringify(input);

    expect(result).toEqual('{"y":1,"x":2}');
  });

  it('should correctly convert an object with various types of properties', () => {
    const input = { a: 'str', b: -12, c: true, d: null };

    const result = jsonStringify(input);

    expect(result).toEqual('{"a":"str","b":-12,"c":true,"d":null}');
  });

  it('should correctly convert an object with nested object and array properties', () => {
    const input = { key: { a: 1, b: [{}, null, 'Hello'] } };

    const result = jsonStringify(input);

    expect(result).toEqual('{"key":{"a":1,"b":[{},null,"Hello"]}}');
  });

  it('should correctly convert a boolean primitive', () => {
    const input = true;

    const result = jsonStringify(input);

    expect(result).toEqual('true');
  });
});
