import {
    MessageHandler, MethodPipe, Method, Headers, MethodConfig, Verbs, Body,
    Param, Query, MethodResult, MethodError,
} from '../../index';
import * as M from '../../index';
import * as fs from 'fs';

process.env.methodus_name = 'first-class';
@MethodConfig('FirstClass')
export class FirstClass {

    @MethodPipe(Verbs.Get, '/posts/:id/namex/:name')
    public getFile(@Param('id') id: number, @Param('name') name: string) {

        try {
            const stream = fs.createReadStream('./image.jpg');
            const result = new MethodResult(stream);
            return result;
        } catch (e) {
            return false;
        }

    }

    @Method(Verbs.Get, '/posts/:id/:name')
    public async action1(@Param('id') id: number, @Param('name') name: string) {
        const result = new MethodResult({ value: 'FirstClass Dataasdasd', id, name, add: 'added' });
        return result;
    }

    @Method(Verbs.Get, '/action2/id/:id/name/:name')
    public action2Function(@Param('id') id: number, @Param('name') name: string, @Query('size') size: number) {
        const result = new MethodResult({ value: 'actionQuery', id, name, add: 'added', size });
        return result;
    }

    @Method(Verbs.Post, '/api/action3/xaction/:action')
    public async action3Function(@Param('action') action, @Query('size') size, @Body('length') length) {
        const result = new MethodResult({ value: size * length, size, length });
        return result;
    }

    @M.Method(M.Verbs.Post, '/api/action4/xaction/:action')
    public async action4(@M.Param('action') action, @M.Headers('Referer') size, @M.Body('length') length) {
        const result = new MethodResult({ value: size * length, size, length });
        return result;
    }

    @M.Method(M.Verbs.Post, '/api/action5/xaction/:action')
    public async action5(@M.Param('action') action, @M.Cookies('Size') size, @M.Body('length') length) {
        const result = new MethodResult({ value: size * length, size, length });
        return result;
    }
    @M.Method(M.Verbs.Post, '/api/dateaction/xaction/:action')
    public async dateAction(@M.Param('action') action, @M.Query('start') start: Date, @M.Query('end') end: Date) {
        const result = new MethodResult({ value: start, size: Date });
        return result;
    }

    @M.Method(M.Verbs.Post, '/api/action6/xaction/:action')
    public async action6(@M.Param('action') action, @M.Files('file') file, @M.Body('length') length) {
        const result = new MethodResult({ value: file, length });
        return result;
    }

    @Method(Verbs.Post, '/testheaders/')
    public testheaders(@Body('id') id: number, @Headers('name-name') name: any) {
        const result = new MethodResult({ value: 'actionQuery', id, name, add: 'added' });
        return result;
    }

    @Method(Verbs.Get, '/posts/')
    public actionQuery(@Query('id') id: number, @Query('name') name: string) {
        const result = new MethodResult({ value: 'actionQuery', id, name, add: 'added' });
        return result;
    }

    @Method(Verbs.Get, '/posts/error')
    public error() {
        console.log('running error localy');
        throw (new MethodError('error returned', 500));
    }

    @Method(Verbs.Get, '/posts/denied')
    public denied() {
        console.log('running denied localy');
        throw (new MethodError('denied returned', 401));

    }

    @MessageHandler('FirstClassEvent', 'event-bus')
    public EventHandler(value) {
        console.log('handling events in handler', value);
    }

    @Method(Verbs.Post, '/posts/')
    public action2(@Body('data') item) {
        return new MethodResult({ item });
    }

    @Method(Verbs.Delete, '/api/acion1')
    public action3() {
        console.log('action3');
    }
}
