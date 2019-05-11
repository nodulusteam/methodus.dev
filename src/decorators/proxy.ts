import { MethodType } from '../interfaces';
import { fp } from '../fp';
import * as path from 'path';
import { logger } from '../log';

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

                logger.info(this, `trying to load ${localLoadPath} locally`);
                try {
                    try {
                        const localClass = require(localLoadPath);
                        logger.info(this, `succesfully loaded ${localLoadPath} locally`);
                        return localClass[className];
                    } catch (error) {
                        try {
                            logger.info(this, `will try other options ${localClassPath} locally`);
                            const localClass = require(path.join(process.cwd(), startPathForLoad, localClassPath));
                            logger.info(this, `succesfully loaded ${localClass} locally`);
                            return localClass[className];
                        } catch (error) {
                            logger.info(this, `will try last option ${localClassPath} locally`);
                            const localClass = require(path.join(process.cwd(),
                                'node_modules',
                                startPathForLoad, localClassPath));
                            logger.info(this, `succesfully loaded ${localClass} locally`);
                            return localClass[className];
                        }
                    }
                } catch (ex) {
                    logger.error(ex);
                    throw (ex);
                }
            }
            logger.info(this, 'returned the contract it self for' + className);
            return target;
        };
    }
}
