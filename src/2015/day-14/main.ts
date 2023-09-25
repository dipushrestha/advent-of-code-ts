import { readFileSync } from 'fs';

type RaceStat = {
  name: string;
  speed: number;
  moveDuration: number;
  restDuration: number;
};

const reindeerRaceStatTexts = readFileSync(
  `${__dirname}/input.txt`,
  'utf-8'
).split('\n');

function parseReindeerRaceStatText(
  reindeerRaceStatTexts: string[]
): RaceStat[] {
  const raceStats: RaceStat[] = [];
  for (const reindeerRaceStatText of reindeerRaceStatTexts) {
    const statSplits = reindeerRaceStatText.split(' ');
    raceStats.push({
      name: statSplits[0]!,
      speed: Number(statSplits[3]),
      moveDuration: Number(statSplits[6]),
      restDuration: Number(statSplits[13])
    });
  }

  return raceStats;
}

export function findRaceWinner(
  reindeerRaceStatTexts: string[],
  raceDuration: number
): {
  winner: string;
  distance: number;
} {
  const raceStats = parseReindeerRaceStatText(reindeerRaceStatTexts);

  const winnerStat = {
    winner: '',
    distance: 0
  };

  for (const { name, speed, moveDuration, restDuration } of raceStats) {
    const cycleDuration = moveDuration + restDuration;
    const cycleDistance = speed * moveDuration;
    const fullCycleCount = Math.floor(raceDuration / cycleDuration);
    const remainingDuration = raceDuration % cycleDuration;

    const remainingDistance =
      remainingDuration > moveDuration
        ? cycleDistance
        : speed * remainingDuration;

    const distance = fullCycleCount * cycleDistance + remainingDistance;

    if (distance > winnerStat.distance) {
      winnerStat.winner = name;
      winnerStat.distance = distance;
    }
  }

  return winnerStat;
}

console.log(
  'Day 14 -> Part 1 -> Answer(Total distance traveled by winner):',
  findRaceWinner(reindeerRaceStatTexts, 2503).distance
);
