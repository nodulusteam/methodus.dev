import { Injectable } from '@angular/core';
import { Rest } from '@methodus/platform-web';


@Injectable()
export class RemoteCallService {
  constructor() {
  }
  _subscriptions = {};
  options: any = {};
  request: any;
  url: string;
  public async activate(uri, methodInformation) {
    const argsForRequest = [];
    methodInformation.params.forEach((param) => {
      argsForRequest.push(param.value);
    });

    debugger;
    const restRequest = new Rest(uri, methodInformation.verb,
      methodInformation.params, argsForRequest);
    const response = await fetch(restRequest.request, restRequest.options);
    return response;
  }

}
