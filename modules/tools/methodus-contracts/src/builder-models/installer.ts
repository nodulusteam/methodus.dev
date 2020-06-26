import * as shelljs from 'shelljs';
import * as exec from 'shelljs.exec';

const LINE = '----------------------------------------------------------------------';
const Console = console;
export class Installer {
    shell: any;
    constructor() {
        this.shell = shelljs;
    }


    public publish(destFolder: string) {
        const cwd = process.cwd();
        this.shell.cd(destFolder);

        let commandStr = 'npm pack';
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
