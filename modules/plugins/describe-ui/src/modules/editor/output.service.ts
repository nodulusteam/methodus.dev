import { Injectable } from '@angular/core';


@Injectable()
export class OutputService {
    constructor() {
    }

    _subscriptions = {};
    options: any = {};
    request: any;
    url: string;

    public async log(message) {
        const output: any = document.getElementById('testOutput');
        output.innerHTML += message + '<br />';
        output.scrollTop = output.scrollHeight;
    }

    public async clear() {
        const output: any = document.getElementById('testOutput');
        output.innerHTML = '';
    }
}
