import { Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError } from '../../index';
const debug = require('debug')('tmla:methodus');
@MethodConfig('SecondClass')
export class SecondClass {
    constructor() { }

    @Method(Verbs.Get, '/posts/:id/:name')
    public action1( @Param('id') id: number, @Param('name') name: string) {
        console.log('running action1 in SecondClass', id, name );
        return new MethodResult({ id: id, name: name, add: 'added' });
    }


    @Method(Verbs.Get, '/posts/error')
    public error() {
        console.log('running error localy');
        throw new MethodError('error returned', 500);
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