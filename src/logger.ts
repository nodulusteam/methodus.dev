const Log = require('log');
const fs = require('fs');
const debug = require('debug')('methodulus');



const log = new Log('debug', fs.createWriteStream('./logs/methodulus.log', { flags: 'a' }))

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


}