import { RestResponse } from "./rest";
import { MethodResult, MethodError } from '../../response';


const RequestMock = {
    json() {

    },
    send() {

    },
    status() {

    },
    set() {

    },
    setHeader() {

    }

}

describe('Rest', () => {
    it('test Rest class', async () => {

        const response = new RestResponse([null, RequestMock], new MethodResult({}), {});

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

