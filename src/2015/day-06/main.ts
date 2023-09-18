import { readFileSync } from 'fs';

const instructionsText = readFileSync(`${__dirname}/input.txt`, 'utf-8').split(
  '\n'
);

type Coordinate = [x: number, y: number];
type InstructionType = 'turn on' | 'turn off' | 'toggle';

type Instruction = {
  instructionType: InstructionType;
  startPoint: Coordinate;
  stopPoint: Coordinate;
};

function parseInstruction(instruction: string): Instruction {
  const instructionWords = instruction.split(' ');

  const instructionType = (
    instructionWords.length === 5
      ? `${instructionWords[0]} ${instructionWords[1]}`
      : instructionWords[0]
  ) as InstructionType;

  const startPoint = instructionWords
    .at(-3)!
    .split(',')
    .map((vertex) => parseInt(vertex)) as Coordinate;

  const stopPoint = instructionWords
    .at(-1)!
    .split(',')
    .map((vertex) => parseInt(vertex)) as Coordinate;

  return {
    instructionType,
    startPoint,
    stopPoint
  };
}

function performLightLitInstruction(
  grid: boolean[][],
  { instructionType, startPoint, stopPoint }: Instruction
): void {
  for (let row = startPoint[0]; row <= stopPoint[0]; row++) {
    for (let col = startPoint[1]; col <= stopPoint[1]; col++) {
      switch (instructionType) {
        case 'turn on':
          grid[row]![col] = true;
          break;

        case 'turn off':
          grid[row]![col] = false;
          break;

        case 'toggle':
          grid[row]![col] = !grid[row]![col];
          break;
      }
    }
  }
}

export function getNumberOfLightsLit(instructionsText: string[]) {
  const grid1000x1000 = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => false)
  );

  for (let instructionText of instructionsText) {
    const instruction = parseInstruction(instructionText);
    performLightLitInstruction(grid1000x1000, instruction);
  }

  let litLightCount = 0;

  for (let rows of grid1000x1000) {
    for (let cell of rows) {
      litLightCount += Number(cell);
    }
  }

  return litLightCount;
}

function performBrightnessControlInstruction(
  grid: number[][],
  { instructionType, startPoint, stopPoint }: Instruction
) {
  for (let row = startPoint[0]; row <= stopPoint[0]; row++) {
    for (let col = startPoint[1]; col <= stopPoint[1]; col++) {
      switch (instructionType) {
        case 'turn on':
          grid[row]![col] += 1;
          break;

        case 'turn off':
          if (grid[row]![col]! > 0) grid[row]![col] -= 1;
          break;

        case 'toggle':
          grid[row]![col] += 2;
          break;
      }
    }
  }
}

export function getTotalBrightnessOfAllLights(instructionsText: string[]) {
  const grid1000x1000 = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
  );

  for (let instructionText of instructionsText) {
    const instruction = parseInstruction(instructionText);
    performBrightnessControlInstruction(grid1000x1000, instruction);
  }

  let totalBrightness = 0;

  for (let rows of grid1000x1000) {
    for (let cell of rows) {
      totalBrightness += cell;
    }
  }

  return totalBrightness;
}

console.log(
  'Day 6 -> Part 1 -> Answer(Number of lights lit):',
  getNumberOfLightsLit(instructionsText)
);

console.log(
  'Day 6 -> Part 2 -> Answer(Total brightness of all lights):',
  getTotalBrightnessOfAllLights(instructionsText)
);
