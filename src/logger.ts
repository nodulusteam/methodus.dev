const Log = require('log');
const fs = require('fs');




const log = new Log('debug', fs.createWriteStream('./logs/my.log', { flags: 'a' }))

export class console {
    public static log(...args) {
        log.info(process.env.methodulus_name, ...args);
    }
    public static info(...args) {
        log.info(process.env.methodulus_name, ...args);
    }
    public static debug(...args) {
        log.debug(process.env.methodulus_name,...args);
    }


}