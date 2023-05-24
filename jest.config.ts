import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfigWithTsJest: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node'
};

module.exports = jestConfigWithTsJest;
