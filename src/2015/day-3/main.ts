import directions from './input.json';

type Location = [x: number, y: number];

enum Direction {
  North = '^',
  South = 'v',
  East = '>',
  West = '<'
}

function moveLocation(location: Location, direction: Direction): void {
  switch (direction) {
    case Direction.North:
      location[1] += 1;
      break;

    case Direction.South:
      location[1] -= 1;
      break;

    case Direction.East:
      location[0] += 1;
      break;

    case Direction.West:
      location[0] -= 1;
  }
}

export function getNumberOfHousesReceivingPresentFromSanta(
  directions: string
): number {
  const santaLocation: Location = [0, 0];
  const housesTraversed = new Map([[JSON.stringify(santaLocation), 1]]);

  for (let direction of directions) {
    moveLocation(santaLocation, direction as Direction);

    const currentHouseKey = JSON.stringify(santaLocation);
    const currentHouseDeliveryCount = housesTraversed.get(currentHouseKey);

    housesTraversed.set(
      currentHouseKey,
      currentHouseDeliveryCount ? currentHouseDeliveryCount + 1 : 1
    );
  }

  return housesTraversed.size;
}

export function getNumberOfHousesReceivingPresentFromSantaAndRoboSanta(
  directions: string
): number {
  const santaLocation: Location = [0, 0];
  const roboSantaLocation: Location = [0, 0];
  const housesTraversed = new Map([[JSON.stringify(santaLocation), 1]]);

  for (let i = 0; i < directions.length; i++) {
    let currentHouseKey = '';

    if (i % 2 !== 0) {
      moveLocation(santaLocation, directions[i] as Direction);
      currentHouseKey = JSON.stringify(santaLocation);
    } else {
      moveLocation(roboSantaLocation, directions[i] as Direction);
      currentHouseKey = JSON.stringify(roboSantaLocation);
    }

    const currentHouseDeliveryCount = housesTraversed.get(currentHouseKey);

    housesTraversed.set(
      currentHouseKey,
      currentHouseDeliveryCount ? currentHouseDeliveryCount + 1 : 1
    );
  }

  return housesTraversed.size;
}

console.log(
  'Day 3 -> Part 1 -> Answer(Houses receiving at least one present from Santa):',
  getNumberOfHousesReceivingPresentFromSanta(directions)
);

console.log(
  'Day 3 -> Part 2 -> Answer(Houses receiving at least one present from Santa and Robo-Santa):',
  getNumberOfHousesReceivingPresentFromSantaAndRoboSanta(directions)
);
