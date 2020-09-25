import commons, { ClassRef } from '@methodus/framework-commons';
// import injection from '@methodus/framework-injection';
// import * as path from 'path';

export class Proxy {
    public static ProxyClass(
        packageName: string,
        className: string,
        localClassPath: string
    ) {
        return (target: ClassRef) => {
            const methodus = commons.util.maybeMethodus(target)[className];
            // let classTransport = MethodType.Http;
            // const cls = injection.ClassContainer.get(className);
            // debugger;
            // if (cls) {
            //     classTransport = MethodType.Local;
            // }

            if (!methodus) {
                throw new Error(
                    `error finding configuration ${packageName} ${className},${localClassPath}`
                );
            }

            // if ( classTransport === MethodType.Local) {
            //     const startPathForLoad = packageName;
            //     const localLoadPath = path
            //         .join(startPathForLoad, localClassPath)
            //         .replace(/\\/g, '/');

            //     commons.logger.info(`trying to load ${localLoadPath} locally`);

            //     try {
            //         const localClass = require(localLoadPath);
            //         commons.logger.info(
            //             `succesfully loaded ${localLoadPath} locally`
            //         );
            //         return localClass[className];
            //     } catch (error) {
            //         try {
            //             commons.logger.info(
            //                 `will try other options ${localClassPath} locally`
            //             );
            //             const localClass = require(path.join(
            //                 process.cwd(),
            //                 startPathForLoad,
            //                 localClassPath
            //             ));
            //             commons.logger.info(
            //                 `succesfully loaded ${localClass} locally`
            //             );
            //             return localClass[className];
            //         } catch (exception) {
            //             commons.logger.info(
            //                 `will try last option ${localClassPath} locally`
            //             );
            //             const localClass = require(path.join(
            //                 process.cwd(),
            //                 'node_modules',
            //                 startPathForLoad,
            //                 localClassPath
            //             ));
            //             commons.logger.info(
            //                 `succesfully loaded ${localClass} locally`
            //             );
            //             return localClass[className];
            //         }
            //     }
            // }
            commons.logger.info(`using the contract class for ${className}`);
            return target;
        };
    }
}
