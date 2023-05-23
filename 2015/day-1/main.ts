import input from './input.json';

export function day1(input: string): number {
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

const day1Answer = day1(input);
console.log('Day 1, Answer:', day1Answer);
