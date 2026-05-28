import { assertEquals } from '@std/assert';
import { isNiceString2, isStringNice } from './solution.ts';

Deno.test('day 5 part 1 examples', () => {
  assertEquals(isStringNice('ugknbfddgicrmopn'), true);
  assertEquals(isStringNice('aaa'), true);
  assertEquals(isStringNice('jchzalrnumimnmhp'), false);
  assertEquals(isStringNice('haegwjzuvuyypxyu'), false);
  assertEquals(isStringNice('dvszwmarrgswjxmb'), false);
});

Deno.test('day 5 part 2 examples', () => {
  assertEquals(isNiceString2('qjhvhtzxzqqjkmpb'), true);
  assertEquals(isNiceString2('xxyxx'), true);
  assertEquals(isNiceString2('uurcxstgmygtbstg'), false);
  assertEquals(isNiceString2('ieodomkazucvgmuy'), false);
  assertEquals(isNiceString2('aaa'), false);
});
