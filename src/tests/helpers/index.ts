import { TestClass } from '../classes/TestClass';
import { logger, Server, MethodType, MethodusConfig, MethodEvent, ServerType } from '../../index';
import * as path from 'path';
import * as childProcessDebug from 'child-process-debug';

const redis_addr = '//192.168.99.100:32768';
const ports: any = [];
for (let i = 0; i < 100; i++) {
    ports.push({ server: 8200 + i, client: 9200 + i });
}
let portsCounter = 0;
export function PortHelper() {
    return ports[portsCounter++];
}

export async function Wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

export async function ServerHelper(port, servers, methodType: MethodType,
    serverFile: string = './src/tests/servers/dynamic.js', instanceCount: number = 1): Promise<any> {
    const childArray = [];
    for (let i = 0; i < instanceCount; i++) {
        const child1 = childProcessDebug.spawn(process.argv[0], [serverFile], {
            detached: false,
            cwd: path.resolve('./'),
            execArgv: ['--debug-brk=6001'],
            env: {
                PORT: port, servers, MethodType: methodType,
                NODE_LOG_NAME: `server${i}.log`,
                NODE_LOG_IDENTIFIER: `server ${i}.`,
                NODE_LOG_LEVEL: 'trace',
            },
        });

        child1.stdout.on('data', async (data) => {
            console.error(`child stddata:\n${data}`);
        });
        child1.stderr.on('data', (data) => {
            logger.error(`child stderr:\n${data}`);

        });

        child1.on('uncaughtException', (code, signal) => {
            console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
        });

        child1.on('SIGTERM', (code, signal) => {
            console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
        });

        child1.on('exit', (code, signal) => {
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
            servers,
            MethodType: methodType,
            NODE_LOG_NAME: 'server_log.log',
            NODE_LOG_LEVEL: 'trace',
        },
    });
    child1.stdout.on('data', async (data) => {
        console.error(`child stddata:\n${data}`);
    });
    child1.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    });

    child1.on('exit', (code, signal) => {
        // console.log('child process exited with ' +
        //   `code ${code} and signal ${signal}`);
    });
    return child1;
}

export async function ClientHelper(classType, port, servers, methodType: MethodType, resolver) {
    process.env.logName = 'client';
    const config = new MethodusConfig();

    if (servers) {
        servers.map((serverConfig) => {
            config.run(serverConfig, {
                port, client: redis_addr,
                server: redis_addr, amqp: '127.0.0.1', userName: 'guest', password: '12' + '34',
            });
            config.use(classType, methodType, serverConfig, resolver);
        });
    }

    const server = await new Server(port).configure(config).start();
    return server;
}

export async function CallHelper(): Promise<any> {
    logger.error('callhelper');
    const myClass = new TestClass();
    try {
        logger.error('myClass.action1');
        const value = await myClass.action1(1654564654, 'roicccccc');
        logger.error('myClass.action1 result', value);
        return value;
    } catch (error) {
        logger.error('call to action1 errored', error);
        console.warn('call to action1 errored', error);
    }
}

export async function EventHelper(): Promise<any> {
    const methodEvent = new MethodEvent('update::FirstClassEvent', 'asdasdads', ServerType.RabbitMQ, 'event-bus');
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
            const methodEvent = new MethodEvent('update::FirstClassEvent', `this is message number ${eventCounter++}`,
                ServerType.RabbitMQ, 'event-bus');
            return methodEvent;
        }, 1000);
    });
}
