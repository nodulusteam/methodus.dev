module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/tests/**/*'],
    collectCoverage: true,
    reporters: [
        'default',
        ['../../../node_modules/jest-html-reporters', {      
          'filename': '../../../docs/modules/framework/decorators/test_dashboard.html',
          'expand': true
        }],
        ['../../../node_modules/jest-html-reporter', {
          'outputPath': '../../../docs/modules/framework/decorators/tests.html',
          'pageTitle': 'Test Report'
        }]
      ],

    "coverageReporters": ["lcov","json"],
    coverageThreshold: {
        global: {
            "branches": 10,
            "functions": 10,
            "lines": 10,
            "statements": 10
        },
    },
};
