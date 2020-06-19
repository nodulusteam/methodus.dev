import * as shelljs from 'shelljs';
import * as exec from 'shelljs.exec';

const LINE = '----------------------------------------------------------------------';
const Console = console;
export class Installer {
    shell: any;
    constructor() {
        this.shell = shelljs;
    }



    // public link(destFolder) {
    //     const cwd = process.cwd();
    //     this.shell.cd(destFolder);
    //     let commandStr = 'npm unlink';
    //     if (process.env.YARN) {
    //         commandStr = 'yarn unlink';
    //     }


    //     exec(commandStr);

    //     commandStr = 'npm link';
    //     if (process.env.YARN) {
    //         commandStr = 'yarn link';
    //     }

    //     if (exec(commandStr).code !== 0) {
    //         this.shell.cd(cwd);
    //         throw (new Error('could not link contract'));
    //     }

    //     this.shell.cd(cwd);
    // }

    public publish(destFolder) {
        const cwd = process.cwd();
        this.shell.cd(destFolder);

        let commandStr = 'npm publish';
        if (process.env.YARN) {
            commandStr = 'yarn publish';
        }

        if (exec(commandStr).code !== 0) {
            this.shell.cd(cwd);
            throw (new Error('could not publish contract'));
        }
        this.shell.cd(cwd);
    }
}
