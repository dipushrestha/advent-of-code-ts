import { readFileSync } from 'fs';

const circuits = readFileSync(`${__dirname}/input.txt`, 'utf-8').split('\n');

export function getWireSignalOfCircuit(
  circuits: string[],
  wire: string,
  memoizedWireSignals = <Record<string, number>>{}
): number | undefined {
  if (memoizedWireSignals[wire] !== undefined) return memoizedWireSignals[wire];

  const circuit = circuits.find((circuit) => circuit.split(' -> ')[1] === wire);
  if (!circuit) return;

  const [expression, outputWire] = circuit.split(' -> ');
  if (!expression || !outputWire) return;

  const exprSplit = expression.split(' ');

  if (exprSplit.length === 1) {
    const operand = exprSplit[0]!;
    const intOperand = parseInt(operand);

    if (Number.isInteger(intOperand)) {
      memoizedWireSignals[wire] = intOperand;
      return memoizedWireSignals[wire];
    }

    return getWireSignalOfCircuit(circuits, operand, memoizedWireSignals);
  }

  if (exprSplit.length === 2) {
    const MAX_16_BIT_U_INT = 65535;
    const operand = exprSplit[1]!;
    const intOperand = parseInt(operand);

    const operandValue = Number.isInteger(intOperand)
      ? intOperand
      : getWireSignalOfCircuit(circuits, operand, memoizedWireSignals);
    if (operandValue === undefined) return;

    // calculate BITWISE NOT
    memoizedWireSignals[wire] = ~operandValue + MAX_16_BIT_U_INT + 1;
    return memoizedWireSignals[wire];
  }

  if (exprSplit.length === 3) {
    const operand1 = exprSplit[0]!;
    const operator = exprSplit[1]!;
    const operand2 = exprSplit[2]!;

    const intOperand1 = parseInt(operand1);
    const intOperand2 = parseInt(operand2);

    const operand1Value = Number.isInteger(intOperand1)
      ? intOperand1
      : getWireSignalOfCircuit(circuits, operand1, memoizedWireSignals);

    const operand2Value = Number.isInteger(intOperand2)
      ? intOperand2
      : getWireSignalOfCircuit(circuits, operand2, memoizedWireSignals);

    if (operand1Value === undefined || operand2Value === undefined) return;

    let result;

    switch (operator) {
      case 'OR':
        result = operand1Value | operand2Value;
        break;

      case 'AND':
        result = operand1Value & operand2Value;
        break;

      case 'LSHIFT':
        result = operand1Value << operand2Value;
        break;

      case 'RSHIFT':
        result = operand1Value >> operand2Value;
        break;
    }

    if (result !== undefined) {
      memoizedWireSignals[wire] = result;
      return memoizedWireSignals[wire];
    }
  }
}

const aWireSignal = getWireSignalOfCircuit(circuits, 'a');

const newCircuits = circuits.map((circuit) =>
  circuit.split(' -> ')[1] === 'b' ? `${aWireSignal} -> b` : circuit
);

const aWireNewSignal = getWireSignalOfCircuit(newCircuits, 'a');

console.log(
  'Day 7 -> Part 1 -> Answer(Final signal provided to wire "a"):',
  aWireSignal
);

console.log(
  'Day 7 -> Part 2 -> Answer(New final signal provided to wire "a"):',
  aWireNewSignal
);
