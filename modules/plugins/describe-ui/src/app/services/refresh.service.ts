import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class RefreshService {
    constructor() {
    }
    _subscriptions = {};
    refresh(name, value) {
        if (this._subscriptions[name]) {
            this._subscriptions[name].emit(value);
        }
    }

    subscription(name) {
        this._subscriptions[name] = new EventEmitter<any>();
        return this._subscriptions[name];
    }
}
