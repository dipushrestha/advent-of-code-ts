import { describe, test, expect } from '@jest/globals';
import {
  encodedStringOriginalStringCharDiff,
  stringLiteralMemoryCharDiff
} from './main';

describe('Day 8: Matchsticks', () => {
  test(`"" is 2 characters of code (the two double quotes), but the string contains zero characters`, () => {
    expect(stringLiteralMemoryCharDiff([String.raw`""`])).toBe(2);
  });

  test(`"abc" is 5 characters of code, but 3 characters in the string data`, () => {
    expect(stringLiteralMemoryCharDiff([String.raw`"abc"`])).toBe(2);
  });

  test(
    String.raw`"aaa\"aaa" is 10 characters of code, but the string itself contains six "a" characters and a single, escaped quote character, for a total of 7 characters in the string data`,
    () => {
      expect(stringLiteralMemoryCharDiff([String.raw`"aaa\"aaa"`])).toBe(3);
    }
  );

  test(
    String.raw`"\x27" is 6 characters of code, but the string itself contains just one - an apostrophe ('), escaped using hexadecimal notation`,
    () => {
      expect(stringLiteralMemoryCharDiff([String.raw`"\x27"`])).toBe(5);
    }
  );

  test(`above all four string literals combined`, () => {
    expect(
      stringLiteralMemoryCharDiff([
        String.raw`""`,
        String.raw`"abc"`,
        String.raw`"aaa\"aaa"`,
        String.raw`"\x27"`
      ])
    ).toBe(12);
  });

  test(
    String.raw`"inleep\\mgl" is 13 characters of code, but the string itself contains 10 characters`,
    () => {
      expect(stringLiteralMemoryCharDiff([String.raw`"inleep\\mgl"`])).toBe(3);
    }
  );

  test(
    String.raw`"" encodes to "\"\"", an increase from 2 characters to 6`,
    () => {
      expect(encodedStringOriginalStringCharDiff([String.raw`""`])).toBe(4);
    }
  );

  test(
    String.raw`"abc" encodes to "\"abc\"", an increase from 5 characters to 9`,
    () => {
      expect(encodedStringOriginalStringCharDiff([String.raw`"abc"`])).toBe(4);
    }
  );

  test(
    String.raw`"aaa\"aaa" encodes to "\"aaa\\\"aaa\"", an increase from 10 characters to 16`,
    () => {
      expect(
        encodedStringOriginalStringCharDiff([String.raw`"aaa\"aaa"`])
      ).toBe(6);
    }
  );

  test(
    String.raw`"\x27" encodes to "\"\\x27\"", an increase from 6 characters to 11`,
    () => {
      expect(encodedStringOriginalStringCharDiff([String.raw`"\x27"`])).toBe(5);
    }
  );

  test(`combined all above four string literals`, () => {
    expect(
      encodedStringOriginalStringCharDiff([
        String.raw`""`,
        String.raw`"abc"`,
        String.raw`"aaa\"aaa"`,
        String.raw`"\x27"`
      ])
    ).toBe(19);
  });
});
