import { Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError } from '../../index';
const endPoint = 'http://localhost:8090';//https://jsonplaceholder.typicode.com';
const debug = require('debug')('methodulus');
@MethodConfig('TestClass', endPoint)
export class TestClass {
    constructor() { }

    @Method(Verbs.Get, '/posts/:id/:name')
    public action1( @Param('id') id: number, @Param('name') name: string) {

        return new MethodResult({ id: id, name: name, add: 'added' });
    }


    @Method(Verbs.Get, '/posts/error')
    public error() {
        return new MethodError('error returned', 500);
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