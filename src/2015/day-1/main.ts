import input from './input.json';

export function day1Part1(input: string): number {
  const upOneFloor = '(';
  const downOneFloor = ')';
  let floor = 0;

  for (let floorStep of input) {
    if (floorStep === upOneFloor) {
      floor = floor + 1;
    }

    if (floorStep === downOneFloor) {
      floor = floor - 1;
    }
  }

  return floor;
}

export function day1Part2(input: string): number | undefined {
  const basementFloor = -1;

  for (let position = 1; position <= input.length; position++) {
    const subInput = input.substring(0, position);
    const currentFloor = day1Part1(subInput);

    if (currentFloor === basementFloor) {
      return position;
    }
  }
}

const day1Part1Answer = day1Part1(input);
console.log('Day 1 -> Part 1 -> Answer:', day1Part1Answer);

const day1Part2Answer = day1Part2(input);
console.log('Day 1 -> Part 2 -> Answer:', day1Part2Answer);
