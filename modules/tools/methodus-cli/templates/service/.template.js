const yargs = require('yargs');

module.exports = {
 
  createDir: true,
  args: [
    {
      name: 'name',
      type: 'input',
      message: 'Service name:',
      when: () => !yargs.argv['name'],
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Service name may only include letters, numbers, underscores and hashes.';
      }
    }
  ]

}