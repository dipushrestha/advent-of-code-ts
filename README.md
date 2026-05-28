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

The scaffold task auto-loads `.env.local` when the file exists. If
`AOC_SESSION` is available (from `.env.local` or your shell environment), it
tries to download your personal puzzle input from Advent of Code and writes it
to `input.txt`. If the variable is missing (or fetch fails), it safely creates
an empty `input.txt`.
