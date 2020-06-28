import { Cache, Throttle } from '../';
import { EventEmitter } from 'events';

(global as any).TESTHITS = {};
const TESTHITS = (global as any).TESTHITS;
export class TestClass {
    public emitter = new EventEmitter();



    @Throttle(3)
    public async shouldTrottle(key1: string, key2: string, key3: number): Promise<any> {
        await this.emitter.emit('hit', 'shouldTrottle');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`${key1}-${key2}-${key3}`);
            }, 100);
        });
    }

    @Throttle(1)
    @Cache(30)
    public async shouldCache(key1: string, key2: string, key3: number): Promise<any> {
        await this.emitter.emit('hit', 'shouldCache');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`${key1}-${key2}-${key3}`);
            }, 100);
        });
    }
}