import { assertEquals } from '@std/assert';
import {
  hasNoIOL,
  hasNonOverlappingTwoLetterPairs,
  hasStraightOfThreeLetters,
  nextPassword
} from './solution.ts';

Deno.test('day 11 rule checks', () => {
  assertEquals(hasStraightOfThreeLetters('hijklmmn'), true);
  assertEquals(hasNoIOL('hijklmmn'), false);
  assertEquals(hasNonOverlappingTwoLetterPairs('hijklmmn'), false);

  assertEquals(hasStraightOfThreeLetters('abbceffg'), false);
  assertEquals(hasNoIOL('abbceffg'), true);
  assertEquals(hasNonOverlappingTwoLetterPairs('abbceffg'), true);

  assertEquals(hasStraightOfThreeLetters('abbcegjk'), false);
  assertEquals(hasNoIOL('abbcegjk'), true);
  assertEquals(hasNonOverlappingTwoLetterPairs('abbcegjk'), false);
});

Deno.test('day 11 next password examples', () => {
  assertEquals(nextPassword('abcdefgh'), 'abcdffaa');
  assertEquals(nextPassword('ghijklmn'), 'ghjaabcc');
});
