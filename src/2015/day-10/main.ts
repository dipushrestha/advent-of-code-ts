const puzzleInput = '1113122113';
const part1ApplyTimes = 40;
const part2ApplyTimes = 50;

function nextLookAndSayTerm(input: string): string {
  const digits = input.split('');
  const digitsBlocks: { digit: string; count: number }[] = [];

  for (const digit of digits) {
    if (digitsBlocks.at(-1)?.digit === digit) {
      digitsBlocks.at(-1)!.count += 1;
    } else {
      digitsBlocks.push({ digit, count: 1 });
    }
  }

  return digitsBlocks.reduce(
    (seq, { digit, count }) => `${seq}${count}${digit}`,
    ''
  );
}

export function lookAndSaySequence(startInput: string, n: number): string {
  let nextTerm = nextLookAndSayTerm(startInput);

  for (let i = 1; i < n; i++) {
    nextTerm = nextLookAndSayTerm(nextTerm);
  }

  return nextTerm;
}

console.log(
  `Day 10 -> Part 1 -> Answer(Length of result for input(${puzzleInput}) processed ${part1ApplyTimes}):`,
  lookAndSaySequence(puzzleInput, part1ApplyTimes).length
);

console.log(
  `Day 10 -> Part 2 -> Answer(Length of result for input(${puzzleInput}) processed ${part2ApplyTimes}):`,
  lookAndSaySequence(puzzleInput, part2ApplyTimes).length
);
