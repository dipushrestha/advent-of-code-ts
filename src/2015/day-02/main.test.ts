import { describe, test, expect } from '@jest/globals';
import {
  getRequiredRibbonForPresent,
  getRequiredWrappingPaperForPresent
} from './main';

describe('Day 2: I Was Told There Would Be No Math', () => {
  test('A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet of wrapping paper plus 6 square feet of slack, for a total of 58 square feet', () => {
    expect(getRequiredWrappingPaperForPresent('2x3x4')).toBe(58);
  });

  test('A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet of wrapping paper plus 1 square foot of slack, for a total of 43 square feet', () => {
    expect(getRequiredWrappingPaperForPresent('1x1x10')).toBe(43);
  });

  test('A present with dimensions 2x3x4 requires 2+2+3+3 = 10 feet of ribbon to wrap the present plus 2*3*4 = 24 feet of ribbon for the bow, for a total of 34 feet', () => {
    expect(getRequiredRibbonForPresent('2x3x4')).toBe(34);
  });

  test('A present with dimensions 1x1x10 requires 1+1+1+1 = 4 feet of ribbon to wrap the present plus 1*1*10 = 10 feet of ribbon for the bow, for a total of 14 feet', () => {
    expect(getRequiredRibbonForPresent('1x1x10'));
  });
});
