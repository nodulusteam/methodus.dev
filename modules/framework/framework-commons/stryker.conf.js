const path = require('path');
/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
    tempDirName: '../../stryker-tmp',
    mutator: 'typescript',
    transpilers: [],
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress'],
    htmlReporter: { baseDir: '../../../coverage/reports/framework/common' },
    testRunner: 'jest',
    jest: {
        config: require('./jest.config.js')
    },
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
};
