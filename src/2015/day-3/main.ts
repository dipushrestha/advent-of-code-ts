import directions from './input.json';

type Location = [x: number, y: number];

enum Direction {
  North = '^',
  South = 'v',
  East = '>',
  West = '<'
}

export function getNumberOfHousesReceivingPresent(directions: string): number {
  const currentLocation: Location = [0, 0];
  const housesTraversed = new Map([[JSON.stringify(currentLocation), 1]]);

  for (let direction of directions) {
    switch (direction) {
      case Direction.North:
        currentLocation[1] += 1;
        break;

      case Direction.South:
        currentLocation[1] -= 1;
        break;

      case Direction.East:
        currentLocation[0] += 1;
        break;

      case Direction.West:
        currentLocation[0] -= 1;
    }

    const currentHouseKey = JSON.stringify(currentLocation);
    const currentHouseDeliveryCount = housesTraversed.get(currentHouseKey);

    housesTraversed.set(
      currentHouseKey,
      currentHouseDeliveryCount ? currentHouseDeliveryCount + 1 : 1
    );
  }

  return housesTraversed.size;
}

console.log(
  'Day 3 -> Part 1 -> Answer(Houses receiving at least one present):',
  getNumberOfHousesReceivingPresent(directions)
);
