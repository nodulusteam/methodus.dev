import * as inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
import * as glob from 'glob';
import { CLI } from './cli';
import { Project } from 'ts-morph';
import {
    camelCaseToDash,
    TemplateConfig,
    getTemplateConfig,
} from './utils/template';

const TEMPLATES_BASE = path.join(__dirname, '..', 'templates');
const CHOICES = fs.readdirSync(TEMPLATES_BASE);
const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES,
        when: () => !yargs.argv['template'],
    },
    // ,
    // {
    //   name: 'name',
    //   type: 'input',
    //   message: 'Project name:',
    //   when: () => !yargs.argv['name'],
    //   validate: (input: string) => {
    //     if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
    //     else return 'Project name may only include letters, numbers, underscores and hashes.';
    //   }
    // }
];

export async function flow(
    verb: string,
    what?: string,
    name?: string,
    moduleName?: string
) {
    switch (verb) {
        case 'application':
            const templatePath = path.join(TEMPLATES_BASE, verb); //verb is application
            const templateConfig: TemplateConfig = getTemplateConfig(
                templatePath
            );
            if (templateConfig && what) {
                new CLI(what, templateConfig).generate(
                    verb,
                    templatePath
                ); // what is the name
            }
            return;

        case 'generate':
        case 'g':
            if (!name) {
                throw 'Are you missing a name?';
            }
            const map = {
                controller: 'controller',
                c: 'controller',
                service: 'service',
                s: 'service',
                module: 'module',
                m: 'module',
            };

            if (what) {
                await generate(map[what], moduleName, name);
                return;
            }

            const answers = await inquirer.prompt([QUESTIONS[0]]);
            await goForQuestions(answers);

        // inquirer.prompt([QUESTIONS[0]]).then(async (answers: any) => {
        //     answers = Object.assign({}, answers); //yargs.argv
        //     const projectChoice = answers['template'];
        //     const templatePath = path.join(
        //         __dirname,
        //         '..',
        //         'templates',
        //         projectChoice
        //     );
        //     const templateConfig: TemplateConfig = getTemplateConfig(
        //         templatePath
        //     );
        //     if (templateConfig) {
        //         answers = await inquirer.prompt(templateConfig.args as any);
        //         const projectName = answers['name'];
        //         new CLI(projectName, templateConfig).generate(
        //             projectChoice,
        //             templatePath
        //         );
        //     }
        // });
    }

    const answers2 = await inquirer.prompt([QUESTIONS[0]]);
    await goForQuestions(answers2);
    //    .then(async (answers: any) => {
    //         answers = Object.assign({}, answers); //yargs.argv
    //         const projectChoice = answers['template'];
    //         const templatePath = path.join(
    //             __dirname,
    //             '..',
    //             'templates',
    //             projectChoice
    //         );
    //         const templateConfig: TemplateConfig = getTemplateConfig(templatePath);
    //         if (templateConfig) {
    //             answers = await inquirer.prompt(templateConfig.args as any);
    //             const projectName = answers['name'];
    //             await new CLI(projectName, templateConfig).generate(
    //                 projectChoice,
    //                 templatePath
    //             );
    //         }
    //     });
}


