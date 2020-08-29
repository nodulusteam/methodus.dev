module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/tests/**/*"
  ],
  reporters: [
    'default',
    ['../../../node_modules/jest-html-reporter', {
      'outputPath': '../../../docs/modules/framework/injection/tests.html',
      'pageTitle': 'Test Report'
    }]
  ],
  collectCoverage: true,
  "coverageReporters": ["lcov","json"],
  "coverageThreshold": {
    "global": {
      "branches": 10,
      "functions": 10,
      "lines": 10,
      "statements": 10
    }
  }
};