import { assertEquals } from '@std/assert';
import {
  calculateSumOfAllNumbersExceptRedInJSON,
  calculateSumOfAllNumbersInJSON
} from './solution.ts';

Deno.test('day 12 part 1 examples', () => {
  assertEquals(calculateSumOfAllNumbersInJSON([1, 2, 3]), 6);
  assertEquals(calculateSumOfAllNumbersInJSON({ a: 2, b: 4 }), 6);
  assertEquals(calculateSumOfAllNumbersInJSON([[[3]]]), 3);
  assertEquals(calculateSumOfAllNumbersInJSON({ a: { b: 4 }, c: -1 }), 3);
  assertEquals(calculateSumOfAllNumbersInJSON({ a: [-1, 1] }), 0);
  assertEquals(calculateSumOfAllNumbersInJSON([-1, { a: 1 }]), 0);
  assertEquals(calculateSumOfAllNumbersInJSON([]), 0);
  assertEquals(calculateSumOfAllNumbersInJSON({}), 0);
});

Deno.test('day 12 part 2 examples', () => {
  assertEquals(calculateSumOfAllNumbersExceptRedInJSON([1, 2, 3]), 6);
  assertEquals(
    calculateSumOfAllNumbersExceptRedInJSON([1, { c: 'red', b: 2 }, 3]),
    4
  );
  assertEquals(
    calculateSumOfAllNumbersExceptRedInJSON({
      d: 'red',
      e: [1, 2, 3, 4],
      f: 5
    }),
    0
  );
  assertEquals(calculateSumOfAllNumbersExceptRedInJSON([1, 'red', 5]), 6);
});
