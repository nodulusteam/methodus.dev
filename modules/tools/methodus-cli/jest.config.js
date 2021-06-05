const jestBase = require('../../../jest.base.config');

module.exports = {
    ...jestBase,
    testMatch: ['<rootDir>/src/**/flow.spec.ts'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/tests/**/*', '!<rootDir>/src/**/*test*', '!<rootDir>/src/index.ts', '!<rootDir>/templates/**/*'],
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
