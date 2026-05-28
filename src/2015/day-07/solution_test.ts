import { assertEquals } from '@std/assert';
import { getWireSignalOfCircuit } from './solution.ts';

Deno.test('day 7 examples', () => {
  assertEquals(getWireSignalOfCircuit(['123 -> x'], 'x'), 123);
  assertEquals(
    getWireSignalOfCircuit(['123 -> x', '456 -> y', 'x AND y -> z'], 'z'),
    72
  );
  assertEquals(getWireSignalOfCircuit(['1 -> p', 'p LSHIFT 2 -> q'], 'q'), 4);
  assertEquals(getWireSignalOfCircuit(['1 -> p', 'p RSHIFT 2 -> q'], 'q'), 0);
  assertEquals(getWireSignalOfCircuit(['123 -> x', 'NOT x -> h'], 'h'), 65412);
});

Deno.test('day 7 simple circuit', () => {
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

  assertEquals(getWireSignalOfCircuit(circuits, 'd'), 72);
  assertEquals(getWireSignalOfCircuit(circuits, 'e'), 507);
  assertEquals(getWireSignalOfCircuit(circuits, 'f'), 492);
  assertEquals(getWireSignalOfCircuit(circuits, 'g'), 114);
  assertEquals(getWireSignalOfCircuit(circuits, 'h'), 65412);
  assertEquals(getWireSignalOfCircuit(circuits, 'i'), 65079);
  assertEquals(getWireSignalOfCircuit(circuits, 'x'), 123);
  assertEquals(getWireSignalOfCircuit(circuits, 'y'), 456);
});

Deno.test('day 7 invalid circuit inputs', () => {
  assertEquals(getWireSignalOfCircuit(['NOT 1 -> x'], 'x'), 65534);
  assertEquals(getWireSignalOfCircuit([''], 'x'), undefined);
  assertEquals(getWireSignalOfCircuit([' -> x'], 'x'), undefined);
  assertEquals(getWireSignalOfCircuit(['NOT x -> y'], 'y'), undefined);
  assertEquals(getWireSignalOfCircuit(['x AND y -> z'], 'z'), undefined);
});
