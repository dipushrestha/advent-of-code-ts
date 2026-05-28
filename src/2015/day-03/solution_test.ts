import { assertEquals } from '@std/assert';
import {
  getNumberOfHousesReceivingPresentFromSanta,
  getNumberOfHousesReceivingPresentFromSantaAndRoboSanta
} from './solution.ts';

Deno.test('day 3 santa only examples', () => {
  assertEquals(getNumberOfHousesReceivingPresentFromSanta('>'), 2);
  assertEquals(getNumberOfHousesReceivingPresentFromSanta('^>v<'), 4);
  assertEquals(getNumberOfHousesReceivingPresentFromSanta('^v^v^v^v^v'), 2);
});

Deno.test('day 3 santa and robo-santa examples', () => {
  assertEquals(getNumberOfHousesReceivingPresentFromSantaAndRoboSanta('^v'), 3);
  assertEquals(
    getNumberOfHousesReceivingPresentFromSantaAndRoboSanta('^>v<'),
    3
  );
  assertEquals(
    getNumberOfHousesReceivingPresentFromSantaAndRoboSanta('^v^v^v^v^v'),
    11
  );
});
