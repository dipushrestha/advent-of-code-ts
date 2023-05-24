import { describe, test, expect } from '@jest/globals';
import { day1Part1 } from './main';

describe('Day 1: Not Quite Lisp', () => {
  test('(()) and ()() both result in floor 0', () => {
    expect(day1Part1('(())')).toBe(0);
    expect(day1Part1('()()')).toBe(0);
  });
  test('((( and (()(()( both result in floor 3', () => {
    expect(day1Part1('(((')).toBe(3);
    expect(day1Part1('(()(()(')).toBe(3);
  });

  test('))((((( also results in floor 3', () => {
    expect(day1Part1('))(((((')).toBe(3);
  });

  test('()) and ))( both result in floor -1 (the first basement level)', () => {
    expect(day1Part1('())')).toBe(-1);
    expect(day1Part1('))(')).toBe(-1);
  });

  test('))) and )())()) both result in floor -3', () => {
    expect(day1Part1(')))')).toBe(-3);
    expect(day1Part1(')())())')).toBe(-3);
  });
});
