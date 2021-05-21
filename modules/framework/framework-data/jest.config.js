module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/tests/**/*.spec.ts'],
    globalSetup: '<rootDir>/src/tests/setup/setup.js',
    globalTeardown: '<rootDir>/src/tests/setup/teardown.js',
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageThreshold: {
        global: {
            branches: 63,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
};
