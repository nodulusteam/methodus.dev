import { WebRequest } from '@methodus/platform-rest';
import { AppModule } from './app-module';

new AppModule().on('ready', async () => {
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
    return result;
});