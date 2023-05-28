import { describe, test, expect } from '@jest/globals';
import { getFloorNumber, getFirstBasementPosition } from './main';

describe('Day 1: Not Quite Lisp', () => {
  test('(()) and ()() both result in floor 0', () => {
    expect(getFloorNumber('(())')).toBe(0);
    expect(getFloorNumber('()()')).toBe(0);
  });

  test('((( and (()(()( both result in floor 3', () => {
    expect(getFloorNumber('(((')).toBe(3);
    expect(getFloorNumber('(()(()(')).toBe(3);
  });

  test('))((((( also results in floor 3', () => {
    expect(getFloorNumber('))(((((')).toBe(3);
  });

  test('()) and ))( both result in floor -1 (the first basement level)', () => {
    expect(getFloorNumber('())')).toBe(-1);
    expect(getFloorNumber('))(')).toBe(-1);
  });

  test('))) and )())()) both result in floor -3', () => {
    expect(getFloorNumber(')))')).toBe(-3);
    expect(getFloorNumber(')())())')).toBe(-3);
  });

  test(') causes him to enter the basement at character position 1', () => {
    expect(getFirstBasementPosition(')')).toBe(1);
  });

  test('()()) causes him to enter the basement at character position 5', () => {
    expect(getFirstBasementPosition('()())')).toBe(5);
  });
});
