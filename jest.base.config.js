const { defaults } = require('ts-jest/presets');

module.exports = {
  ...defaults,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/tests/**/*",
    "!<rootDir>/src/**/*test*"
  ],
  reporters: [
    'default',
     
    ['./node_modules/jest-html-reporters', {      
      'filename': 'coverage/test_dashboard.html',
      'expand': true
    }],


    ['../../../node_modules/jest-html-reporter', {
      'outputPath': 'coverage/tests.html',
      'pageTitle': 'Test Report'
    }]
  ],
  collectCoverage: true,
  "coverageReporters": ["json", "lcov", "text", "clover"],
  "coverageThreshold": {
    "global": {
      "branches": 60,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
};