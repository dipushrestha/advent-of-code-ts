import input from './input.json';

function traverseJSON({
  json,
  callback,
  excludePropertyHaving
}: {
  json: unknown;
  callback: (value: unknown) => void;
  excludePropertyHaving?: string;
}) {
  if (json !== null && typeof json === 'object') {
    if (
      excludePropertyHaving &&
      !Array.isArray(json) &&
      Object.values(json).includes(excludePropertyHaving)
    ) {
      return;
    }

    Object.values(json).forEach((value) =>
      traverseJSON({ json: value, callback, excludePropertyHaving })
    );
  } else {
    callback(json);
  }
}

export function calculateSumOfAllNumbersInJSON(json: unknown): number {
  let sum = 0;
  traverseJSON({
    json,
    callback: (value) => {
      if (typeof value !== 'number') return;
      sum += value;
    }
  });
  return sum;
}

export function calculateSumOfAllNumbersExceptRedInJSON(json: unknown): number {
  let sum = 0;
  traverseJSON({
    json,
    callback: (value) => {
      if (typeof value !== 'number') return;
      sum += value;
    },
    excludePropertyHaving: 'red'
  });
  return sum;
}

console.log(
  'Day 12 -> Part 1 -> Answer(Sum of all number values in json):',
  calculateSumOfAllNumbersInJSON(input)
);

console.log(
  'Day 12 -> Part 2 -> Answer(Sum of all number values in json except red props):',
  calculateSumOfAllNumbersExceptRedInJSON(input)
);
