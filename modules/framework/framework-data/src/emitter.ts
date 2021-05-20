import { EventEmitter } from 'events';
import { DataChangeEvent } from './changes';

export class DataEmitter extends EventEmitter {
    changes(topic, changeData: DataChangeEvent) {
        this.emit(topic, changeData);
    }
}

export const EventDataEmitter = new DataEmitter();