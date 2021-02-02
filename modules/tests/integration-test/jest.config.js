module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
      "<rootDir>/src/**/*.spec.ts"
    ],
    "collectCoverageFrom": [
      "<rootDir>/src/**/*.ts",
      "!<rootDir>/src/index.ts",
      "!<rootDir>/src/**/*test*"
    ],
    collectCoverage: true,
    "coverageReporters": ["json", "lcov", "text", "clover"],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 50,
        "lines": 80,
        "statements": 80
      }
    }
  };