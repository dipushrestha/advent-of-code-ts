import { describe, expect, test } from '@jest/globals';
import { getNumberOfHousesReceivingPresent } from './main';

describe('Day 3: Perfectly Spherical Houses in a Vacuum', () => {
  test('> delivers presents to 2 houses: one at the starting location, and one to the east', () => {
    expect(getNumberOfHousesReceivingPresent('>')).toBe(2);
  });

  test('^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location', () => {
    expect(getNumberOfHousesReceivingPresent('^>v<')).toBe(4);
  });

  test('^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses', () => {
    expect(getNumberOfHousesReceivingPresent('^v^v^v^v^v')).toBe(2);
  });
});
