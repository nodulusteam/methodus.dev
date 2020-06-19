const inquirer = {
    prompt: jest.fn(async () => {
        return { name: 'myapp', template: 'application' };
    }),

};

module.exports = inquirer;
