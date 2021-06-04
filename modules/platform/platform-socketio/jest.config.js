const jestBase = require('../../../jest.base.config');



module.exports = {
   ...jestBase,
    testMatch: [
      "<rootDir>/src/**/*.spec.ts"
    ],
    "collectCoverageFrom": [
      "<rootDir>/src/**/*.ts",
      "!<rootDir>/src/tests/**/*"
    ],
    collectCoverage: true,
    "coverageReporters": ["json", "lcov", "text", "clover"],
    "coverageThreshold": {
      "global": {
        "branches": 0,
        "functions": 0,
        "lines": 0,
        "statements": 0
      }
    }
  };