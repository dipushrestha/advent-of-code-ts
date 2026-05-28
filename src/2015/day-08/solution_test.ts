import { assertEquals } from '@std/assert';
import {
  encodedStringOriginalStringCharDiff,
  stringLiteralMemoryCharDiff
} from './solution.ts';

Deno.test('day 8 part 1 examples', () => {
  assertEquals(stringLiteralMemoryCharDiff([String.raw`""`]), 2);
  assertEquals(stringLiteralMemoryCharDiff([String.raw`"abc"`]), 2);
  assertEquals(stringLiteralMemoryCharDiff([String.raw`"aaa\"aaa"`]), 3);
  assertEquals(stringLiteralMemoryCharDiff([String.raw`"\x27"`]), 5);
  assertEquals(
    stringLiteralMemoryCharDiff([
      String.raw`""`,
      String.raw`"abc"`,
      String.raw`"aaa\"aaa"`,
      String.raw`"\x27"`
    ]),
    12
  );
  assertEquals(stringLiteralMemoryCharDiff([String.raw`"inleep\\mgl"`]), 3);
});

Deno.test('day 8 part 2 examples', () => {
  assertEquals(encodedStringOriginalStringCharDiff([String.raw`""`]), 4);
  assertEquals(encodedStringOriginalStringCharDiff([String.raw`"abc"`]), 4);
  assertEquals(encodedStringOriginalStringCharDiff([String.raw`"aaa\"aaa"`]), 6);
  assertEquals(encodedStringOriginalStringCharDiff([String.raw`"\x27"`]), 5);
  assertEquals(
    encodedStringOriginalStringCharDiff([
      String.raw`""`,
      String.raw`"abc"`,
      String.raw`"aaa\"aaa"`,
      String.raw`"\x27"`
    ]),
    19
  );
});
