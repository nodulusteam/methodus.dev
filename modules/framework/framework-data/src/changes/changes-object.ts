import { ChangeDelta } from './';

export class Changes {     
    _id: string;
    id: string;
    new_value: ChangeDelta;
    old_value: ChangeDelta;
    constructor() {
        this.new_value = new ChangeDelta();
        this.old_value = new ChangeDelta();
    }
}