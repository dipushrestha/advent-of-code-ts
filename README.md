## [Advent of Code](https://adventofcode.com)

TypeScript Advent of Code solutions running on Deno.

## Prerequisites

- Deno 2+

## Commands

- Run tests: `deno task test`
- Run tests in watch mode: `deno task test:watch`
- Type check: `deno task check`
- Scaffold a new day: `deno task scaffold <year> <day> [--title "Puzzle title"]`

## Day Structure

Each day lives under `src/<year>/day-XX` and contains:

- `solution.ts`
- `solution_test.ts`
- `input.txt`
- `README.md`

## Optional Input Auto-Fetch

If `AOC_SESSION` is set in your environment, the scaffold command will try to
download your personal puzzle input from Advent of Code and write it to
`input.txt`. If the variable is missing (or fetch fails), it safely creates an
empty `input.txt`.
