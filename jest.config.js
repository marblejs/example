module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: [
    '.d.ts$',
    '.spec.ts',
    'src/index.ts',
    'src/config',
    'connection/database',
    'connection/server',
  ],
  collectCoverageFrom : ['src/**/*.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  setupTestFrameworkScriptFile: "./src/tests/setup.ts",
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json',
    }
  },
  moduleNameMapper: {
    '@app': '<rootDir>/src/app.ts',
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@config': '<rootDir>/src/config',
    '@connection': '<rootDir>/src/connection',
    '@seed': '<rootDir>/src/seed',
    '@tests': '<rootDir>/src/tests',
    '@util': '<rootDir>/src/util',
  }
};
