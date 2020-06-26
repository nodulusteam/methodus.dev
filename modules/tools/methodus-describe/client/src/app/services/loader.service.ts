import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderService {
  constructor() {

  }

  waiting = [];
  subs = {};
  setBusy(name = 'main') {
    if (!this.subs[name]) {
      this.waiting.push({ name, state: true });
    } else {
      const emitter = this.validateEmitter(name);
      emitter.emit(true);
    }



  }

  clearBusy(name = 'main') {
    const emitter = this.validateEmitter(name);
    emitter.emit(false);
  }

  sync() {
    this.waiting.forEach((waitingItem) => {
      this.subs[waitingItem.name].emit(waitingItem.state);
    });
    this.waiting = [];
  }
  getSubscription(name: string) {
    return this.validateEmitter(name);
  }
  validateEmitter(name: string): EventEmitter<boolean> {
    if (!this.subs[name]) {
      this.subs[name] = new EventEmitter();
    }
    return this.subs[name];
  }
}
