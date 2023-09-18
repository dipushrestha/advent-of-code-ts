import { describe, expect, test } from '@jest/globals';
import {
  getNumberOfHousesReceivingPresentFromSanta,
  getNumberOfHousesReceivingPresentFromSantaAndRoboSanta
} from './main';

describe('Day 3: Perfectly Spherical Houses in a Vacuum', () => {
  test('> delivers presents to 2 houses: one at the starting location, and one to the east', () => {
    expect(getNumberOfHousesReceivingPresentFromSanta('>')).toBe(2);
  });

  test('^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location', () => {
    expect(getNumberOfHousesReceivingPresentFromSanta('^>v<')).toBe(4);
  });

  test('^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses', () => {
    expect(getNumberOfHousesReceivingPresentFromSanta('^v^v^v^v^v')).toBe(2);
  });

  test('^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south', () => {
    expect(getNumberOfHousesReceivingPresentFromSantaAndRoboSanta('^v')).toBe(
      3
    );
  });

  test('^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started', () => {
    expect(getNumberOfHousesReceivingPresentFromSantaAndRoboSanta('^>v<')).toBe(
      3
    );
  });

  test('^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other', () => {
    expect(
      getNumberOfHousesReceivingPresentFromSantaAndRoboSanta('^v^v^v^v^v')
    ).toBe(11);
  });
});
