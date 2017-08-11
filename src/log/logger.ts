const Log = require('log');
const fs = require('fs'), path = require('path'), mkdirp = require('mkdirp');
const debug = require('debug')('methodulus')
var log;
var log_dir_file = '';

if (process.env.NODE_LOG_DIR) {
    log_dir_file = path.normalize(process.env.NODE_LOG_DIR);
}
else
    log_dir_file = './logs';



if (!fs.existsSync(log_dir_file)) {
    // Create the directory if it does not exist
    mkdirp(log_dir_file, function (err) {
        if (err) console.error(err)
        else {

        }
    });
}


log = new Log('debug', fs.createWriteStream(path.join(log_dir_file, 'methodulus.log'), { flags: 'a' }))
function arg(item: any) {

    let arr: any = [];
    if (Array.isArray(item))
        arr = arr.concat(item);
    else
        arr.push(item);


    return arr.map(singleArg => {
        if (singleArg)
            try {
                if (typeof singleArg === 'function')
                    return `func ${singleArg.name}`;
                // if(singleArg.stack)
                //     singleArg.serializedstack =  JSON.stringify(singleArg.stack);

                let a = JSON.stringify(singleArg);
                if (a)
                    return a.replace(/\r\n/g, '');

            } catch (error) {
                return '[circular]';
            }

    }).join(',')


}

export class logger {
    public static log(...args) {
        debug(...args);
        let logargs = args.map(item => arg(item));
        log.info(...logargs);
    }
    public static info(...args) {
        let logargs = args.map(item => arg(item));
        debug(...args);
        log.info(...logargs);
    }
    public static debug(...args) {
        let logargs = args.map(item => arg(item));
        debug(...args);
        log.debug(...logargs);
    }
    public static error(...args) {
        let logargs = args.map(item => arg(item));
        debug(...args);
        log.error(...logargs);
    }

}
