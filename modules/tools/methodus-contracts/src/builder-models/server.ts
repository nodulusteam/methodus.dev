import { UseTemplate, UseCustomTemplate } from './exportify';
import { Installer } from './installer';
import { Configuration } from './interfaces';

import * as path from 'path';
import { MethodusProject } from '../ast/project';

const PKGJSON = 'package.json';

export class Server {

    Installer: Installer;
    source?: MethodusProject;
    target?: MethodusProject;
    constructor(configuration: Configuration, packageName: string, source: string, target: string) {

        this.Installer = new Installer();
        const originalPackage = require(path.join(source, PKGJSON));
        UseTemplate('_package.json', PKGJSON, target,
            { name: configuration.contractNameServer, version: originalPackage.version });

        UseTemplate('_.gitignore', '.gitignore', target);


        if (configuration.npmignore) {
            UseCustomTemplate(path.join(source, configuration.npmignore), '.npmignore', target);
        }

        if (configuration.npmrc) {
            UseCustomTemplate(path.join(source, configuration.npmrc), '.npmrc', target);
        }





    }

    // public link(dest: string) {
    //     this.Installer.link(dest);
    // }

    public publish(dest) {
        this.Installer.publish(dest);
    }

}
