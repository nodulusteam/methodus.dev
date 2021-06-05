import * as https from 'https';
import * as http from 'http';
export class ServerCreator {

    createHttp(app: any,) {
        return http.createServer(app);
    }

    createHttps(app: any, options: Record<string, string>) {
        return https.createServer({
            cert: options.cert,
            key: options.key,
            passphrase: options.passphrase,
        }, app);

    }
}


