import * as path from 'path';
import injection from '@methodus/server/injection';
import { Express } from '@methodus/platform-express';
import { DescribeView } from './describeView';

export function init(config, pluginOptions: any = {}) {
    const describePath = pluginOptions.path || '/describe';
    config.run('express', {
        onStart: (instance) => {
            var options = {
                default: ['index.html'],
                //dotfiles: 'ignore',
                etag: true,
                extensions: ['htm',
                    'ico',
                    'html',
                    'gif',
                    'ogg',
                    'mp3',
                    'png',
                    'wav',
                    'js',
                    'js.map',
                    'css',
                    'json',
                    'cur',
                    'woff',
                    'eot',
                    'svg',
                    'ttf'],
                maxAge: '1d',
                redirect: false,
                setHeaders: function (res) {
                    res.set('x-timestamp', Date.now())
                }
            }

            const clientDir = path.resolve(path.join(__dirname, '..', 'public'));
            instance.use(`${describePath}/`, Express.static(clientDir, options))

            instance.get(`${describePath}`, function (req, res) { res.redirect(`${describePath}/`); });
            const methodClientPath = path.join(process.cwd(), 'node_modules', '@methodus/platform-web', 'dist');
            instance.use(`${describePath}/scripts/`, Express.static(methodClientPath, options));

        }
    });
    config.use(injection.Injector.get(DescribeView), 'Local', Express);
    return config;
}