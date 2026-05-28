import { assertEquals } from '@std/assert';
import { findRacePointsWinner, findRaceWinner } from './solution.ts';

const reindeerRaceStatTexts = [
  'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.',
  'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.'
];

const raceDuration = 1000;

Deno.test('day 14 distance winner example', () => {
  assertEquals(findRaceWinner(reindeerRaceStatTexts, raceDuration), {
    winner: 'Comet',
    distance: 1120
  });
});

Deno.test('day 14 points winner example', () => {
  assertEquals(findRacePointsWinner(reindeerRaceStatTexts, raceDuration), {
    winner: 'Dancer',
    points: 689
  });
});
