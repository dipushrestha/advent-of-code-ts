import { describe, expect, test } from '@jest/globals';
import { getWireSignalOfCircuit } from './main';

describe('Day 7: Some Assembly Required', () => {
  test('123 -> x means that the signal 123 is provided to wire x', () => {
    expect(getWireSignalOfCircuit(['123 -> x'], 'x')).toBe(123);
  });

  test('x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z', () => {
    expect(
      getWireSignalOfCircuit(['123 -> x', '456 -> y', 'x AND y -> z'], 'z')
    ).toBe(72);
  });

  test('p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q', () => {
    expect(getWireSignalOfCircuit(['1 -> p', 'p LSHIFT 2 -> q'], 'q')).toBe(4);
  });

  test('p RSHIFT 2 -> q means that the value from wire p is right-shifted by 2 and then provided to wire q', () => {
    expect(getWireSignalOfCircuit(['1 -> p', 'p RSHIFT 2 -> q'], 'q')).toBe(0);
  });

  test('NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f', () => {
    expect(getWireSignalOfCircuit(['123 -> x', 'NOT x -> h'], 'h')).toBe(65412);
  });

  test('simple circuit', () => {
    const circuits = [
      '123 -> x',
      '456 -> y',
      'x AND y -> d',
      'x OR y -> e',
      'x LSHIFT 2 -> f',
      'y RSHIFT 2 -> g',
      'NOT x -> h',
      'NOT y -> i'
    ];

    expect(getWireSignalOfCircuit(circuits, 'd')).toBe(72);
    expect(getWireSignalOfCircuit(circuits, 'e')).toBe(507);
    expect(getWireSignalOfCircuit(circuits, 'f')).toBe(492);
    expect(getWireSignalOfCircuit(circuits, 'g')).toBe(114);
    expect(getWireSignalOfCircuit(circuits, 'h')).toBe(65412);
    expect(getWireSignalOfCircuit(circuits, 'i')).toBe(65079);
    expect(getWireSignalOfCircuit(circuits, 'x')).toBe(123);
    expect(getWireSignalOfCircuit(circuits, 'y')).toBe(456);
  });

  test('NOT 1 -> x means that bitwise complement of the value of 1 is provided to wire x', () => {
    expect(getWireSignalOfCircuit(['NOT 1 -> x'], 'x')).toBe(65534);
  });

  test('invalid circuit', () => {
    expect(getWireSignalOfCircuit([''], 'x')).toBe(undefined);
    expect(getWireSignalOfCircuit([' -> x'], 'x')).toBe(undefined);
    expect(getWireSignalOfCircuit(['NOT x -> y'], 'y')).toBe(undefined);
    expect(getWireSignalOfCircuit(['x AND y -> z'], 'z')).toBe(undefined);
  });
});
