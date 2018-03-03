import { TestClass } from '../classes/TestClass';
import { logger, Server, MethodType, MethodusConfig, MethodEvent, ServerType } from '../../index';
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
// process.env.CONFIG_PATH = './tests/config';
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

export async function Wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}


export async function ServerHelper(port, servers, methodType: MethodType, serverFile: string = './src/tests/servers/dynamic.js', instanceCount: number = 1): Promise<any> {
    const childArray = [];
    for (var i = 0; i < instanceCount; i++) {
        const child1 = childProcessDebug.spawn(process.argv[0], [serverFile], {
            detached: false,
            cwd: path.resolve('./'),
            execArgv: ['--debug-brk=6001'],
            env: {
                PORT: port, servers: servers, MethodType: methodType,
                NODE_LOG_NAME: `server${i}.log`,
                NODE_LOG_IDENTIFIER: `server ${i}.`,
                NODE_LOG_LEVEL: 'trace'
            }
        });



        child1.stdout.on('data', async (data) => {
            console.error(`child stddata:\n${data}`);
        });
        child1.stderr.on('data', (data) => {
            logger.error(`child stderr:\n${data}`);

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
        childArray.push(child1);
    }

    return childArray;

}


export async function ServerClassHelper(name, port, servers, methodType: MethodType) {
    const child1 = childProcessDebug.spawn(process.argv[0], ['./src/tests/servers/perclass/' + name + '.js'], {
        detached: true,
        cwd: path.resolve('./'),
        env: {
            PORT: port,
            servers: servers,
            MethodType: methodType,
            NODE_LOG_NAME: 'server_log.log',
            NODE_LOG_LEVEL: 'trace'
        }
    });
    child1.stdout.on('data', async (data) => {
         console.error(`child stddata:\n${data}`);
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
    process.env.logName = 'client';
    let config = new MethodusConfig();

    if (servers) {
        servers.map(server => {
            config.run(server, { port: port, client: redis_addr, server: redis_addr, amqp: '127.0.0.1', userName: 'tmla', password: '1234' });
            config.use(classType, methodType, server, resolver);
        })
    }


    let server = await new Server(port).configure(config).start();


    return server;
}


export async function CallHelper(): Promise<any> {
    let myClass = new TestClass();
    try {
        let value = await myClass.action1(1654564654, 'roicccccc');
        return value;
    }
    catch (error) {
        console.warn('call to action1 errored', error);
    }
}


export async function EventHelper(): Promise<any> {
    let methodEvent = await new MethodEvent('update::FirstClassEvent', 'asdasdads', ServerType.RabbitMQ, 'event-bus');
    return methodEvent;
}


export async function EventLoop(): Promise<any> {
    return new Promise((resolve, reject) => {
        let eventCounter = 1;
        const interval = setInterval(async () => {
            if (eventCounter > 4) {
                clearInterval(interval);

                resolve();
            }
            let methodEvent = await new MethodEvent('update::FirstClassEvent', `this is message number ${eventCounter++}`, ServerType.RabbitMQ, 'event-bus');
            return methodEvent;
        }, 1000)

    })

}
