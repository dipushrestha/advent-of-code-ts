import { assertEquals } from '@std/assert';
import { getNumberOfLightsLit, getTotalBrightnessOfAllLights } from './solution.ts';

Deno.test('day 6 part 1 examples', () => {
  assertEquals(getNumberOfLightsLit(['turn on 0,0 through 999,999']), 1000000);
  assertEquals(getNumberOfLightsLit(['toggle 0,0 through 999,0']), 1000);
  assertEquals(
    getNumberOfLightsLit([
      'toggle 0,0 through 999,0',
      'toggle 0,0 through 999,0'
    ]),
    0
  );
  assertEquals(
    getNumberOfLightsLit([
      'turn on 0,0 through 999,999',
      'turn off 499,499 through 500,500'
    ]),
    1000000 - 4
  );
});

Deno.test('day 6 part 2 examples', () => {
  assertEquals(getTotalBrightnessOfAllLights(['turn on 0,0 through 0,0']), 1);
  assertEquals(
    getTotalBrightnessOfAllLights(['toggle 0,0 through 999,999']),
    2000000
  );
  assertEquals(
    getTotalBrightnessOfAllLights([
      'turn on 0,0 through 0,0',
      'turn off 0,0 through 0,0'
    ]),
    0
  );
  assertEquals(
    getTotalBrightnessOfAllLights([
      'turn on 0,0 through 0,0',
      'turn off 0,0 through 0,0',
      'turn off 0,0 through 0,0'
    ]),
    0
  );
});
