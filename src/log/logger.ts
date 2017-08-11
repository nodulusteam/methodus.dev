const Log = require('log');
const fs = require('fs'), path = require('path'), mkdirp = require('mkdirp');
const debug = require('debug')('methodulus')
var log;
var log_dir_file = '';

const logrotate = require('logrotator');

// use the global rotator 
const rotator = logrotate.rotator;

// or create a new instance 
// var rotator = logrotate.create(); 



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


log = new Log('debug', fs.createWriteStream(path.join(log_dir_file, 'methodulus.log'), { flags: 'a' }));


// check file rotation every 5 minutes, and rotate the file if its size exceeds 10 mb. 
// keep only 3 rotated files and compress (gzip) them. 
rotator.register(path.join(log_dir_file, 'methodulus.log'), {schedule: '5m', size: '1m', compress: true, count: 3});

rotator.on('error', function(err) {
 console.log('oops, an error occured!');
});

// 'rotate' event is invoked whenever a registered file gets rotated 
rotator.on('rotate', function(file) {
 console.log('file ' + file + ' was rotated!');
});



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
