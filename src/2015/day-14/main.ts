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

export function findRacePointsWinner(
  reindeerRaceStatTexts: string[],
  raceDuration: number
): {
  winner: string;
  points: number;
} {
  const raceStats = parseReindeerRaceStatText(reindeerRaceStatTexts);
  const winner = { winner: '', points: 0 };
  const leaderBoard: Record<string, { points: number; distance: number }> = {};

  for (let currentSecond = 1; currentSecond <= raceDuration; currentSecond++) {
    let leadingDistance = 0;

    for (const { name, speed, moveDuration, restDuration } of raceStats) {
      const cycleDuration = moveDuration + restDuration;
      const cycleSecond = currentSecond % cycleDuration;
      const isMoving = cycleSecond !== 0 && cycleSecond <= moveDuration;

      leaderBoard[name] = {
        points: leaderBoard[name]?.points || 0,
        distance: (leaderBoard[name]?.distance || 0) + (isMoving ? speed : 0)
      };

      if (leaderBoard[name]!.distance > leadingDistance) {
        leadingDistance = leaderBoard[name]!.distance;
      }
    }

    for (const key of Object.keys(leaderBoard)) {
      if (leaderBoard[key]!.distance !== leadingDistance) continue;
      leaderBoard[key]!.points++;
    }
  }

  for (const key of Object.keys(leaderBoard)) {
    if (leaderBoard[key]!.points > winner.points) {
      winner.winner = key;
      winner.points = leaderBoard[key]!.points;
    }
  }

  return winner;
}

console.log(
  'Day 14 -> Part 1 -> Answer(Total distance traveled by the winner):',
  findRaceWinner(reindeerRaceStatTexts, 2503).distance
);

console.log(
  'Day 14 -> Part 2 -> Answer(Total points of the winner):',
  findRacePointsWinner(reindeerRaceStatTexts, 2503).points
);
