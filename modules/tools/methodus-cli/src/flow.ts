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
    }
];


export async function flowAllPaths(
    verb: string,
    what?: string,
    name?: string,
    moduleName?: string
) {
    if (!verb) { //cli was ran by just "methodus"
        const templateSelection: { template: string } = await inquirer.prompt([QUESTIONS[0]]);
        verb = templateSelection.template;
    }
    await flow(verb, what, name, moduleName);

}

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
            const nameAnswer: any = await inquirer.prompt(templateConfig.args as any);
            if (!what) {
                what = nameAnswer['name'];
            }

            if (templateConfig && what) {
                new CLI(what, templateConfig).generate(
                    verb,
                    templatePath
                ); // what is the name
            }
            return;

        case 'generate':
        case 'g':
        case 'controller':
        case 'module':
        case 'service':

            const map = {
                controller: 'controller',
                c: 'controller',
                service: 'service',
                s: 'service',
                module: 'module',
                m: 'module',
            };

            const templatItemPath = path.join(TEMPLATES_BASE, map[what || verb]);
            const templateItemConfig: TemplateConfig = getTemplateConfig(
                templatItemPath
            );

            if (!name) {
                const nameItemAnswer: any = await inquirer.prompt(templateItemConfig.args as any);
                name = nameItemAnswer['name'];
            }
            const cli = createCli(map[what || verb]);
            try {
                const modules = listModules(cli);
                if (!moduleName || !modules[moduleName]) {
                    if (moduleName && !modules[moduleName]) {
                        console.warn(`couldn't find module '${moduleName}'`);
                    }
                    const modulesAnswers: any = await inquirer.prompt([{
                        name: 'modules',
                        type: 'list',
                        message: 'Bind to module',
                        choices: Object.keys(modules),
                        when: () => !yargs.argv['modules'],
                    }]);
                    moduleName = modulesAnswers['modules'];
                }
                await generate(map[what || verb], modules[moduleName!], name!);
            } catch (error) {
                console.log(error);
            }

            return;

    }
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
    const templateConfig: TemplateConfig = getTemplateConfig(
        templatePath
    );
    if (templateConfig) {
        answers = await inquirer.prompt(templateConfig.args as any);
        const projectName = answers['name'];




        const cli = new CLI(projectName, templateConfig);
        const modules = listModules(cli);

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

    const moduleSourceFile = project.getSourceFile(moduleFilePath);
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
        controllerPath,
        path.join(TEMPLATES_BASE, templateKey),
        name,
        controllerCli.templateConfig
    );
}



function listModules(controllerCli: CLI) {
    const moduleObject = {};
    const project = new Project({
        tsConfigFilePath: `${controllerCli.CURR_DIR}/tsconfig.json`,
        skipFileDependencyResolution: true,
    });

    project.getSourceFiles().forEach((
        moduleSourceFile
    ) => {
        for (const classInFile of moduleSourceFile.getClasses()) {
            const moduleDecorators = classInFile.getDecorator('Module');
            if (moduleDecorators) {
                const key = (moduleDecorators.getArguments()[0] as any).getLiteralValue();
                moduleObject[key] = moduleSourceFile.getFilePath();

            }
        }
    });
    moduleObject['No Module'] = null;
    return moduleObject;
}

function listTree() {

}
