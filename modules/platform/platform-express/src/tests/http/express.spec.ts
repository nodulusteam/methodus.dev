// import injection from '@methodus/server/injection';
// import { TestTarget } from '../controllers/target.test';
import { ExpressTestServer } from './express.server';
import request from 'supertest';

describe('Test Express configuration', () => {
    // const testTarget = injection.Injector.resolve<TestTarget>('TestTarget');
    let server: ExpressTestServer;
    let express: any;
    beforeAll(async () => {
        await new Promise(async (resolve, reject) => {
            server = new ExpressTestServer();
            server.on('ready', () => {
                express = server?.server?._app.express._app;
                resolve({});
            });
        });
    });

    afterAll(async () => {
        server.kill();
    });

    it('list', async () => {
        return request(express).get('/api/player').
            set('auth', 'value').
            query({ order_by: 5 }).
            expect((response: any) => {
                expect(response.body.orderBy).toEqual('5');
                expect(response.body.auth).toEqual('value');
                expect(response.body).toBeDefined();
            });
    });

    it('listDefaults', async () => {
        return request(express).get('/api/playerdata/defaults').
            send({ somejson: 'value' }).
            set('auth', 'value').
            query({ order_by: 5 }).
            expect((response: any) => {
                expect(response.body).toEqual([1, 2, 3, 4, 5]);
                expect(response.body).toBeDefined();
            });
    });


    // @decorators.MethodPipe(Verbs.Post, '/api/player')
    // public async create(@Mapping.Files('files') files: any,
    //     @Mapping.Cookies('cookies') cookies: any, @Mapping.Body('name') name: string) {
    //     return new MethodResult({ name });

    it('create', async () => {
        return request(express).post('/api/player').
            send({ name: 'some-name' }).
            expect((response: any) => {
                expect(response.body.name).toEqual('some-name');
                expect(response.body).toBeDefined();
            });
    });

    // it('read', async () => {
    //     try {
    //         await testTarget.read(511798);
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //     }
    // });

    // it('getByField', async () => {
    //     try {
    //         await testTarget.getByField('field', 511798);
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //     }
    // });

    // it('delete', async () => {
    //     const result = await testTarget.delete();
    //     expect(result).toBeDefined();
    //     const result2 = await testTarget.delete2();
    //     expect(result2).toBeDefined();
    // });


    // it('delete2', async () => {
    //     const result2 = await testTarget.delete2();
    //     expect(result2).toBeDefined();
    // });

    // it('headers', async () => {
    //     const result2 = await testTarget.headers({ applicaiotn: 'json' });
    //     expect(result2).toBeDefined();
    // });

    // it('buffer1', async () => {
    //     const result2 = await testTarget.buffer1();
    //     expect(result2).toBeDefined();
    // });
});
