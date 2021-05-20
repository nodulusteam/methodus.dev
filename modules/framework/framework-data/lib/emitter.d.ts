/// <reference types="node" />
import { EventEmitter } from 'events';
import { DataChangeEvent } from './changes';
export declare class DataEmitter extends EventEmitter {
    changes(topic: any, changeData: DataChangeEvent): void;
}
export declare const EventDataEmitter: DataEmitter;
