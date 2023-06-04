import { readFileSync } from 'fs';

const stringLiterals = readFileSync(`${__dirname}/input.txt`, 'utf-8').split(
  '\n'
);

export function stringLiteralMemoryCharDiff(stringLiterals: string[]): number {
  let stringLiteralCount = 0;
  let memoryCharCount = 0;

  for (let stringLiteral of stringLiterals) {
    stringLiteralCount += stringLiteral.length;

    memoryCharCount += stringLiteral
      .replace(/^"|"$/gm, '')
      .replace(/\\(\\|"|x..)/g, '_').length;
  }

  return stringLiteralCount - memoryCharCount;
}

export function encodedStringOriginalStringCharDiff(
  stringLiterals: string[]
): number {
  let stringLiteralCount = 0;
  let encodedStringCharCount = 0;

  for (let stringLiteral of stringLiterals) {
    stringLiteralCount += stringLiteral.length;

    encodedStringCharCount += `"${stringLiteral
      .replaceAll('\\', '\\\\')
      .replaceAll('"', '\\"')}"`.length;
  }

  return encodedStringCharCount - stringLiteralCount;
}

console.log(
  'Day 8 -> Part 1 -> Answer(Difference between number of characters in string literal and in actual memory):',
  stringLiteralMemoryCharDiff(stringLiterals)
);

console.log(
  'Day 8 -> Part 2 -> Answer(Difference between number of characters in encoded strings and in the original string literals):',
  encodedStringOriginalStringCharDiff(stringLiterals)
);
