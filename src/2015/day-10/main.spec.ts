import { describe, test, expect } from '@jest/globals';
import { lookAndSaySequence } from './main';

describe('Day 10: Elves Look, Elves Say', () => {
  test('1 becomes 11 (1 copy of digit 1)', () => {
    expect(lookAndSaySequence('1', 1)).toBe('11');
  });

  test('11 becomes 21 (2 copies of digit 1)', () => {
    expect(lookAndSaySequence('1', 2)).toBe('21');
  });

  test('21 becomes 1211 (one 2 followed by one 1)', () => {
    expect(lookAndSaySequence('1', 3)).toBe('1211');
  });

  test('1211 becomes 111221 (one 1, one 2, and two 1s)', () => {
    expect(lookAndSaySequence('1', 4)).toBe('111221');
  });

  test('111221 becomes 312211 (three 1s, two 2s, and one 1)', () => {
    expect(lookAndSaySequence('1', 5)).toBe('312211');
  });
});
