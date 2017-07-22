import { TestClass } from '../classes/test-class';
import { Server, MethodType, MethodulusConfig } from '../../index';
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
// process.env.CONFIG_PATH = "./tests/config";
// process.env.silent = true;


export function ServerHelper(port, servers, methodType: MethodType) {
    const child1 = childProcessDebug.spawn(process.argv[0], ['./tests/servers/dynamic.js'], {
        detached: true,
        cwd: path.resolve('./'), env: { silent: true, PORT: port, servers: servers, MethodType: methodType }
    });
    child1.stdout.on('data', async (data) => {
        // console.error(`child stddata:\n${data}`);
    });
    child1.stderr.on('data', (data) => {
        //console.error(`child stderr:\n${data}`);
    });

    child1.on('exit', function (code, signal) {
        //console.log('child process exited with ' +
        // `code ${code} and signal ${signal}`);
    });
    return child1;
}

export function ClientHelper(classType, port, servers, methodType: MethodType, resolver) {
    let config = new MethodulusConfig(servers);
    config.use(classType, methodType, resolver);

    //MethodulusConfig.config[classType.name] = methodType;
    //MethodulusConfig.servers = servers;
    let server = new Server(port).configure(config).start();
    return server;
}


export async function CallHelper(): Promise<any> {
    let myClass = new TestClass();
    try {
        let result = await myClass.action1(1654564654, "roicccccc");
        return result;
    }
    catch (error) {
        console.log(error);
    }


}