import input from './input.json';

function traverseJSON(json: unknown, callback: (value: unknown) => void) {
  if (json !== null && typeof json === 'object') {
    Object.values(json).forEach((value) => traverseJSON(value, callback));
  } else {
    callback(json);
  }
}

export function calculateSumOfAllNumbersInJSON(json: unknown): number {
  let sum = 0;
  traverseJSON(json, (value) => {
    if (typeof value !== 'number') return;
    sum += value;
  });
  return sum;
}

console.log(
  'Day 12 -> Part 1 -> Answer(Sum of all number values in json):',
  calculateSumOfAllNumbersInJSON(input)
);
