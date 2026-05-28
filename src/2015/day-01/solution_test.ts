import { assertEquals } from '@std/assert';
import { getFirstBasementPosition, getFloorNumber } from './solution.ts';

Deno.test('day 1 floor number examples', () => {
  assertEquals(getFloorNumber('(())'), 0);
  assertEquals(getFloorNumber('()()'), 0);
  assertEquals(getFloorNumber('((('), 3);
  assertEquals(getFloorNumber('(()(()('), 3);
  assertEquals(getFloorNumber('))((((('), 3);
  assertEquals(getFloorNumber('())'), -1);
  assertEquals(getFloorNumber('))('), -1);
  assertEquals(getFloorNumber(')))'), -3);
  assertEquals(getFloorNumber(')())())'), -3);
});

Deno.test('day 1 first basement examples', () => {
  assertEquals(getFirstBasementPosition(')'), 1);
  assertEquals(getFirstBasementPosition('()())'), 5);
});
