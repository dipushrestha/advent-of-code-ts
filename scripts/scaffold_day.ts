import TurndownService from 'npm:turndown';

type ScaffoldOptions = {
  year: number;
  day: number;
  refreshReadme: boolean;
};

function parseArgs(args: string[]): ScaffoldOptions {
  const positional: string[] = [];
  let refreshReadme = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg === '--refresh-readme') {
      refreshReadme = true;
      continue;
    }

    positional.push(arg);
  }

  const year = Number(positional[0]);
  const day = Number(positional[1]);

  if (!Number.isInteger(year) || !Number.isInteger(day)) {
    throw new Error(
      'Usage: deno task scaffold <year> <day> [--refresh-readme]'
    );
  }

  if (day < 1 || day > 25) {
    throw new Error('Day must be between 1 and 25.');
  }

  return { year, day, refreshReadme };
}

function dayDirName(day: number): string {
  return `day-${day.toString().padStart(2, '0')}`;
}

function getDayTitle(day: number): string {
  return `Day ${day}`;
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

async function maybeFetchPuzzleReadme(
  year: number,
  day: number
): Promise<string | null> {
  const session = Deno.env.get('AOC_SESSION');
  const puzzleUrl = `https://adventofcode.com/${year}/day/${day}`;
  const response = await fetch(puzzleUrl, {
    headers: {
      ...(session ? { Cookie: `session=${session}` } : {}),
      'User-Agent': 'github.com/dipushrestha/advent-of-code-ts by local script'
    }
  });

  if (!response.ok) {
    console.warn(
      `Unable to fetch puzzle page (${response.status}). Using README template instead.`
    );
    return null;
  }

  const html = await response.text();
  const articleMatches = [
    ...html.matchAll(/<article class="day-desc">([\s\S]*?)<\/article>/g)
  ];
  if (articleMatches.length === 0) return null;

  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-'
  });
  turndown.addRule('preserveLineBreaks', {
    filter: ['br'],
    replacement: () => '\n'
  });

  const sections = articleMatches
    .map((match) => turndown.turndown(match[0]).trim())
    .filter((section) => section.length > 0);
  if (sections.length === 0) return null;

  return `${sections.join('\n\n')}

---

From: [Day ${day} - Advent of Code ${year}](${puzzleUrl})
`;
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

async function writeFile(path: string, content: string): Promise<void> {
  await Deno.writeTextFile(path, content);
}

async function run(): Promise<void> {
  const { year, day, refreshReadme } = parseArgs(Deno.args);
  const dayFolder = dayDirName(day);
  const targetDir = `src/${year}/${dayFolder}`;
  const puzzleTitle = getDayTitle(day);

  await Deno.mkdir(targetDir, { recursive: true });

  await writeFileIfMissing(`${targetDir}/solution.ts`, solutionTemplate());
  await writeFileIfMissing(`${targetDir}/solution_test.ts`, testTemplate());
  const fetchedReadme = await maybeFetchPuzzleReadme(year, day);
  const readmePath = `${targetDir}/README.md`;
  const readmeContent = fetchedReadme ?? readmeTemplate(year, day, puzzleTitle);
  if (refreshReadme) {
    await writeFile(readmePath, readmeContent);
  } else {
    await writeFileIfMissing(readmePath, readmeContent);
  }

  const fetchedInput = await maybeFetchPuzzleInput(year, day);
  await writeFileIfMissing(`${targetDir}/input.txt`, fetchedInput ?? '');

  console.log(`Scaffolded ${targetDir}`);
  if (fetchedInput === null) {
    console.log('Created empty input.txt (set AOC_SESSION to auto-fetch input).');
  } else {
    console.log('Fetched puzzle input into input.txt.');
  }
  if (refreshReadme) {
    console.log('Refreshed README.md.');
  }
}

await run();
