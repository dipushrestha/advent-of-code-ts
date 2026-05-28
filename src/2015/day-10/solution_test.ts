import { assertEquals } from '@std/assert';
import { lookAndSaySequence } from './solution.ts';

Deno.test('day 10 sequence examples', () => {
  assertEquals(lookAndSaySequence('1', 1), '11');
  assertEquals(lookAndSaySequence('1', 2), '21');
  assertEquals(lookAndSaySequence('1', 3), '1211');
  assertEquals(lookAndSaySequence('1', 4), '111221');
  assertEquals(lookAndSaySequence('1', 5), '312211');
});
