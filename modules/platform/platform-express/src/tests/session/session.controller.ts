import { decoratorsModule as decorators } from '@methodus/server';
import { MethodResult, Mapping } from '@methodus/framework-commons';
import { Verbs } from '../shim';

/**
 * @hidden
 */
@decorators.MethodConfig('SessionController',)
export class SessionController {


    @decorators.Method(Verbs.Post, '/api/player')
    public async create(@Mapping.Session() session?: any): Promise<MethodResult> {
        return new MethodResult(session);
    }




}
