const jestBase = require('../../../jest.base.config');

module.exports = {
 ...jestBase,
  testMatch: [
    "<rootDir>/src/tests/*.spec.ts"
  ],

  "collectCoverage": true,
  "coverageReporters": ["json", "lcov", "text", "clover"],
  "coverageThreshold": {
    "global": {
      "branches": 60,
      "functions": 60,
      "lines": 60,
      "statements": 60
    }
  }
};