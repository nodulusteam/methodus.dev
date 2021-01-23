import decorators from '@methodus/server/decorators';
import { MethodResult, Mapping } from '@methodus/server/commons';
import { Verbs } from '../shim';
/**
 * @hidden
 */
@decorators.MethodConfig('SessionController',)
export class SessionController {
    @decorators.Method(Verbs.Post, '/api/player')
    public async create(@Mapping.Body() body?: any ,@Mapping.Session() session?: any): Promise<MethodResult> {
        return new MethodResult(session);
    }
}
