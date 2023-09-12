import { describe, expect, test } from '@jest/globals';
import { findShortestRouteDistance } from './main';

describe('Day 9: All in a Single Night', () => {
  test('Given the following distances: London to Dublin = 464, London to Belfast = 518, Dublin to Belfast = 141, shortest of these is London -> Dublin -> Belfast = 605', () => {
    expect(
      findShortestRouteDistance([
        'London to Dublin = 464',
        'London to Belfast = 518',
        'Dublin to Belfast = 141'
      ])
    ).toBe(605);
  });
});
