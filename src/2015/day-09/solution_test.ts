import { assertEquals } from '@std/assert';
import { findLongestRouteDistance, findShortestRouteDistance } from './solution.ts';

const sampleRoutes = [
  'London to Dublin = 464',
  'London to Belfast = 518',
  'Dublin to Belfast = 141'
];

Deno.test('day 9 shortest route example', () => {
  assertEquals(findShortestRouteDistance(sampleRoutes), 605);
});

Deno.test('day 9 longest route example', () => {
  assertEquals(findLongestRouteDistance(sampleRoutes), 982);
});
