import { Builder } from '../build.functions';
import * as path from 'path';
import { BuildOptions } from '../builder-models/interfaces';

describe('Build server contracts', () => {

    async function tester(contract: string) {
        try {
            const options = new BuildOptions(true, false);
            process.chdir(path.join(__dirname, '..', '..'));// reset the cwd, since it changes when generating cotracts
            const result = await Builder(options, path.join(process.cwd(), `/build_vars/${contract}/build.json`));
            expect(result).toBeDefined();
        } catch (error) {
            expect(false).toBeTruthy();
        }
    }

    test('Build simple server contracts', async () => {
        await tester('simple');
    });

    test('Build models server contracts', async () => {
        await tester('models');
    });

    test('Build inherit server contracts', async () => {
        await tester('inherit');
    });

});
