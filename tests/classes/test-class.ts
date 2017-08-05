import { Event, Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, MethodEvent } from '../../index';
const endPoint = 'http://localhost:8090';//https://jsonplaceholder.typicode.com';
const debug = require('debug')('methodulus');
@MethodConfig('TestClass', endPoint)
export class TestClass {
    constructor() { }

    @Method(Verbs.Get, '/posts/:id/:name')
    public action1( @Param('id') id: number, @Param('name') name: string) {
        new MethodEvent('FirstClassEvent', { id: '333', name: 'roi' });
        console.log('running action1 localy', id, name);
        
        return new MethodResult({ id: id, name: name, add: 'added' });
    }


    @Method(Verbs.Post, '/posts/error')
    public error() {
        console.log('running error localy');
        throw (new MethodError('error returned', 500));

    }
    @Event('PreEvent', Verbs.Get, '/posts/event')
    @Event('FirstClassEvent', Verbs.Get, '/posts/event')
    public evenHandler(item) {
        console.log('in event handler', item);
        return item;

    }


    @Event('FirstClassEvent', Verbs.Get, '/posts/event')
    public evenHandler1(item) {
        console.log('in event handler', item);
        return item;

    }



    @Method(Verbs.Post, '/posts/')
    public action2( @Body() item) {

        return item;

    }


    @Method(Verbs.Delete, 'api/acion1')
    public action3() {
        console.log('action3');
    }
}