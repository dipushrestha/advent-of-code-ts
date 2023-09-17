const puzzleInput = 'vzbxkghb';

export function hasStraightOfThreeLetters(text: string): boolean {
  return (
    text.match(
      /abc|bcd|cde|def|efg|fgh|ghi|hij|jik|ikl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/
    ) !== null
  );
}

export function hasNoIOL(text: string): boolean {
  return text.match(/[iol]/) === null;
}

export function hasNonOverlappingTwoLetterPairs(text: string): boolean {
  return new Set(text.match(/([a-z])\1/g)).size >= 2;
}

function incrementPassword(password: string): string {
  const passwordChars = password.split('');

  for (let i = passwordChars.length - 1; i >= 0; i--) {
    if (passwordChars[i] !== 'z') {
      passwordChars[i] = String.fromCharCode(
        passwordChars[i]!.charCodeAt(0) + 1
      );

      for (let j = i + 1; j < passwordChars.length; j++) {
        passwordChars[j] = 'a';
      }

      break;
    }
  }

  return passwordChars.join('');
}

export function nextPassword(password: string): string {
  const MaxCounter = 99999999;
  let counter = 1;
  let newPassword = password;

  while (true) {
    newPassword = incrementPassword(newPassword);

    if (counter++ > MaxCounter) throw new Error('Counter exceeded');

    if (
      hasNoIOL(newPassword) &&
      hasStraightOfThreeLetters(newPassword) &&
      hasNonOverlappingTwoLetterPairs(newPassword)
    ) {
      break;
    }
  }

  return newPassword;
}

const part1Password = nextPassword(puzzleInput);
const part2Password = nextPassword(part1Password);

console.log(
  `Day 11 -> Part 1 -> Answer(Next password from input(${puzzleInput}):`,
  part1Password
);

console.log(
  `Day 11 -> Part 2 -> Answer(Next password from input(${puzzleInput}):`,
  part2Password
);
