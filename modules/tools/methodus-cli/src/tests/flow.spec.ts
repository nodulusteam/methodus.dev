import * as path from 'path';
import { flow, goForQuestions, flowAllPaths } from '../flow';
import { random } from 'faker';
import * as gracefulFs from 'graceful-fs';
const mockInquirer = require('mock-inquirer')

const SANDBOX = path.join(process.cwd(), 'sandbox');

describe('Test the flow', () => {
    jest.setTimeout(20 * 1000);
    jest.mock('colors');
    const projectName = random.alphaNumeric(8);
    process.env.APPLICATION_DIR = SANDBOX;

    beforeAll(async () => {
        try {
            gracefulFs.mkdirSync(SANDBOX, {});
        } catch (error) {
            // console.warn(error);
        }
    });

    describe('test commands', () => {
        const cliPath = __dirname + '/flow.js';

        it('open methodus select application', async () => {
            let reset = mockInquirer([{
                template: 'application'
            },{
                name: projectName
            }])
            await flowAllPaths('');
            expect(true).toBe(true);
        })

        it('open methodus select controller', async () => {
            let reset = mockInquirer([{
                template: 'controller'
            },{
                name: `${projectName}.controller`
            }])
            await flowAllPaths('');
            expect(true).toBe(true);
        })
    })


    it('generate', async () => {
        await flow('application', projectName);
        expect(true).toBe(true);
    });

    it('add a module', async () => {
        process.env.APPLICATION_DIR = path.join(SANDBOX, projectName);
        await flow('generate', 'module', `FeatureModule`);
        await flow('g', 'm', `FeatureModule2`);
        expect(true).toBe(true);
    });

    it('create a controller', async () => {
        process.env.APPLICATION_DIR = path.join(SANDBOX, projectName);
        await flow('generate', 'controller', `FeatureController`, 'FeatureModule');
        await flow('g', 'c', `FeatureController2`, 'FeatureModule2');
        expect(true).toBe(true);
    });

    it('create a service', async () => {
        process.env.APPLICATION_DIR = path.join(SANDBOX, projectName);
        await flow('generate', 'service', `FeatureService`, 'FeatureModule');
        await flow('g', 's', `FeatureService2`, 'FeatureModule2');
        expect(true).toBe(true);
    });

    it('no name', async () => {
        process.env.APPLICATION_DIR = path.join(SANDBOX, projectName);
        try {
            await flow('generate', 'service');
        } catch (error) {
            expect(error).toBe('Are you missing a name?');
        }


        expect(true).toBe(true);
    });



});
