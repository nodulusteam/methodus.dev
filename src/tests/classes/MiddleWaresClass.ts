import { Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, logger } from '../../index';
const endPoint = 'http://localhost:8090';//https://jsonplaceholder.typicode.com';



function middleWare1(req, res, next) {
    console.log('run middleWare1');
    next();
}


function middleWare2(req, res, next) {
    console.log('run middleWare2');
    next();
}


function middleWare3(req, res, next) {
    console.log('run middleWare3');
    next();
}
@MethodConfig('MiddleWaresClass') // [middleWare1]
export class MiddleWaresClass {
    constructor() { }

    @Method(Verbs.Get, '/posts/:id/:name', [middleWare2])
    public action1( @Param('id') id: number, @Param('name') name: string) {
        console.log('running action1 localy');
        return new MethodResult({ id: id, name: name, add: 'added' });
    }


    @Method(Verbs.Get, '/posts/error', [middleWare3])
    public error() {
        console.log('running error localy');
        throw new MethodError('error returned', 500);
    }


    @Method(Verbs.Post, '/posts/', [middleWare2])
    public action2( @Body() item) {

        return item;

    }


    @Method(Verbs.Delete, 'api/acion1', [middleWare1])
    public action3() {
        console.log('action3');
    }
}




@MethodConfig('MiddleWaresClass',[middleWare1]) // 
export class MiddleWaresClass2 {
    constructor() { }

    @Method(Verbs.Get, '/posts1/:id/:name')
    public action1( @Param('id') id: number, @Param('name') name: string) {
        console.log('running action1 localy');
        return new MethodResult({ id: id, name: name, add: 'added' });
    }


    @Method(Verbs.Get, '/posts1/error', [middleWare3])
    public error() {
        console.log('running error localy');
        throw new MethodError('error returned', 500);
    }


    @Method(Verbs.Post, '/posts1/', [middleWare2])
    public action2( @Body() item) {

        return item;

    }


    @Method(Verbs.Delete, 'api/acion1', [middleWare1])
    public action3() {
        console.log('action3');
    }
}
