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

export class logger {
    public static log(...args) {
        debug(...args);
        log.info(process.env.methodulus_name, ...args);
    }
    public static info(...args) {
        debug(...args);
        log.info(process.env.methodulus_name, ...args);
    }
    public static debug(...args) {
        debug(...args);
        log.debug(process.env.methodulus_name, ...args);
    }
    public static error(...args) {
        debug(...args);
        log.error(process.env.methodulus_name, ...args);
    }

}
