import { Changes } from './';

export class DataChange {
    value: Changes;
    context: any;
    constructor(context?: any) {
        this.value = new Changes();
        if(context)
        {
            this.context = context;
        }
            
    }
}