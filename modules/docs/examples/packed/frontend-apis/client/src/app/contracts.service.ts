import { Injectable, Output, EventEmitter } from '@angular/core';
import { LocalController, RemoteService, TodoModel } from '@todo/client';
import { MethodType } from '@methodus/client';
import { Injector } from '@methodus/client';

(window as any).METHODUS_CONFIG = {
    'LocalController': { methodType: MethodType.Http }
};
new LocalController(new RemoteService());
export { LocalController, RemoteService, TodoModel } from '@todo/client';




@Injectable()
export class ContractsService {
    localController: LocalController = Injector.get<LocalController>('LocalController');
    constructor() {

    }
}
