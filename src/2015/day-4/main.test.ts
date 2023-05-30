import { describe, test, expect } from '@jest/globals';
import { findLowestNumberCreatingMD5HashWithLeadingZeros } from './main';

describe('Day 4: The Ideal Stocking Stuffer', () => {
  test('If your secret key is abcdef, the answer is 609043, because the MD5 hash of abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest such number to do so', () => {
    expect(findLowestNumberCreatingMD5HashWithLeadingZeros('abcdef', 5)).toBe(
      609043
    );
  });
  test('If your secret key is pqrstuv, the lowest number it combines with to make an MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of pqrstuv1048970 looks like 000006136ef...', () => {
    expect(findLowestNumberCreatingMD5HashWithLeadingZeros('pqrstuv', 5)).toBe(
      1048970
    );
  });
});
