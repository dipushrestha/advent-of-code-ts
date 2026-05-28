type ScaffoldOptions = {
  year: number;
  day: number;
  title?: string;
};

function parseArgs(args: string[]): ScaffoldOptions {
  const positional: string[] = [];
  let title: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg === '--title' || arg === '-t') {
      title = args[i + 1];
      i++;
      continue;
    }

    positional.push(arg);
  }

  const year = Number(positional[0]);
  const day = Number(positional[1]);

  if (!Number.isInteger(year) || !Number.isInteger(day)) {
    throw new Error(
      'Usage: deno task scaffold <year> <day> [--title "Day title"]'
    );
  }

  if (day < 1 || day > 25) {
    throw new Error('Day must be between 1 and 25.');
  }

  return { year, day, title };
}

function dayDirName(day: number): string {
  return `day-${day.toString().padStart(2, '0')}`;
}

function getDayTitle(day: number, title?: string): string {
  return title?.trim() || `Day ${day}`;
}

async function maybeFetchPuzzleInput(
  year: number,
  day: number
): Promise<string | null> {
  const session = Deno.env.get('AOC_SESSION');
  if (!session) return null;

  const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await fetch(inputUrl, {
    headers: {
      Cookie: `session=${session}`,
      'User-Agent': 'github.com/dipushrestha/advent-of-code-ts by local script'
    }
  });

  if (!response.ok) {
    console.warn(
      `Unable to fetch input (${response.status}). Creating empty input.txt instead.`
    );
    return null;
  }

  return await response.text();
}

function solutionTemplate(): string {
  return `import { readFileSync } from 'node:fs';

const inputText = readFileSync(new URL('./input.txt', import.meta.url), 'utf-8').trim();

export function solvePart1(input: string): number {
  return input.length;
}

export function solvePart2(input: string): number {
  return input.length;
}

console.log('Part 1:', solvePart1(inputText));
console.log('Part 2:', solvePart2(inputText));
`;
}

function testTemplate(): string {
  return `import { assertEquals } from '@std/assert';
import { solvePart1, solvePart2 } from './solution.ts';

const exampleInput = \`\`;

Deno.test('part 1 example', () => {
  assertEquals(solvePart1(exampleInput), 0);
});

Deno.test('part 2 example', () => {
  assertEquals(solvePart2(exampleInput), 0);
});
`;
}

function readmeTemplate(year: number, day: number, title: string): string {
  return `# ${title}

- Puzzle: https://adventofcode.com/${year}/day/${day}
- Run tests: \`deno test --allow-read src/${year}/${dayDirName(day)}\`

## Notes

- Add the problem description and approach notes here.
`;
}

async function writeFileIfMissing(path: string, content: string): Promise<void> {
  try {
    await Deno.stat(path);
  } catch {
    await Deno.writeTextFile(path, content);
  }
}

async function run(): Promise<void> {
  const { year, day, title } = parseArgs(Deno.args);
  const dayFolder = dayDirName(day);
  const targetDir = `src/${year}/${dayFolder}`;
  const puzzleTitle = getDayTitle(day, title);

  await Deno.mkdir(targetDir, { recursive: true });

  await writeFileIfMissing(`${targetDir}/solution.ts`, solutionTemplate());
  await writeFileIfMissing(`${targetDir}/solution_test.ts`, testTemplate());
  await writeFileIfMissing(
    `${targetDir}/README.md`,
    readmeTemplate(year, day, puzzleTitle)
  );

  const fetchedInput = await maybeFetchPuzzleInput(year, day);
  await writeFileIfMissing(`${targetDir}/input.txt`, fetchedInput ?? '');

  console.log(`Scaffolded ${targetDir}`);
  if (fetchedInput === null) {
    console.log('Created empty input.txt (set AOC_SESSION to auto-fetch input).');
  } else {
    console.log('Fetched puzzle input into input.txt.');
  }
}

await run();
