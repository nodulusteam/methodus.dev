const jestBase = require('../../../jest.base.config');

module.exports = {
  ...jestBase,
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