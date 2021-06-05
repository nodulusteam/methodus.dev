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
            branches: 40,
            functions: 40,
            lines: 40,
            statements: 40,
        },
    },
};
