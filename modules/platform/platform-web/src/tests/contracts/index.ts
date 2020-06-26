import {TestContract} from './simple.contract';
import { ExtendTestContract } from './extend.contract';
import { SocketController } from './socket.contract';
export const dd = new TestContract();
export const ee = new ExtendTestContract(dd);
export const ss = new SocketController();
 
export * from './simple.contract';
export * from './extend.contract';
export * from './socket.contract';