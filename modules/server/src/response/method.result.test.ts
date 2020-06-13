
import { MethodResult } from './method.result';
import { MethodConfig, Method } from '@methodus/framework-decorators';
import injection from '@methodus/framework-injection';
// import { Injectable } from '@methodus/framework-injection';

@injection.Injectable('MethodHandler')
class MethodHandler {
    methodDecorator() {

    }
}

new MethodHandler();

@MethodConfig('TestController')
export class TestController {
    @Method('post', '/route', [])
    public list() { }
}

export class Test {
    /**
     *
     */
    constructor() {
        const result = new MethodResult({ prop1: 1, prop2: 2 });
        result.linkAction('list', TestController, 'my-rel', {}, 'www.com');
        const linksResult = result.apply();
        console.log(linksResult);

    }
}


new Test();

