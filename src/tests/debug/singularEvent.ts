process.env.CONFIG_PATH = './tests/config';
process.env.methodus_name = 'event-caller';

import { TestClass } from '../classes/TestClass';
import { ServerType, MethodType } from '../../index';
import { ServerHelper, EventLoop, ClientHelper, PortHelper } from '../helpers';
const serverType = ServerType.RabbitMQ;
const methodType = MethodType.MQ;

const ports = PortHelper();
const staticResolve = 'http://127.0.0.1:' + ports.server;
ServerHelper(ports.server, serverType, MethodType.Local, './src/tests/servers/singleEvent.js', 4).then((servers) => {
    wait(1000 * 1).then(() => {
        ClientHelper(TestClass, ports.client, [serverType], methodType, staticResolve).then((client) => {
            EventLoop().then((eventResult) => {
                setTimeout(
                    () => {
                        if (servers) {
                            servers.map((s) => s.kill());
                        }

                        if (client) {
                            client.kill();
                        }
                    }, 20 * 1000);
            });
        });
    }).catch((error) => {
        console.log(error);
    });
});

async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
