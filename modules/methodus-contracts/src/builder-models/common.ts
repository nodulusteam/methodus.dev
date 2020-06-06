import { ModelsIndex, ContractsIndex, IncludesIndex } from './exportify';
import * as path from 'path';
import { MethodusProject } from '../ast/project';
import * as rimraf from 'rimraf';
import { FormatCodeSettings, UserPreferences } from 'ts-morph';
import { BuildOptions } from './interfaces';

const ROOTSRC = 'src';


export class Common {

    public static newCommonFlow(configuration, packageName, target, source, options: BuildOptions) {

        rimraf.sync(path.join(target, 'build'));

        const sourceProject = new MethodusProject(source, packageName, options);
        const targetProject =  new MethodusProject(target, packageName, options); //options.isProtobuf ? new ProtoProject(target, packageName, options) :

        if (configuration.models && Object.keys(configuration.models).length > 0) {
            Object.keys(configuration.models).forEach((modelKey) => {
                const model = configuration.models[modelKey];
                const modelFile = sourceProject.project.addExistingSourceFile(path.join(source, model.path));
                targetProject.ProxifyFromModel(modelFile, 'models', modelKey.toLocaleLowerCase());
            });
        }


        if (configuration.contracts) {
            Object.keys(configuration.contracts).forEach((contractKey) => {
                const contract = configuration.contracts[contractKey];
                const sourceFile = sourceProject.project.addExistingSourceFile(path.join(source, contract.path));
                debugger;
                targetProject.ProxifyFromFile(sourceFile, 'contracts', contractKey.toLocaleLowerCase(), options);
            });
        }

        if (configuration.includes) {
            Object.keys(configuration.includes).forEach((includeKey) => {
                const include = configuration.includes[includeKey];
                const sourceFile = sourceProject.project.addExistingSourceFile(path.join(source, include.path));
                targetProject.HandleIncludeFile(sourceFile, 'includes', options);
            });
        }

        const format: FormatCodeSettings = {

        }

        const prefernces: UserPreferences = {
            importModuleSpecifierPreference: "non-relative"
        }




        targetProject.project.getSourceFiles().forEach((finalFile) => {
            finalFile.fixMissingImports(format, prefernces);

            finalFile.getImportDeclarations().forEach((importDec) => {
                const children = importDec.getChildren();

                if (children.length === 3) {
                    importDec.remove();
                }

            });
            finalFile.saveSync();
        });

        if (configuration.includes) {
            IncludesIndex(configuration, source, path.join(target, ROOTSRC, 'includes'), packageName);
        }

        if (configuration.contracts) {
            ContractsIndex(configuration, source, path.join(target, ROOTSRC, 'contracts'), packageName);
        }

        if (configuration.models && Object.keys(configuration.models).length > 0) {

            ModelsIndex(configuration, source, path.join(target, ROOTSRC, 'models'), packageName);
        }
        targetProject.Exportify(configuration, target, packageName, options);
        return targetProject;
    }
}
