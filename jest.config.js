module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: [
    '.d.ts$',
    '.test.ts',
    'src/index.ts',
    'src/util/config',
    'util/database/index.ts',
    'util/server/index.ts',
  ],
  collectCoverageFrom : ['src/**/*.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  setupTestFrameworkScriptFile: "./src/util/testing/jestSetup.ts",
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json',
    }
  },
  moduleNameMapper: {
    '@config': '<rootDir>/src/util/config',
    '@database/(.*)': '<rootDir>/src/util/database/$1',
    // '@app': '<rootDir>/src/app.ts',
    // '@resources/(.*)': '<rootDir>/src/resources/$1',
    // '@seed': '<rootDir>/src/scripts/seed',
    // '@util/(.*)': '<rootDir>/src/util/$1',
  }
};
