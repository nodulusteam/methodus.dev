
import * as path from 'path';
import * as fs from 'fs';
import * as shell from 'shelljs';

import * as colors from 'colors';
import { HEADER, Configuration } from './interfaces';
const ROOTSRC = 'src';
const Console = console;

export function ModelsIndex(buildConfiguration: Configuration, source: string, target: string, packageName: string) {

    const head = `/**/\n`;
    let body = '';

    if (buildConfiguration.models) {
        Object.keys(buildConfiguration.models).forEach((modelKey: string) => {

            const cleanKey = (!modelKey.endsWith('Model')) ? `${modelKey}Model` : modelKey;

            const fullPath = path.basename(buildConfiguration.models[modelKey].path, '.ts');

            body += `export {${modelKey} as ${cleanKey}} from './${fullPath}';\n`;
        });
    }

    shell.mkdir('-p', target);
    fs.writeFileSync(path.join(target, 'index.ts'), `${HEADER}${head}${body}\n`);
}


export function ContractsIndex(buildConfiguration: Configuration, source: string, target: string, packageName: string) {

    const head = `/**/\n`;
    let body = '';

    if (buildConfiguration.contracts) {
        Object.keys(buildConfiguration.contracts).forEach((contractKey: string) => {
            const fullPath = path.basename(buildConfiguration.contracts[contractKey].path, '.ts');
            body += `export * from './${fullPath}';\n`;
        });
    }

    shell.mkdir('-p', target);
    fs.writeFileSync(path.join(target, 'index.ts'), `${HEADER}${head}${body}\n`);
}

export function IncludesIndex(buildConfiguration: Configuration, source: string, target: string, packageName: string) {

    const head = `/**/\n`;
    let body = '';

    if (buildConfiguration.includes) {
        Object.keys(buildConfiguration.includes).forEach((contractKey: string) => {
            const fullPath = path.basename(buildConfiguration.includes[contractKey].path, '.ts');
            body += `export * from './${fullPath}';\n`;
        });
    }

    shell.mkdir('-p', target);
    fs.writeFileSync(path.join(target, 'index.ts'), `${HEADER}${head}${body}\n`);
}


export function UseTemplate(fileName, targetFileName, destFolder, replacement?) {
    let content = fs.readFileSync(path.resolve(path.join(__dirname, '../../template', fileName)), 'utf-8');
    if (replacement) {
        Object.keys(replacement).forEach((entry) => content = content.replace(`{${entry}}`, replacement[entry]));
    }
    Console.log(colors.blue(`> ${fileName} --> ${targetFileName}`));
    shell.mkdir('-p', destFolder);
    fs.writeFileSync(path.join(destFolder, targetFileName), `${content}\n`);
}
export function UseCustomTemplate(fileName, targetFileName, destFolder, replacement?) {
    let content = fs.readFileSync(path.resolve(fileName), 'utf-8');
    if (replacement) {
        Object.keys(replacement).forEach((entry) => content = content.replace(`{${entry}}`, replacement[entry]));
    }
    shell.mkdir('-p', destFolder);
    Console.log(colors.blue(`> ${fileName} --> ${targetFileName}`));
    fs.writeFileSync(path.join(destFolder, targetFileName), `${content}\n`);
}
