const yargs = require('yargs');

module.exports = {
  isProject: true,
  args: [
    {
      name: 'name',
      type: 'input',
      message: 'Project name:',
      when: () => !yargs.argv['name'],
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
      }
    }
  ]

}