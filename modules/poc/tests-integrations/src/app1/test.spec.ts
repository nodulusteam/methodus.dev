import { WebRequest } from '@methodus/platform-rest';
import { AppModule } from './app-module';

//get express instance
describe('test', () => {
    let app: AppModule;
    beforeAll(() => {
        return new Promise((resolve) => {
            app = new AppModule().on('ready', async () => {
                resolve();
            });
        });

    });

    afterAll(() => {
        app.kill();
    })
    //const app = appModuasyncle.server?.app;
    test('test', async () => {
        const request = new WebRequest();
        const result = await request.sendRequest({
            _auth: {
                type: 0
            },
            resolver: 'http://localhost:3060',
            route: '/user',
            verb: 'Get'
        },
            'http://localhost:3060/user', [], []);
        expect(result.data).toBeDefined();


        // .expect('Content-Type', /json/)
        // .expect('Content-Length', '15')
        // .expect(200)
        // .end((err: any, res: any) => {
        //     if (err) throw err;
        // });
    });
});