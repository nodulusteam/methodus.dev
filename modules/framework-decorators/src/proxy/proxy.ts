import { Logger, fp, MethodType, ClassRef } from '@methodus/framework-commons';
import * as path from 'path';
import { ClassContainer } from '@methodus/framework-injection';
const logger = new Logger('ProxyClass');

export class Proxy {
    public static ProxyClass(
        packageName: string,
        className: string,
        localClassPath: string
    ) {
        return (target: ClassRef) => {
            const methodus = fp.maybeMethodus(target)[className];
            let classTransport = MethodType.Http;
            const cls = ClassContainer.get(className);
            if (cls) {
                classTransport = MethodType.Local;
            }

            if (!methodus) {
                throw new Error(
                    `error finding configuration ${packageName} ${className},${localClassPath}`
                );
            }

            if (!classTransport || classTransport === MethodType.Local) {
                const startPathForLoad = packageName;
                const localLoadPath = path
                    .join(startPathForLoad, localClassPath)
                    .replace(/\\/g, '/');

                logger.info(`trying to load ${localLoadPath} locally`);

                try {
                    const localClass = require(localLoadPath);
                    logger.info(`succesfully loaded ${localLoadPath} locally`);
                    return localClass[className];
                } catch (error) {
                    try {
                        logger.info(
                            `will try other options ${localClassPath} locally`
                        );
                        const localClass = require(path.join(
                            process.cwd(),
                            startPathForLoad,
                            localClassPath
                        ));
                        logger.info(`succesfully loaded ${localClass} locally`);
                        return localClass[className];
                    } catch (exception) {
                        logger.info(
                            `will try last option ${localClassPath} locally`
                        );
                        const localClass = require(path.join(
                            process.cwd(),
                            'node_modules',
                            startPathForLoad,
                            localClassPath
                        ));
                        logger.info(`succesfully loaded ${localClass} locally`);
                        return localClass[className];
                    }
                }
            }
            logger.info(`using the contract class for ${className}`);
            return target;
        };
    }
}
