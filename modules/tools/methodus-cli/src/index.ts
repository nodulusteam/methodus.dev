#!/usr/bin/env node

import * as yargs from 'yargs';
import { flowAllPaths } from './flow';
const colors: any = require('colors');

const commandArguments = yargs.argv;
flowAllPaths(
    commandArguments._[0],
    commandArguments._[1],
    commandArguments._[2],
    commandArguments.module
)
    .then(result => {
        console.log(colors.green('Complete.'));
    })
    .catch(error => {
        console.log(colors.red('An error has occured.'));
        console.log(colors.red(error));
    });
