import { describe, expect, test } from '@jest/globals';
import { isNiceString2, isStringNice } from './main';

describe("Day 5: Doesn't He Have Intern-Elves For This?", () => {
  test('ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings', () => {
    expect(isStringNice('ugknbfddgicrmopn')).toBe(true);
  });

  test('aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap', () => {
    expect(isStringNice('aaa')).toBe(true);
  });

  test('jchzalrnumimnmhp is naughty because it has no double letter', () => {
    expect(isStringNice('jchzalrnumimnmhp')).toBe(false);
  });

  test('haegwjzuvuyypxyu is naughty because it contains the string xy', () => {
    expect(isStringNice('haegwjzuvuyypxyu')).toBe(false);
  });

  test('dvszwmarrgswjxmb is naughty because it contains only one vowel', () => {
    expect(isStringNice('dvszwmarrgswjxmb')).toBe(false);
  });

  test('qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz)', () => {
    expect(isNiceString2('qjhvhtzxzqqjkmpb')).toBe(true);
  });

  test('xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap', () => {
    expect(isNiceString2('xxyxx')).toBe(true);
  });

  test('uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them', () => {
    expect(isNiceString2('uurcxstgmygtbstg')).toBe(false);
  });

  test('ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice', () => {
    expect(isNiceString2('ieodomkazucvgmuy')).toBe(false);
  });

  test('aaa is naughty because it has a repeating letter with one between (aaa), but no pair that appears without overlapping', () => {
    expect(isNiceString2('aaa')).toBe(false);
  });
});
