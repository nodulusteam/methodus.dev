module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.spec.ts'
  ],
  'collectCoverageFrom': [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/interfaces/**/*'
  ],
  reporters: [
    'default',
     
    ['../../../node_modules/jest-html-reporters', {      
      'filename': '../../../docs/modules/framework/common/test_dashboard.html',
      'expand': true
    }],


    ['../../../node_modules/jest-html-reporter', {
      'outputPath': '../../../docs/modules/framework/common/tests.html',
      'pageTitle': 'Test Report'
    }]
  ],
  collectCoverage: true,
  'coverageReporters': ['lcov', 'json'],
  'coverageThreshold': {
    'global': {
      'branches': 10,
      'functions': 10,
      'lines': 10,
      'statements': 10
    }
  }
};