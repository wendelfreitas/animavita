// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/app/*.ts', '<rootDir>/src/modules/**/presentation/controllers/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',
  testEnvironment: '<rootDir>src/shared/tests/environment.ts',
  testMatch: ['**/*.spec.ts'],
};
