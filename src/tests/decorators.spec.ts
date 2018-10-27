import { Proxy as MethodusProxy } from '../decorators/proxy';

import {
    MethodConfig,
    ServerConfiguration, PluginConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType, Param, MethodResult, Method, Verbs,
} from '../';

import { FirstClass } from './classes/FirstClass';
import { SecondClass } from './classes/SecondClass';


const  path = require('path');

import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from 'alsatian';

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6695 })
//@PluginConfiguration(path.join(__dirname, 'static'), { path: '/client' })
@ClientConfiguration(FirstClass, MethodType.Local, ServerType.Express)
@ClientConfiguration(SecondClass, MethodType.Local, ServerType.Express)
class Xserver extends ConfiguredServer {

}

@MethodusProxy.ProxyClass('FirstClass', '../src/tests/classes/FirstClass')
@MethodConfig('testClass')
export class xProxyClass {
    @Method(Verbs.Get, '/posts/:id/:name')
    public action1(@Param('id') id: number, @Param('name') name: string) {
        let result = new MethodResult({ value: 'FirstClass from contract', id: id, name: name, add: 'added' });
        return result;
    }

}

@TestFixture('Test all decorators')
export class EventsServers {
    @AsyncTest('testing the event communication system')

    @Timeout(50000)
    public async serverTest(serverType, methodType) {
        return new Promise(async (resolve, reject) => {
            resolve(new Xserver());
        });
    }


}


async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}





