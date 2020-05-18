import mockAxios from 'jest-mock-axios';
import { send, Verbs } from '../index';

const TESTBASE = 'https://www.google.com';

describe('Test the external send function', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    it('Scrape a webpage', () => {
        const methodus = {
            route: '/search',
            verb: Verbs.Get,
            type: 'http',
            _auth: { type: 0 },
            resolver: () => TESTBASE,
        };

        send(
            methodus,
            ['congress', 'application/html'],
            [
                { index: 0, name: 'q', from: 'query' },
                { index: 1, name: 'Content-Type', from: 'headers' },
            ]
        )
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios.request).toHaveBeenCalledWith({
            headers: { 'Content-Type': 'application/html' },
            method: 'get',
            timeout: 300000,            
            url: `${TESTBASE}/search?q=congress`,
        });
    });


});
