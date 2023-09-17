import { describe, test, expect } from '@jest/globals';
import {
  hasNoIOL,
  hasNonOverlappingTwoLetterPairs,
  hasStraightOfThreeLetters,
  nextPassword
} from './main';

describe('Day 11: Corporate Policy', () => {
  test('`hijklmmn` meets the first requirement (because it contains the straight hij) but fails the second requirement requirement (because it contains i and l)', () => {
    expect(hasStraightOfThreeLetters('hijklmmn')).toBe(true);
    expect(hasNoIOL('hijklmmn')).toBe(false);
    expect(hasNonOverlappingTwoLetterPairs('hijklmmn')).toBe(false);
  });

  test('`abbceffg` meets the third requirement (because it repeats bb and ff) but fails the first requirement', () => {
    expect(hasStraightOfThreeLetters('abbceffg')).toBe(false);
    expect(hasNoIOL('abbceffg')).toBe(true);
    expect(hasNonOverlappingTwoLetterPairs('abbceffg')).toBe(true);
  });

  test('`abbcegjk` fails the third requirement, because it only has one double letter (bb)', () => {
    expect(hasStraightOfThreeLetters('abbcegjk')).toBe(false);
    expect(hasNoIOL('abbcegjk')).toBe(true);
    expect(hasNonOverlappingTwoLetterPairs('abbcegjk')).toBe(false);
  });

  test('The next password after `abcdefgh` is `abcdffaa`', () => {
    expect(nextPassword('abcdefgh')).toBe('abcdffaa');
  });

  test('The next password after ghijklmn is ghjaabcc, because you eventually skip all the passwords that start with ghi..., since i is not allowed', () => {
    expect(nextPassword('ghijklmn')).toBe('ghjaabcc');
  });
});
