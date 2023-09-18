import { readFileSync } from 'fs';

const testStrings = readFileSync(`${__dirname}/input.txt`, 'utf-8').split('\n');

export function isStringNice(testString: string): boolean {
  const MIN_VOWEL_COUNT = 3;
  const vowelChars = new Set(['a', 'e', 'i', 'o', 'u']);
  const naughtyStrings = new Set(['ab', 'cd', 'pq', 'xy']);

  let vowelCount = 0;
  let prevChar = '';
  let hasLetterTwiceInARow = false;

  for (let char of testString) {
    if (vowelChars.has(char)) {
      vowelCount += 1;
    }

    if (prevChar === char) {
      hasLetterTwiceInARow = true;
    }

    if (naughtyStrings.has(prevChar + char)) {
      return false;
    }

    prevChar = char;
  }

  return vowelCount >= MIN_VOWEL_COUNT && hasLetterTwiceInARow;
}

export function isNiceString2(testString: string): boolean {
  const charPairs = new Set();

  let prevChar = '';
  let prevPrevChar = '';
  let hasRepeatCharPairs = false;
  let hasRepeatCharWithCharInBetween = false;

  for (let char of testString) {
    if (charPairs.has(prevChar + char)) {
      hasRepeatCharPairs = true;
    }

    if (prevChar !== '') {
      charPairs.add(prevChar + char);
    }

    if (prevPrevChar === prevChar && prevChar === char) {
      hasRepeatCharPairs = false;
      charPairs.delete(prevChar + char);
    }

    if (prevPrevChar === char) {
      hasRepeatCharWithCharInBetween = true;
    }

    if (hasRepeatCharPairs && hasRepeatCharWithCharInBetween) {
      return true;
    }

    prevPrevChar = prevChar;
    prevChar = char;
  }

  return false;
}

let niceStringCount = 0;
let niceString2Count = 0;

for (let testString of testStrings) {
  if (isStringNice(testString)) {
    niceStringCount += 1;
  }

  if (isNiceString2(testString)) {
    niceString2Count += 1;
  }
}

console.log(
  'Day 5 -> Part 1 -> Answer(Count of nice strings):',
  niceStringCount
);

console.log(
  'Day 5 -> Part 2 -> Answer(Count of nice strings):',
  niceString2Count
);
