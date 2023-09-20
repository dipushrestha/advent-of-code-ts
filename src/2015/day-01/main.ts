import floorInstructions from './input.json';

export function getFloorNumber(floorInstructions: string): number {
  const upOneFloor = '(';
  const downOneFloor = ')';
  let floor = 0;

  for (let floorInstruction of floorInstructions) {
    if (floorInstruction === upOneFloor) {
      floor = floor + 1;
    }

    if (floorInstruction === downOneFloor) {
      floor = floor - 1;
    }
  }

  return floor;
}

export function getFirstBasementPosition(
  floorInstructions: string
): number | undefined {
  const basementFloor = -1;

  for (let position = 1; position <= floorInstructions.length; position++) {
    const firstFloorInstructions = floorInstructions.substring(0, position);
    const currentFloor = getFloorNumber(firstFloorInstructions);

    if (currentFloor === basementFloor) {
      return position;
    }
  }
}

const day1Part1Answer = getFloorNumber(floorInstructions);
console.log(
  'Day 1 -> Part 1 -> Answer(Floor the instructions take Santa):',
  day1Part1Answer
);

const day1Part2Answer = getFirstBasementPosition(floorInstructions);
console.log(
  'Day 1 -> Part 2 -> Answer(Position of the character that causes Santa to first enter the basement):',
  day1Part2Answer
);
