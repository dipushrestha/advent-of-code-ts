import { readFileSync } from 'fs';

type RouteDistance = {
  route: Set<string>;
  distance: number;
};

const routeDistanceTexts = readFileSync(
  `${__dirname}/input.txt`,
  'utf-8'
).split('\n');

function parseRouteDistanceText(routeDistanceTexts: string[]): {
  places: Set<string>;
  routesDistances: RouteDistance[];
} {
  const places = new Set<string>();
  const routesDistances: RouteDistance[] = [];

  for (const routeDistanceText of routeDistanceTexts) {
    const [route, distanceText] = routeDistanceText.split(' = ') as [
      string,
      string
    ];
    const distance = parseInt(distanceText);
    const [source, destination] = route.split(' to ') as [string, string];

    routesDistances.push({
      route: new Set([source, destination]),
      distance
    });

    places.add(source);
    places.add(destination);
  }

  return { places, routesDistances };
}

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

function* findRoutesDistances(
  routes: string[][],
  routesDistances: RouteDistance[]
): Generator<number> {
  for (const route of routes) {
    let combinedRoutesDistance = 0;
    let prevPlace = '';

    for (const place of route) {
      const routeDistance = routesDistances.find(
        (r) => r.route.has(prevPlace) && r.route.has(place)
      );
      combinedRoutesDistance += routeDistance?.distance ?? 0;
      prevPlace = place;
    }

    yield combinedRoutesDistance;
  }
}

export function findShortestRouteDistance(
  routeDistanceTexts: string[]
): number {
  const { places, routesDistances } =
    parseRouteDistanceText(routeDistanceTexts);

  const routes = [...possibleRoutes(places)];

  return Math.min(...findRoutesDistances(routes, routesDistances));
}

export function findLongestRouteDistance(routeDistanceTexts: string[]): number {
  const { places, routesDistances } =
    parseRouteDistanceText(routeDistanceTexts);

  const routes = [...possibleRoutes(places)];

  return Math.max(...findRoutesDistances(routes, routesDistances));
}

console.log(
  'Day 9 -> Part 1 -> Answer(Distance of shortest route):',
  findShortestRouteDistance(routeDistanceTexts)
);

console.log(
  'Day 9 -> Part 1 -> Answer(Distance of longest route):',
  findLongestRouteDistance(routeDistanceTexts)
);
