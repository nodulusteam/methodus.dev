import { ClassContainer, MethodType } from '../';
import { ConfigHelper } from './configuration';
import { AutoLogger, Log, LogClass, LogLevel } from 'logelas';
import { fp } from '../fp';
import * as path from 'path';


@LogClass(AutoLogger)
export class Proxy {

    static ProxyClass(className: string, localClassPath) {
        return (target: any) => {

            var methodus = fp.maybeMethodus(target);
            let classTransport = MethodType.Local;
            let classConfig;
            if (!methodus) {
                throw (new Error(`error finding configuration ${className},${localClassPath}`));
            }

            if (methodus) {
                let configurationKey = methodus.name.replace('@tmla-tiles/', '@tmla-contracts/');
                classConfig = ConfigHelper.get(configurationKey);
                if(classConfig){
                    classTransport = classConfig.transport;
                }                    
            }



            if (!classTransport || classTransport === MethodType.Local) {
                let startPathForLoad = methodus.name;
                if (methodus.name.indexOf('@') < 0) {
                    startPathForLoad = path.join(process.cwd(), methodus.name);
                }
                const localLoadPath = path.join(startPathForLoad, localClassPath)
                AutoLogger.info(this, `trying to load ${localLoadPath} locally`);
                try {
                    try {
                        let localClass = require(localLoadPath);
                        AutoLogger.info(this, `succesfully loaded ${localLoadPath} locally`);
                        return localClass[className];
                    } catch (error) {
                        try {
                            AutoLogger.info(this, `will try other options ${localClassPath} locally`);
                            let localClass = require(path.join(process.cwd(), localClassPath));
                            AutoLogger.info(this, `succesfully loaded ${localClass} locally`);
                            return localClass[className];
                        } catch (error) {
                            AutoLogger.info(this, `will try last option ${localClassPath} locally`);
                            let localClass = require(path.join(process.cwd(), 'node_modules', methodus.name, localClassPath));
                            AutoLogger.info(this, `succesfully loaded ${localClass} locally`);
                            return localClass[className];
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                    throw (ex);
                    // AutoLogger.error(this, `failed to  to load ${localLoadPath} locally`, ex);
                    // return target;
                }
            }
            AutoLogger.info(this, 'returned the contract it self for' + className)
            return target;
        }
    }
}

