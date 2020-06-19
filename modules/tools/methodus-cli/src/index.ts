#!/usr/bin/env node

import * as yargs from 'yargs';
import { flow } from './flow';
const colors: any = require('colors');

const commandArguments = yargs.argv;
flow(
    commandArguments._[0],
    commandArguments._[1],
    commandArguments._[2],
    commandArguments.module
)
    .then(result => {
        debugger;
        console.log(colors.green('Complete.'));
    })
    .catch(error => {
        console.log(colors.red('An error has occured.'));
        console.log(colors.red(error));
    });
