const yargs = require('yargs');

module.exports = {
 
  createDir: true,
  args: [
    {
      name: 'name',
      type: 'input',
      message: 'Module name:',
      when: () => !yargs.argv['name'],
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Module name may only include letters, numbers, underscores and hashes.';
      }
    }
  ]

}