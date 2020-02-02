module.exports = {
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