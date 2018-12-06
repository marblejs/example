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
  }
};
