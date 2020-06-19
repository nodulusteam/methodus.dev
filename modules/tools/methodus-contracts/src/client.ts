#!/usr/bin/env node
import { Builder } from './build.functions';
import { BuildOptions } from './builder-models/interfaces';
(async () => {
    const options = new BuildOptions(true, false);
    await Builder(options);
})();
