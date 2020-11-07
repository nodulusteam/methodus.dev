import { Injectable } from '@angular/core';


@Injectable()
export class TestOutputService {
    constructor() {
    }

    _subscriptions = {};
    options: any = {};
    request: any;
    url: string;
    expectations = [];

    public async expect(expectation) {
        this.expectations.push(expectation);

    }

    public async clear() {

    }
}
