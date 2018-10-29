import { Method, MethodConfig, Verbs, Body, Param, MethodResult, MethodError } from '../../index';
@MethodConfig('SecondClass')
export class SecondClass {
    @Method(Verbs.Get, '/posts/:id/:name')
    public async action1(@Param('id') id: number, @Param('name') name: string) {
        return new MethodResult({ id, name, add: 'added' });
    }

    @Method(Verbs.Get, '/posts/error')
    public async  error() {
        console.log('running error localy');
        throw new MethodError('error returned', 500);
    }

    @Method(Verbs.Post, '/posts/')
    public async action2(@Body() item) {
        return item;
    }

    @Method(Verbs.Delete, '/api/acion1')
    public async action3() {
        console.log('action3');
    }
}
