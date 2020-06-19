const yargs = require('yargs');

module.exports = {
  baseOutput: '',
  createDir: true,
  args: [
    {
      name: 'name',
      type: 'input',
      message: 'Controller name:',
      when: () => !yargs.argv['name'],
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Controller name may only include letters, numbers, underscores and hashes.';
      }
    }
  ]

}