module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/server/tests/*.spec.ts"
  ],
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  },
  "collectCoverage": true,
  "coverageReporters": ["json", "lcov", "text", "clover"],
  "coverageThreshold": {
    "global": {
      "branches": 40,
      "functions": 40,
      "lines": 40,
      "statements": 40
    }
  }
};