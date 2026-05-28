import { assertEquals } from '@std/assert';
import {
  getRequiredRibbonForPresent,
  getRequiredWrappingPaperForPresent
} from './solution.ts';

Deno.test('day 2 wrapping paper examples', () => {
  assertEquals(getRequiredWrappingPaperForPresent('2x3x4'), 58);
  assertEquals(getRequiredWrappingPaperForPresent('1x1x10'), 43);
});

Deno.test('day 2 ribbon examples', () => {
  assertEquals(getRequiredRibbonForPresent('2x3x4'), 34);
  assertEquals(getRequiredRibbonForPresent('1x1x10'), 14);
});
