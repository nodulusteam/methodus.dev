import { Builder } from '../build.functions';
import * as path from 'path';
import { BuildOptions } from '../builder-models/interfaces';

describe('Build server contracts', () => {
    const all = ['simple', 'models', 'inherit', 'grpc'];
    all.forEach((contract) => {
        test('Build server contracts', async () => {

            const options = new BuildOptions(false, false);
            options.isProtobuf = true;

            process.chdir(path.join(__dirname, '..', '..'));// reset the cwd, since it changes when generating cotracts
            const result = await Builder(options, path.join(process.cwd(), `/build_vars/${contract}/build.json`));
            expect(result).toBeDefined();

        });
    });
});


describe('Build with args', () => {
    const all = ['simple'];
    all.forEach((contract) => {
        test('Build server contracts', async () => {

            const options = new BuildOptions(false, false);
            options.isProtobuf = true;
            process.argv[2] = `/build_vars/${contract}/build.json`;
            process.argv[3] = '-p';
            process.chdir(path.join(__dirname, '..', '..'));// reset the cwd, since it changes when generating cotracts

            try {
                const result = await Builder(options);
            } catch (error) {
                console.log(error);
                expect(error).toBe('could not publish contract');
            }

        });
    });
});