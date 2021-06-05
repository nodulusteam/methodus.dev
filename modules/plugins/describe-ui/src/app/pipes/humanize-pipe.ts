import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'humanize' })
export class HumanizePipe implements PipeTransform {

    transform(value: any) {
        if (value === '') {
            return value;
        }

        value = value.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][^A-Z])/g, '$1 $2');
        value = value[0].toUpperCase() + value.slice(1);
        return value;
    }
}
