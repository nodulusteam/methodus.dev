#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';
const colors: any = require('colors');
 
import {
    CliOptions,
    TemplateConfig,
    camelCaseToDash,
    render,
} from './utils/template';

export class CLI {
    public CURR_DIR: string;
    SKIP_FILES = ['node_modules', '.template.js'];
    /**
     *
     */
    constructor(
        public projectName: string,
        public templateConfig: TemplateConfig
    ) {
        this.CURR_DIR = process.env.APPLICATION_DIR || process.cwd();
    }
    generate(projectChoice: string, templatePath: string) {
        const tartgetPath = path.join(
            this.CURR_DIR,
            camelCaseToDash(this.projectName)
        );

        const options: CliOptions = {
            projectName: this.projectName,
            templateName: projectChoice,
            templatePath,
            tartgetPath,
            config: this.templateConfig,
        };

        if (this.templateConfig.isProject && !this.createProject(tartgetPath)) {
            return;
        }

        this.createDirectoryContents(
            this.CURR_DIR,
            templatePath,
            this.projectName,
            this.templateConfig
        );

        if (!this.postProcess(options)) {
            return;
        }

        this.showMessage(options);
    }
    showMessage(options: CliOptions) {
        console.log('');
        console.log(colors.green('Done.'));
        console.log(
            colors.green(`Go into the project: cd ${camelCaseToDash(options.projectName)}`)
                 
        );

        const message = options.config.postMessage;

        if (message) {
            console.log('');
            console.log( colors.yellow(message));
            console.log('');
        }
    }

    createProject(projectPath: string) {
        if (fs.existsSync(projectPath)) {
            console.log(
                colors.red(`Folder ${projectPath} exists. Delete or use another name.`)
            );
            return false;
        }

        fs.mkdirSync(projectPath);
        return true;
    }

    postProcess(options: CliOptions) {
        if (this.isNode(options)) {
            return this.postProcessNode(options);
        }
        return true;
    }

    postProcessNode(options: CliOptions) {
        shell.cd(options.tartgetPath);

        let cmd = '';

        if (shell.which('yarn')) {
            cmd = 'yarn';
        } else if (shell.which('npm')) {
            cmd = 'npm install';
        }

        if (cmd) {
            const result = shell.exec(cmd);

            if (result.code !== 0) {
                return false;
            }
        } else {
            console.log(colors.red('No yarn or npm found. Cannot run installation.'));
        }

        return true;
    }

    isNode(options: CliOptions) {
        return fs.existsSync(path.join(options.templatePath, 'package.json'));
    }

    createDirectoryContents(
        outputPath: string,
        templatePath: string,
        projectName: string,
        config: TemplateConfig
    ) {
        if (!outputPath) {
            outputPath = this.CURR_DIR;
        }
        const filesToCreate = fs.readdirSync(templatePath);

        filesToCreate.forEach(file => {
            const origFilePath = path.join(templatePath, file);
            // get stats about the current file
            const stats = fs.statSync(origFilePath);

            if (this.SKIP_FILES.indexOf(file) > -1) return;
            if (stats.isFile()) {
                let contents = fs.readFileSync(origFilePath, 'utf8');
                contents = render(contents, {
                    projectName,
                    projectNameCamel: camelCaseToDash(projectName),
                });
                let writePath = path.join(
                    outputPath,
                    camelCaseToDash(projectName)
                );
                if (config.baseOutput) {
                    writePath = path.join(
                        this.CURR_DIR,
                        config.baseOutput,
                        camelCaseToDash(projectName)
                    );
                }
                if (config.createDir) {
                    if (!fs.existsSync(writePath)) {
                        fs.mkdirSync(writePath);
                    }
                }

                fs.writeFileSync(
                    path.join(
                        writePath,
                        file.replace('__ph__', camelCaseToDash(projectName))
                    ),
                    contents,
                    'utf8'
                );
            } else if (stats.isDirectory()) {
                fs.mkdirSync(
                    path.join(this.CURR_DIR, camelCaseToDash(projectName), file)
                );
                // recursive call
                this.createDirectoryContents(
                    outputPath,
                    path.join(templatePath, file),
                    path.join(camelCaseToDash(projectName), file),
                    config
                );
            }
        });
    }
}
