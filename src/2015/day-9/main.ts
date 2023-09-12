import { readFileSync } from 'fs';

type RouteDistance = {
  route: Set<string>;
  distance: number;
};

const routeDistanceTexts = readFileSync(
  `${__dirname}/input.txt`,
  'utf-8'
).split('\n');

function* possibleRoutes(places: Set<string>): Generator<string[]> {
  if (places.size === 2) {
    const [first, second] = [...places] as [string, string];
    yield [first, second];
    yield [second, first];
  }

  for (const place of places) {
    const remainingPlaces = new Set(places);
    remainingPlaces.delete(place);

    for (const route of possibleRoutes(remainingPlaces)) {
      route.unshift(place);
      yield route;
    }
  }
}

function parseRouteDistanceText(routeDistanceTexts: string[]): {
  places: Set<string>;
  routesDistance: RouteDistance[];
} {
  const places = new Set<string>();
  const routesDistance: RouteDistance[] = [];

  for (const routeDistanceText of routeDistanceTexts) {
    const [route, distanceText] = routeDistanceText.split(' = ') as [
      string,
      string
    ];
    const distance = parseInt(distanceText);
    const [source, destination] = route.split(' to ') as [string, string];

    routesDistance.push({
      route: new Set([source, destination]),
      distance
    });

    places.add(source);
    places.add(destination);
  }

  return { places, routesDistance };
}

export function findShortestRouteDistance(
  routeDistanceTexts: string[]
): number {
  const { places, routesDistance } = parseRouteDistanceText(routeDistanceTexts);
  let shortestRouteDistance = 0;

  for (const route of possibleRoutes(places)) {
    let currentRouteDistance = 0;
    let prevPlace = '';

    for (const place of route) {
      const routeDistance = routesDistance.find(
        (r) => r.route.has(prevPlace) && r.route.has(place)
      );
      currentRouteDistance += routeDistance?.distance ?? 0;
      prevPlace = place;
    }

    if (
      shortestRouteDistance === 0 ||
      currentRouteDistance < shortestRouteDistance
    ) {
      shortestRouteDistance = currentRouteDistance;
    }
  }

  return shortestRouteDistance;
}

console.log(
  'Day 9 -> Part 1 -> Answer(Distance of shortest route):',
  findShortestRouteDistance(routeDistanceTexts)
);
