import decorators from '@methodus/framework-decorators';
import injection from '@methodus/framework-injection';



import { TestLogger } from './logger.service';
import { ScreenModel } from '../models/screen.model';
import { MethodResult, Mapping, AuthType, MethodError, MethodResultStatus } from '@methodus/framework-commons';
import { Verbs } from '../models/verbs';
import { MethodHandler } from '../../method/handlers/method.handler';
import { MethodPipeHandler } from '../../method/handlers/pipe.handler';

new MethodPipeHandler();
new MethodHandler();
/**
 * @hidden
 */
@injection.Injectable()
@decorators.Auth(AuthType.Basic, { user: 'user', pass: 'pass' })
@decorators.MethodConfig('TestController')
export class TestController {

    /**
     *
     */
    constructor(@injection.Inject() private testLogger: TestLogger) {
        this.testLogger.log('instance created for TestController');
    }


    @decorators.Method(Verbs.Get, '/api/testTypes')
    public async testTypes(@Mapping.Query('date') date: Date,
        @Mapping.Query('string') astring: string,
        @Mapping.Query('bool') bool: boolean): Promise<MethodResult> {
        console.log(date.toISOString(), astring, bool);
        return new MethodResult({});
    }



    @decorators.MethodMock({ list: [1, 2, 3] })
    @decorators.Method(Verbs.Get, '/api/player')
    public async list(
        @Mapping.Headers('auth') auth: string = 'kkk',
        @Mapping.Query('order_by') orderBy: string = 'asc'): Promise<any> {
        const result = new MethodResult([1, 2, 3, 4, 5], 5, 2);
        result.pipe({});
        result.on('finish', (data: any) => {
            return data;
        });
        return result;
    }

    @decorators.Method(Verbs.Get, '/api/player/desfaults')
    public async listdefaults(@Mapping.Param() params: any,
        @Mapping.Body() body: any,
        @Mapping.Headers() headers: any,
        @Mapping.Files() files: any,
        @Mapping.Cookies() cookies: any,
        @Mapping.Query() query: any,
        @Mapping.Response() res: any,
        @Mapping.Request() req: any,
        @Mapping.SecurityContext() securityContext: any,
    ): Promise<any> {
        return new MethodResultStatus([1, 2, 3, 4, 5], 203, 5, 1);
    }

    @decorators.Method(Verbs.Post, '/api/screens')
    public async create(@Mapping.Body('item') item: ScreenModel) {
        return new MethodResult(item);
    }

    @decorators.MethodPipe(Verbs.Get, '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number) {
        throw new MethodError('intended error', 500, { stack: 'some more data' });
    }

    @decorators.Method(Verbs.Get, '/api/player/:field/:value')
    public async getByField(@Mapping.Param('field') field: any, @Mapping.Param('value') value: number) {
        return new MethodResult({}, 100, 1);
    }

    @decorators.Method(Verbs.Put, '/api/player')
    public async update() {
        return new MethodResult({});
    }

    @decorators.Method(Verbs.Delete, '/api/player')
    public delete() {
        return new MethodResult({});
    }

}
