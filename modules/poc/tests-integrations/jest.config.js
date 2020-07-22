module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.ts"     
  ],
  collectCoverage: true,
  "coverageReporters": ["json", "lcov", "text", "clover"],
  // "coverageThreshold": {
  //   "global": {
  //     "branches": 10,
  //     "functions": 10,
  //     "lines": 10,
  //     "statements": 10
  //   }
  // }
};