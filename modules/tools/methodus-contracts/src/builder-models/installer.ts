import * as shelljs from 'shelljs';
import * as exec from 'shelljs.exec';
import { Configuration } from './interfaces';
 
export class Installer {
    shell: any;
    constructor(public configuration: Configuration) {
        this.shell = shelljs;
    }

    public publish(destFolder: string) {
        const cwd = process.cwd();
        this.shell.cd(destFolder);

        let commandStr = `${this.configuration.runner} pack`;
        if (process.env.YARN) {
            commandStr = 'yarn pack';
        }

        if (exec(commandStr).code !== 0) {
            this.shell.cd(cwd);
            throw (new Error('could not publish contract'));
        }
        this.shell.cd(cwd);
    }
}
