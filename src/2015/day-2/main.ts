import fs from 'fs';

const allPresentDimensions = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split('\n');

function getDimensionsAsNumbers(
  dimensions: string
): [length: number, width: number, height: number] {
  const splitDimensions = dimensions.split('x') as [string, string, string];
  const length = parseInt(splitDimensions[0]);
  const width = parseInt(splitDimensions[1]);
  const height = parseInt(splitDimensions[2]);

  return [length, width, height];
}

export function getRequiredWrappingPaperForPresent(dimensions: string): number {
  const [length, width, height] = getDimensionsAsNumbers(dimensions);

  const lwArea = length * width;
  const whArea = width * height;
  const hlArea = height * length;

  const surfaceArea = 2 * lwArea + 2 * whArea + 2 * hlArea;
  const smallestSideArea = Math.min(lwArea, whArea, hlArea);

  return surfaceArea + smallestSideArea;
}

export function getRequiredRibbonForPresent(dimensions: string): number {
  const [length, width, height] = getDimensionsAsNumbers(dimensions);

  const lwPerimeter = 2 * (length + width);
  const whPerimeter = 2 * (width + height);
  const hlPerimeter = 2 * (height + length);

  const wrapRibbonLength = Math.min(lwPerimeter, whPerimeter, hlPerimeter);
  const bowRibbonLength = length * width * height;

  return wrapRibbonLength + bowRibbonLength;
}

let totalWrappingPaperRequiredForAllPresents = 0;
let totalRibbonRequiredForAllPresents = 0;

for (let presentDimensions of allPresentDimensions) {
  totalWrappingPaperRequiredForAllPresents +=
    getRequiredWrappingPaperForPresent(presentDimensions);

  totalRibbonRequiredForAllPresents +=
    getRequiredRibbonForPresent(presentDimensions);
}

console.log(
  'Day 2 -> Part 1 -> Answer(Total required square feet of wrapping paper):',
  totalWrappingPaperRequiredForAllPresents
);

console.log(
  'Day 2 -> Part 2 -> Answer(Total required feet of ribbon):',
  totalRibbonRequiredForAllPresents
);
