import fs from 'fs';

const allPresentDimensions = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split('\n');

export function getRequiredWrappingPaperForPresent(dimensions: string): number {
  const splitDimensions = dimensions.split('x') as [string, string, string];
  const length = parseInt(splitDimensions[0]);
  const width = parseInt(splitDimensions[1]);
  const height = parseInt(splitDimensions[2]);

  const lwArea = length * width;
  const whArea = width * height;
  const hlArea = height * length;

  const surfaceArea = 2 * lwArea + 2 * whArea + 2 * hlArea;
  const smallestSideArea = Math.min(lwArea, whArea, hlArea);

  return surfaceArea + smallestSideArea;
}

let totalWrappingPaperRequiredForAllPresents = 0;

for (let presentDimensions of allPresentDimensions) {
  totalWrappingPaperRequiredForAllPresents +=
    getRequiredWrappingPaperForPresent(presentDimensions);
}

console.log(
  'Day 2 -> Part 1 -> Answer(Total required square feet of wrapping paper):',
  totalWrappingPaperRequiredForAllPresents
);
