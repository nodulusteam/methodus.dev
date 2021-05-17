import * as M from '../..';
@M.Singleton()
@M.MethodConfig('TestContract')
export class TestContract {

    @M.Method(M.Verbs.Post, '/posts/:id/:name')
    public async action1(@M.P.Param('id') id: number, @M.P.Param('name') name: string, @M.P.Query('size') size: number, @M.P.Body('bod')  body: any, @M.P.Headers('aheader') headers: string,) {
        return { ok: 1 };
    }


    @M.Method(M.Verbs.Post, '/posts/noname/')
    public async action1NoName(@M.P.Query() query: any, @M.P.Param() params: any, @M.P.Headers() headers: any,@M.P.Body() body: any) {
        return { ok: 1 };
    }

    @M.Method(M.Verbs.Get, '/action2/:id/:name')
    public async action2(
        @M.P.Param('id') id: number,
        @M.P.Param('name') name: string,
        @M.P.Query('size') size: number) {
        return { ok: 1 , id, name, size};
    }

    @M.Method(M.Verbs.Post, '/api/action3/xaction/:action')
    public async action3(
        @M.P.Param('action') action: string,
        @M.P.Query() queryObject: any,
        @M.P.Body() bodyObject: any) {
        return;
    }

    @M.Method(M.Verbs.Post, '/api/action4/xaction/:action')
    public async action4(
        @M.P.Param('action') action: string,
        @M.P.Headers('Referer') size: string,
        @M.P.Body('length') length: number) {
        return;
    }

    @M.Method(M.Verbs.Post, '/api/action5/xaction/:action')
    public async action5(
        @M.P.Param('action') action: string,
        @M.P.Cookies('Size') size: number,
        @M.P.Body('length') length: number) {
        return;
    }

    @M.Method(M.Verbs.Post, '/api/action6/xaction/:action')
    public async action6(
        @M.P.Param('action') action: string,
        @M.P.Files('file') file: any,
        @M.P.Body('length') length: number) {
        return;
    }
}
