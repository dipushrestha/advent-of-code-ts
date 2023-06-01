import { describe, test, expect } from '@jest/globals';
import { getNumberOfLightsLit, getTotalBrightnessOfAllLights } from './main';

describe('Day 6: Probably a Fire Hazard', () => {
  test('turn on 0,0 through 999,999 would turn on (or leave on) every light', () => {
    expect(getNumberOfLightsLit(['turn on 0,0 through 999,999'])).toBe(1000000);
  });

  test('toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off', () => {
    expect(getNumberOfLightsLit(['toggle 0,0 through 999,0'])).toBe(1000);

    expect(
      getNumberOfLightsLit([
        'toggle 0,0 through 999,0',
        'toggle 0,0 through 999,0'
      ])
    ).toBe(0);
  });

  test('turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights', () => {
    expect(
      getNumberOfLightsLit([
        'turn on 0,0 through 999,999', // turns on all 1000000 lights
        'turn off 499,499 through 500,500' // turns off the middle four lights (499, 499), (499, 500), (500, 499), (500, 500)
      ])
    ).toBe(1000000 - 4);
  });

  test('turn on 0,0 through 0,0 would increase the total brightness by 1', () => {
    expect(getTotalBrightnessOfAllLights(['turn on 0,0 through 0,0'])).toBe(1);
  });

  test('toggle 0,0 through 999,999 would increase the total brightness by 2000000', () => {
    expect(getTotalBrightnessOfAllLights(['toggle 0,0 through 999,999'])).toBe(
      2000000
    );
  });

  test('turn off 0,0 through 0,0 would decrease the total brightness by 1', () => {
    expect(
      getTotalBrightnessOfAllLights([
        'turn on 0,0 through 0,0',
        'turn off 0,0 through 0,0'
      ])
    ).toBe(0);

    expect(
      getTotalBrightnessOfAllLights([
        'turn on 0,0 through 0,0',
        'turn off 0,0 through 0,0',
        'turn off 0,0 through 0,0'
      ])
    ).toBe(0);
  });
});
