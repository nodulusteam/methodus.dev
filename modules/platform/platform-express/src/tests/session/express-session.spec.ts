import { ExpressTestServer } from './express.server.session';
import request from 'supertest';
describe('Test Express session configuration', () => {
    let server: any;
    let express: any;
    beforeAll(async () => {
        express = await new Promise(async (resolve, reject) => {
            server = new ExpressTestServer();
            server.on('ready', () => {
                resolve(server?.server._app.express._app);
            });
        });
    });

    afterAll(async () => {
        server.kill();
    });

    it('create', async () => {
        return request(express).post('/api/player')
            .send({ some: 'user-data' })
            .expect(200);
    });
});
