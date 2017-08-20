import { TestClass } from '../classes/TestClass';
import { logger, Server, MethodType, MethodulusConfig } from '../../index';
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
// process.env.CONFIG_PATH = "./tests/config";
// 
const redis_addr = '//192.168.99.100:32768';
const ports: any = []
for (let i = 0; i < 100; i++) {
    ports.push({ server: 8200 + i, client: 9200 + i });
}
let portsCounter = 0;
export function PortHelper() {
    return ports[portsCounter++];
}




export async function ServerHelper(port, servers, methodType: MethodType): Promise<any> {
    logger.info('in server helper');
    const child1 = childProcessDebug.spawn(process.argv[0], ['./tests/servers/dynamic.js'], {
        detached: false,
        cwd: path.resolve('./'),
        execArgv: ['--debug-brk=6001'],
        env: { PORT: port, servers: servers, MethodType: methodType }
    });

    logger.info('after spawn');

    child1.stdout.on('data', async (data) => {
        console.error(`child stddata:\n${data}`);
    });
    child1.stderr.on('data', (data) => {
        logger.error(`child stderr:\n${data}`);
        // console.error(`child stderr:\n${data}`);
    });

    child1.on('uncaughtException', function (code, signal) {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`);
    });


    child1.on('SIGTERM', function (code, signal) {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`);
    });

    child1.on('exit', function (code, signal) {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`);
    });

    return child1;


}


export async function ServerClassHelper(name, port, servers, methodType: MethodType) {
    const child1 = childProcessDebug.spawn(process.argv[0], ['./tests/servers/perclass/' + name + '.js'], {
        detached: true,
        cwd: path.resolve('./'), env: { PORT: port, servers: servers, MethodType: methodType }
    });
    child1.stdout.on('data', async (data) => {
        // console.error(`child stddata:\n${data}`);
    });
    child1.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    child1.on('exit', function (code, signal) {
        // console.log('child process exited with ' +
        //   `code ${code} and signal ${signal}`);
    });
    return child1;
}


export async function ClientHelper(classType, port, servers, methodType: MethodType, resolver) {
    let config = new MethodulusConfig(servers);

    if (servers) {
        servers.map(server => {
            config.run(server, { port: port, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });

        })
    }
    config.use(classType, methodType, resolver);
    //MethodulusConfig.config[classType.name] = methodType;
    //MethodulusConfig.servers = servers;
    let server = await new Server(port).configure(config).start();


    return server;
}


export async function CallHelper(): Promise<any> {
    let myClass = new TestClass();
    try {
        let value =  await myClass.action1(1654564654, "roicccccc");
        return value;
    }
    catch (error) {
        console.log(error);
    }


}