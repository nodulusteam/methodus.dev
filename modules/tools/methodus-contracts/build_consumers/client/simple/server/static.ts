import * as path from 'path';
import * as express from 'express';
export function init(config: any, pluginOptions: any) {
    config.run('express', {
        onStart: (instance: any) => {
            const options = {
                etag: true,
                extensions: ['woff', 'woff2', 'ttf', 'eot'],
                maxAge: '1d',
                redirect: false,
                setHeaders: (res: any) => {
                    res.set('x-timestamp', Date.now());
                },
            };
            const clientDir = path.resolve(path.join(__dirname, '../dist/'));
            instance.use(pluginOptions.path, express.static(clientDir, options));
        },
    });
    return config;
}
