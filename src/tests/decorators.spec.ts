import { AsyncTest, TestFixture, Timeout } from 'alsatian';
process.env.test = 'true';

import { Xserver } from './decorators.support';

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
