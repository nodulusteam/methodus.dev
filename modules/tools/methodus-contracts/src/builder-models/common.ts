import { ModelsIndex, ContractsIndex, IncludesIndex } from './exportify';
import * as path from 'path';
import { MethodusProject } from '../ast/project';
import * as rimraf from 'rimraf';
import { FormatCodeSettings, UserPreferences } from 'ts-morph';
import { BuildOptions, Configuration } from './interfaces';

const ROOTSRC = 'src';


export class Common {

    public static async newCommonFlow(configuration: Configuration, packageName, options: BuildOptions) {

        rimraf.sync(path.join(options.target , 'build'));

        if (configuration.tsConfig) {
            const filePath = path.join(options.source, configuration.tsConfig);
            options.tsConfig = filePath;
        }


        const sourceProject = new MethodusProject(options.source, packageName, options);
        const targetProject = new MethodusProject(options.target, packageName, options); //options.isProtobuf ? new ProtoProject(target, packageName, options) :

        if (configuration.models && Object.keys(configuration.models).length > 0) {
            Object.keys(configuration.models).forEach((modelKey) => {
                const model = configuration.models[modelKey];
                const modelFile = sourceProject.project.addExistingSourceFile(path.join(options.source, model.path));
                targetProject.ProxifyFromModel(modelFile, 'models', modelKey.toLocaleLowerCase());
            });
            const indexPath = path.join(options.target, ROOTSRC, 'models',);
            ModelsIndex(configuration, options.source, indexPath, packageName);
            targetProject.project.addExistingSourceFileIfExists(path.join(indexPath, 'index.ts'));
            targetProject.project.saveSync();
        }


        if (configuration.contracts) {
            Object.keys(configuration.contracts).forEach((contractKey) => {
                const contract = configuration.contracts[contractKey];
                const sourceFile = sourceProject.project.addExistingSourceFile(path.join(options.source, contract.path));
                targetProject.ProxifyFromFile(sourceFile, 'contracts', contractKey.toLocaleLowerCase(), options);
            });
            const indexPath = path.join(options.target, ROOTSRC, 'contracts');
            ContractsIndex(configuration, options.source, indexPath, packageName);
            targetProject.project.addExistingSourceFileIfExists(path.join(indexPath, 'index.ts'));
            targetProject.project.saveSync();
        }

        if (configuration.includes) {
            Object.keys(configuration.includes).forEach((includeKey) => {
                const include = configuration.includes[includeKey];
                const sourceFile = sourceProject.project.addExistingSourceFile(path.join(options.source, include.path));
                targetProject.HandleIncludeFile(sourceFile, 'includes', options);
            });
            const indexPath = path.join(options.target, ROOTSRC, 'includes');
            IncludesIndex(configuration, options.source, indexPath, packageName);
            targetProject.project.addExistingSourceFileIfExists(path.join(indexPath, 'index.ts'));
            targetProject.project.saveSync();
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


        targetProject.Exportify(configuration);
        return targetProject;
    }
}
