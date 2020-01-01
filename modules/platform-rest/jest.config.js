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
  collectCoverage: true,
  "coverageReporters": ["json", "lcov", "text", "clover"],
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  }
};