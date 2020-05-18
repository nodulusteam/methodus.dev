
import { send } from '../';
import { Verbs } from '../interfaces';
const TESTBASE = 'https://www.google.com';
(async () => {

    const methodus = {
        route: '/search',
        verb: Verbs.Get,
        type: 'http',
        _auth: { type: 0 },
        resolver: () => TESTBASE,
    };

    const result = await send(
        methodus,
        ['congress', 'application/html'],
        [
            { index: 0, name: 'q', from: 'query' },
            { index: 1, name: 'Content-Type', from: 'headers' },
        ]
    )
    debugger;
    return result;

})();
