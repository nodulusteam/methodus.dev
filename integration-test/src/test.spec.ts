import { AppModule } from './app-module';
const superagent = require('superagent');
const appModule = new AppModule();
//get express instance
describe('test', () => {

    const app = appModule.server?.app;
   
    test('test', () => {

        superagent.get('/user')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200)
            .end((err: any, res: any) => {
                if (err) throw err;
            });

    });
});