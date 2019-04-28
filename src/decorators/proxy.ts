import { MethodType } from '../interfaces';
import { fp } from '../fp';
const debug = require('debug')('methodus');
import * as path from 'path';

export class Proxy {
    public static ProxyClass(packageName: string, className: string, localClassPath: any) {
        return (target: any) => {
            const methodus = fp.maybeMethodus(target)[className];
            const classTransport = MethodType.Local;

            if (!methodus) {
                throw (new Error(`error finding configuration ${packageName} ${className},${localClassPath}`));
            }

            if (!classTransport || classTransport === MethodType.Local) {
                const startPathForLoad = packageName;
                const localLoadPath = path.join(startPathForLoad, localClassPath).replace(/\\/g, '/');
                // if (methodus.name.indexOf('@') < 0) {
                //     startPathForLoad = path.join(process.cwd(), methodus.name);
                // }
                debug(this, `trying to load ${localLoadPath} locally`);
                try {
                    try {
                        const localClass = require(localLoadPath);
                        debug(this, `succesfully loaded ${localLoadPath} locally`);
                        return localClass[className];
                    } catch (error) {
                        try {
                            debug(this, `will try other options ${localClassPath} locally`);
                            const localClass = require(path.join(process.cwd(), startPathForLoad, localClassPath));
                            debug(this, `succesfully loaded ${localClass} locally`);
                            return localClass[className];
                        } catch (error) {
                            debug(this, `will try last option ${localClassPath} locally`);
                            const localClass = require(path.join(process.cwd(),
                                'node_modules',
                                startPathForLoad, localClassPath));
                            debug(this, `succesfully loaded ${localClass} locally`);
                            return localClass[className];
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                    throw (ex);
                }
            }
            debug(this, 'returned the contract it self for' + className);
            return target;
        };
    }
}
