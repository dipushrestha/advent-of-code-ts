import { describe, test, expect } from '@jest/globals';
import { calculateSumOfAllNumbersInJSON } from './main';

describe('Day 12: JSAbacusFramework.io', () => {
  test('[1,2,3] and {"a":2,"b":4} both have a sum of 6', () => {
    expect(calculateSumOfAllNumbersInJSON([1, 2, 3])).toBe(6);
    expect(calculateSumOfAllNumbersInJSON({ a: 2, b: 4 })).toBe(6);
  });

  test('[[[3]]] and {"a":{"b":4},"c":-1} both have a sum of 3', () => {
    expect(calculateSumOfAllNumbersInJSON([[[3]]])).toBe(3);
    expect(calculateSumOfAllNumbersInJSON({ a: { b: 4 }, c: -1 })).toBe(3);
  });

  test('{"a":[-1,1]} and [-1,{"a":1}] both have a sum of 0', () => {
    expect(calculateSumOfAllNumbersInJSON({ a: [-1, 1] })).toBe(0);
    expect(calculateSumOfAllNumbersInJSON([-1, { a: 1 }])).toBe(0);
  });

  test('[] and {} both have a sum of 0', () => {
    expect(calculateSumOfAllNumbersInJSON([])).toBe(0);
    expect(calculateSumOfAllNumbersInJSON({})).toBe(0);
  });
});
