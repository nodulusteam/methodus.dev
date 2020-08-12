const random = require('faker').random;

const inquirer = {
    prompt: jest.fn(async () => {
        const projectName = random.alphaNumeric(8);
        return { name: projectName, template: 'application' };
    }),

};

module.exports = inquirer;
