import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keys'
})
export class KeysPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const arr = Object.keys(value);
        arr.sort((a, b) => {
            return a > b ? 1 : -1;
        });
        return arr;
    }
}
