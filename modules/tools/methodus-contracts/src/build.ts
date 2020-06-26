#!/usr/bin/env node
import { Builder } from './build.functions';
import { BuildOptions } from './builder-models/interfaces';
const logger = console;
(async () => {
    try {
        const options = new BuildOptions(false, false);
        await Builder(options);
    } catch (error) {
        logger.error(error);
    } finally {
        process.exit();
    }
})();
