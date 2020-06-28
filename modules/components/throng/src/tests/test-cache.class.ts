import { Cache, Throttle } from '../';
import { EventEmitter } from 'events';

(global as any).TESTHITS = {};

export class TestCacheClass {
    public emitter = new EventEmitter();



    @Cache(10) //5 seconds cache  
    public async shouldCacheWithDefaults(key1: string, key2: string, key3: number, useCache: boolean = true): Promise<any> {
        await this.emitter.emit('hit', 'shouldCacheWithDefaults');
        return new Promise((resolve) => {
            setTimeout(() => {
                //console.log(`shouldCache::${key1}-${key2}-${key3}`);
                resolve(`${key1}-${key2}-${key3}`);
            }, 100);
        });
    }



    @Cache(10, 10, (args) => {
        return args.slice(0, args.length - 1).join('-');
    }, (args, result) => {
        return result;
    }, (args) => {
        return args[3] !== false;
    }) //5 seconds cache  
    public async shouldCache(key1: string, key2: string, key3: number, useCache: boolean = true): Promise<any> {
        await this.emitter.emit('hit', 'shouldCache');
        return new Promise((resolve) => {
            setTimeout(() => {
                //console.log(`shouldCache::${key1}-${key2}-${key3}`);
                resolve(`${key1}-${key2}-${key3}`);
            }, 100);
        });
    }



    @Cache(10, 10, 2, (data) => {
        return false;
    }, (args) => {
        return args[3] !== false;
    }) //10 seconds cache
    public async shouldNotCache(key1: string, key2: string, key3: number, useCache: boolean = true): Promise<any> {
        await this.emitter.emit('hit', 'shouldNotCache');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log(`shouldNotCache::${key1}-${key2}-${key3}`);

                reject(new Error(`${key1}-${key2}-${key3}`));
            }, 1000 * 5);
        });
    }


    @Cache(10, 10, 2, (data) => {
        return false;
    }, (args) => {
        return args[3] !== false;
    }) //10 seconds cache
    public async shouldSeekNotCache(key1: string, key2: string, key3: number, useCache: boolean = true): Promise<any> {
        await this.emitter.emit('hit', 'shouldSeekNotCache');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log(`shouldNotCache::${key1}-${key2}-${key3}`);

                reject(new Error(`${key1}-${key2}-${key3}`));
            }, 1000 * 5);
        });
    }


}