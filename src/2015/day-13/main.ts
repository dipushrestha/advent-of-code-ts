import { readFileSync } from 'fs';

type GuestNeighborHappinessMap = Record<string, Record<string, number>>;

const guestsHappinessTexts = readFileSync(
  `${__dirname}/input.txt`,
  'utf-8'
).split('\n');

function parseGuestsHappinessMapTexts(
  guestsHappinessTexts: string[]
): GuestNeighborHappinessMap {
  const guestNeighborHappinessMap: GuestNeighborHappinessMap = {};

  for (const guestHappinessText of guestsHappinessTexts) {
    const guestHappinessWords = guestHappinessText.split(' ');
    const guest = guestHappinessWords[0]!;
    const sign = guestHappinessWords[2] === 'gain' ? 1 : -1;
    const happiness = Number(guestHappinessWords[3]!) * sign;
    const neighbor = guestHappinessWords.at(-1)!.replace('.', '');

    guestNeighborHappinessMap[guest] = {
      ...(guestNeighborHappinessMap[guest] || {}),
      [neighbor]: happiness
    };
  }

  return guestNeighborHappinessMap;
}

function possibleSeatingArrangements(guests: string[]): string[][] {
  const permute = (arr: string[]) => {
    if (arr.length === 2) {
      const [first, second] = arr as [string, string];
      return [
        [first, second],
        [second, first]
      ];
    }

    const permutations: string[][] = [];

    for (const item of arr) {
      const remainingItems = arr.filter((i) => i !== item);

      for (const permutation of permute(remainingItems)) {
        permutation.unshift(item);
        permutations.push(permutation);
      }
    }

    return permutations;
  };

  const [firstGuest, ...remainingGuests] = guests;
  return permute(remainingGuests).map((p) => [firstGuest!, ...p]);
}

export function optimalTotalChangeInHappiness(guestsHappinessTexts: string[]) {
  const guestNeighborHappinessMap =
    parseGuestsHappinessMapTexts(guestsHappinessTexts);

  const seatingArrangements = possibleSeatingArrangements(
    Object.keys(guestNeighborHappinessMap)
  );

  let maxTotalChangeInHappiness: number | null = null;

  for (const seatingArrangement of seatingArrangements) {
    const totalChangeInHappiness = seatingArrangement.reduce(
      (acc, guest, i) => {
        const prevNeighbor =
          seatingArrangement[i - 1] ?? seatingArrangement.at(-1)!;

        const nextNeighbor =
          seatingArrangement[i + 1] ?? seatingArrangement[0]!;

        const happiness =
          guestNeighborHappinessMap[guest]![nextNeighbor]! +
          guestNeighborHappinessMap[guest]![prevNeighbor]!;

        return acc + happiness;
      },
      0
    );
    if (
      maxTotalChangeInHappiness === null ||
      totalChangeInHappiness > maxTotalChangeInHappiness
    ) {
      maxTotalChangeInHappiness = totalChangeInHappiness;
    }
  }
  return maxTotalChangeInHappiness;
}

console.log(
  'Day 13 -> Part 1 -> Answer(Optimal total change in happiness):',
  optimalTotalChangeInHappiness(guestsHappinessTexts)
);

console.log(
  'Day 13 -> Part 2 -> Answer(Optimal total change in happiness):',
  optimalTotalChangeInHappiness(
    guestsHappinessTexts.concat([
      'Me would gain 0 happiness units by sitting next to Alice.',
      'Me would gain 0 happiness units by sitting next to Bob.',
      'Me would gain 0 happiness units by sitting next to Carol.',
      'Me would gain 0 happiness units by sitting next to David.',
      'Me would gain 0 happiness units by sitting next to Eric.',
      'Me would gain 0 happiness units by sitting next to Frank.',
      'Me would gain 0 happiness units by sitting next to George.',
      'Me would gain 0 happiness units by sitting next to Mallory.',
      'Alice would gain 0 happiness units by sitting next to Me.',
      'Bob would gain 0 happiness units by sitting next to Me.',
      'Carol would gain 0 happiness units by sitting next to Me.',
      'David would gain 0 happiness units by sitting next to Me.',
      'Eric would gain 0 happiness units by sitting next to Me.',
      'Frank would gain 0 happiness units by sitting next to Me.',
      'George would gain 0 happiness units by sitting next to Me.',
      'Mallory would gain 0 happiness units by sitting next to Me.'
    ])
  )
);