export async function goForQuestions(answers: any) {
    answers = Object.assign({}, answers); //yargs.argv
    const projectChoice = answers['template'];
    const templatePath = path.join(
        __dirname,
        '..',
        'templates',
        projectChoice
    );
    debugger;
    const templateConfig: TemplateConfig = getTemplateConfig(
        templatePath
    );
    if (templateConfig) {
        answers = await inquirer.prompt(templateConfig.args as any);
        const projectName = answers['name'];




        const cli = new CLI(projectName, templateConfig);
        const modules = listModules(cli);

        debugger;
        const modulesAnswers: any = await inquirer.prompt([{
            name: 'modules',
            type: 'list',
            message: 'What project template would you like to generate?',
            choices: modules as any,
            when: () => !yargs.argv['modules'],
        }]);
        const moduleName = modulesAnswers['name'];
        let moduleFilePath;// = await findModule('AppModule', cli);
        if (moduleName) {
            moduleFilePath = await findModule(moduleName, cli);
        } else {

        }

        cli.generate(
            projectChoice,
            templatePath,
            moduleFilePath
        );
    }

}
async function generate(
    templateKey: string,
    moduleFilePath: string = '',
    name: string
) {
    const cli = createCli(templateKey);


    createItem(cli, moduleFilePath, name, templateKey);
    patchModuleFile(cli, moduleFilePath, name, templateKey);
}
async function findModule(moduleName: string, controllerCli: CLI) {
    const files = glob.sync(`**/${camelCaseToDash(moduleName)}.ts`, {
        cwd: controllerCli.CURR_DIR,
    }); //find the module


    if (files.length === 0) {
        throw `Module ${moduleName} could not be found.`;
    }
    return files[0];
}

function createCli(templateKey: string) {
    const templateConfig = getTemplateConfig(
        path.join(TEMPLATES_BASE, templateKey)
    );
    return new CLI('', templateConfig);
}

function patchModuleFile(
    controllerCli: CLI,
    moduleFilePath: string,
    name: string,
    templateKey: string
) {
    const propertiesForTemplates = {
        controller: 'declarations',
        service: 'providers',
        module: 'imports',
    };
    const project = new Project({
        tsConfigFilePath: `${controllerCli.CURR_DIR}/tsconfig.json`,
        skipFileDependencyResolution: true,
    });

    const moduleSourceFile = project.getSourceFile(
        path.join(controllerCli.CURR_DIR, moduleFilePath)
    );
    if (moduleSourceFile) {
        const propertyToHandle = propertiesForTemplates[templateKey];

        moduleSourceFile.getClasses().forEach(classInFile => {
            const moduleDecorators = classInFile.getDecorator('Module');
            if (moduleDecorators) {
                let property = classInFile.getProperty(propertyToHandle);
                if (!property) {
                    classInFile.addProperty({
                        initializer: `[${name}]`,
                        isStatic: false,
                        name: propertyToHandle,
                        type: Array,
                    });
                } else {
                    const arr: any = property.getInitializer();
                    let text = arr.getFullText().trim();
                    if (text.startsWith('[') && text.endsWith(']')) {
                        text = text.substring(1, text.length - 1);
                    }
                    const strings = text.split(',').filter((i: any) => {
                        return i;
                    });
                    strings.push(name);
                    property.setInitializer(`[${strings.join(',')}]`);
                }
            }
        });

        project.addDirectoryAtPath(controllerCli.CURR_DIR);
        project.resolveSourceFileDependencies();
        moduleSourceFile.addImportDeclaration({
            namedImports: [name],
            moduleSpecifier: `./${camelCaseToDash(name)}/${camelCaseToDash(
                name
            )}`,
        });

        moduleSourceFile.fixMissingImports();
        project.saveSync();
    }
}

function createItem(
    controllerCli: CLI,
    moduleFile: string,
    name: string,
    templateKey: string
) {
    const controllerPath = path.dirname(moduleFile);

    controllerCli.createDirectoryContents(
        path.join(controllerCli.CURR_DIR, controllerPath),
        path.join(TEMPLATES_BASE, templateKey),
        name,
        controllerCli.templateConfig
    );
}



function listModules(controllerCli: CLI) {
    const project = new Project({
        tsConfigFilePath: `${controllerCli.CURR_DIR}/tsconfig.json`,
        skipFileDependencyResolution: true,
    });

    const moduleFiles = project.getSourceFiles().map((
        moduleSourceFile
    ) => {
        for (const classInFile of moduleSourceFile.getClasses()) {
            const moduleDecorators = classInFile.getDecorator('Module');
            if (moduleDecorators) {
                return (moduleDecorators.getArguments()[0] as any).getLiteralValue();
            }
        }
        return undefined;
    }).filter((file) => file !== undefined);
    return moduleFiles;

}

function listTree() {

}
