import { CLI } from '../cli';
import * as path from 'path';
import { random } from 'faker';
import * as gracefulFs from 'graceful-fs';
import { getTemplateConfig } from '../utils/template';
const SANDBOX = path.join(process.cwd(), 'sandbox');

describe('Test the CLI', () => {
    jest.mock('colors');
    jest.setTimeout(20 * 1000);
    const projectName = random.alphaNumeric(8);
    process.env.APPLICATION_DIR = SANDBOX;

    beforeAll(async () => {
        try {
            gracefulFs.mkdirSync(SANDBOX, {});
        } catch (error) {
            //console.warn(error);
        }
    });

    afterAll(() => {});

    it('new application', async () => {
        const templatePath = path.join(
            __dirname,
            '..',
            'templates',
            'application'
        );
        const templateConfig = getTemplateConfig(templatePath);
        await (new CLI(projectName, templateConfig)).generate(
            'application',
            templatePath
        );
        expect(true).toBe(true);
    });

    it('bad template', async () => {


    });
});
