import { describe, test, expect } from '@jest/globals';
import { findRaceWinner } from './main';

describe('Day 14: Reindeer Olympics', () => {
  test('Comet would win if race ended at 1000 seconds, having covered 1120km distance', () => {
    expect(
      findRaceWinner(
        [
          'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.',
          'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.'
        ],
        1000
      )
    ).toEqual({ winner: 'Comet', distance: 1120 });
  });
});
