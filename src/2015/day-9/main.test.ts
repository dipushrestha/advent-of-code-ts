import { describe, expect, test } from '@jest/globals';
import { findLongestRouteDistance, findShortestRouteDistance } from './main';

describe(`
Day 9: All in a Single Night

Given the following distances: 
  London to Dublin = 464
  London to Belfast = 518 
  Dublin to Belfast = 141
`, () => {
  test('shortest of these is London -> Dublin -> Belfast = 605', () => {
    expect(
      findShortestRouteDistance([
        'London to Dublin = 464',
        'London to Belfast = 518',
        'Dublin to Belfast = 141'
      ])
    ).toBe(605);
  });

  test('longest of these is Dublin -> London -> Belfast = 982', () => {
    expect(
      findLongestRouteDistance([
        'London to Dublin = 464',
        'London to Belfast = 518',
        'Dublin to Belfast = 141'
      ])
    ).toBe(982);
  });
});
