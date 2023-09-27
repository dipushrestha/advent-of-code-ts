import { describe, test, expect } from '@jest/globals';
import { findRacePointsWinner, findRaceWinner } from './main';

describe('Day 14: Reindeer Olympics', () => {
  const reindeerRaceStatTexts = [
    'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.',
    'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.'
  ];

  const raceDuration = 1000;

  test('Comet would win if race ended at 1000 seconds, having covered 1120km distance', () => {
    expect(findRaceWinner(reindeerRaceStatTexts, raceDuration)).toEqual({
      winner: 'Comet',
      distance: 1120
    });
  });

  test('Dancer would win if race ended at 1000 seconds, having 689 points', () => {
    expect(findRacePointsWinner(reindeerRaceStatTexts, raceDuration)).toEqual({
      winner: 'Dancer',
      points: 689
    });
  });
});
