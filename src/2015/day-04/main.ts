import { createHash } from 'crypto';

export function findLowestNumberCreatingMD5HashWithLeadingZeros(
  secretKey: string,
  zeroesCount: number
): number {
  let md5Hash = '';
  let keyNumber = 0;
  const zeroes = '0'.repeat(zeroesCount);

  while (!md5Hash.startsWith(zeroes)) {
    keyNumber += 1;
    md5Hash = createHash('md5')
      .update(secretKey + keyNumber)
      .digest('hex');
  }

  return keyNumber;
}

const puzzleSecretKey = 'iwrupvqb';

console.log(
  'Day 4 -> Part 1 -> Answer(Lowest positive number generating MD5 hash having leading five zeroes:',
  findLowestNumberCreatingMD5HashWithLeadingZeros(puzzleSecretKey, 5)
);

console.log(
  'Day 4 -> Part 2 -> Answer(Lowest positive number generating MD5 hash having leading six zeroes:',
  findLowestNumberCreatingMD5HashWithLeadingZeros(puzzleSecretKey, 6)
);
