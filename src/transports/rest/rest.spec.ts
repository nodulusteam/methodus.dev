import { RestResponse } from './rest';
import { MethodResult, MethodError } from '../../response';
import * as streams from 'memory-streams';

const RequestMock = {
    json() {
        return this;
    },
    send() {
        return this;
    },
    end() {
        return this;
    },
    status() {
        return this;
    },
    set() {
        return this;
    },
    setHeader() {
        return this;
    },
    on(evnetName: string) {
        return this;
    },
    once(evnetName: string) {
        return this;
    },
    emit(evnetName: string) {
        return this;
    },
    write() {
        return this;
    }

}

describe('Rest', () => {
    it('test Rest class', async () => {
        const response = new RestResponse([RequestMock, RequestMock], new MethodResult({}), {});
        expect(response).not.toBeNull();
    });

    it('test Rest stream', async () => {
        const readStream = new streams.ReadableStream('Hello World\n');
        // const responseStream = new streams.WritableStream();
        const mResult = new MethodResult(readStream);
        mResult.headers = { 'Content-Type': 'application/json' };
        const response = new RestResponse([readStream, RequestMock], mResult, {});
        expect(response).not.toBeNull();
    });

    it('test Rest buffer', async () => {
        const mResult = new MethodResult(Buffer.from('BBBBBHHHHHYUJULJSALDKJSALKDJASLKDJLIWEUOQWRIUOIWEUSALFHSJLASD'));
        mResult.headers = { 'Content-Type': 'application/json' };
        const response = new RestResponse([RequestMock, RequestMock], mResult, {});
        expect(response).not.toBeNull();
    });

    it('test Rest Zero', async () => {
        const response = new RestResponse([null, RequestMock], new MethodResult(0), {});
        expect(response).not.toBeNull();
    });

    it('test Rest class', async () => {
        const payload = new MethodResult({}, 10, 2);
        payload.setHeader('expire', new Date().toISOString());
        payload.headers = { 'Content-Type': 'application/json' };
        delete payload.statusCode;
        const response = new RestResponse([null, RequestMock], payload, {
            'Content-Type': 'application/json'
        });

        expect(response).not.toBeNull();
    });

    it('test error', async () => {
        try {
            new RestResponse([null, RequestMock], null, {});
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });

    it('test Error', async () => {

        const response = new RestResponse([null, RequestMock], new MethodError('error', 503), {});

        expect(response).not.toBeNull();
    });

});

