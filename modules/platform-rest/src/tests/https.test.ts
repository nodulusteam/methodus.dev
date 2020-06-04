import { WebRequest } from '../web-request';
import { Verbs } from '../interfaces';
import { AuthType } from '@methodus/server';
process.env.NEW_RELIC_LICENSE_KEY = 'eee6db8b83818844660d7f86156b8efcb810NRAL';
process.env.NEW_RELIC_APP_NAME = 'Warden Hub';
process.env.NEW_RELIC_LOG_LEVEL = 'info';

(async () => {
    const methodus = {
        route: '/log/v1',
        verb: Verbs.Post,
        type: 'http',
        _auth: {
            type: AuthType.None,
        },
        resolver: () => 'https://log-api.newrelic.com',
    };

    const request = new WebRequest();
    const messageObject = {
        timestamp: new Date().getTime(),
        message: 'some-message',
        service: 'hub',
        hostname: 'hub',
    };

    const result = await request.sendRequest(
        methodus,
        'https://log-api.newrelic.com:443/log/v1',
        [process.env.NEW_RELIC_LICENSE_KEY, messageObject],
        [
            { from: 'headers', index: 0, name: 'X-License-Key' },
            { from: 'body', index: 1 },
        ]
    );
    console.log(result.status);
})();
