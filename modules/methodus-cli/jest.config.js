module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
      "<rootDir>/src/**/flow.spec.ts"
    ],
    "collectCoverageFrom": [
      "<rootDir>/src/**/*.ts",
      "!<rootDir>/src/tests/**/*",
      "!<rootDir>/src/**/*test*",
      "!<rootDir>/src/index.ts",
      "!<rootDir>/templates/**/*",
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