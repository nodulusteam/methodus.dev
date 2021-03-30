import * as M from '../..';

@M.MethodConfigBase('BaseTestContract')
export class BaseTestContract {
    public base: string='';

    @M.Method(M.Verbs.Get, '/posts/:id/:name')
    public async baseAction(@M.P.Param('id') id: number, @M.P.Param('name') name: string) {
        return { ok: 1 };
    }

}
