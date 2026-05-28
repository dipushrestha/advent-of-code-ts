import { assertEquals } from '@std/assert';
import { findLowestNumberCreatingMD5HashWithLeadingZeros } from './solution.ts';

Deno.test('day 4 examples', () => {
  assertEquals(findLowestNumberCreatingMD5HashWithLeadingZeros('abcdef', 5), 609043);
  assertEquals(
    findLowestNumberCreatingMD5HashWithLeadingZeros('pqrstuv', 5),
    1048970
  );
});
