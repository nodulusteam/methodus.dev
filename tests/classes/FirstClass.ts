import { logger, Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, Event, EventName } from '../../index';

process.env.methodulus_name = 'first-class';
@MethodConfig('FirstClass')
export class FirstClass {
    constructor() { }

    @Method(Verbs.Get, '/posts/:id/:name')
    public action1( @Param('id') id: number, @Param('name') name: string) {
        logger.log(this, 'action1 in FirstClass', id, name);
        let result = new MethodResult({ value: 'FirstClass Data, from port' + process.env.NODE_PORT, add: 'added' });
        logger.log(this, 'the result as MethodResult', result);
        return result;
    }


    @Method(Verbs.Get, '/posts/error')
    public error() {
        console.log('running error localy');
        throw (new MethodError('error returned', 500))

    }

    @Event('FirstClassEvent', Verbs.Post, '/events/firstclass')
    public EventHandler( @EventName() name) {
        console.log(name);
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