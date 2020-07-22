import {
    injectionModule as injection,

} from '@methodus/server';
import decorators from '@methodus/framework-decorators';
import { AuthType, MethodResult, MethodResultStatus, MethodError, Mapping } from '@methodus/framework-commons';
import { TestLogger } from './logger.service';
import { ScreenModel } from '../models/screen.model';

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


    @decorators.Method('GET', '/api/testTypes')
    public async testTypes(@Mapping.Query('date') date: Date,
        @Mapping.Query('string') astring: string,
        @Mapping.Query('bool') bool: boolean): Promise<MethodResult> {
        console.log(date.toISOString(), astring, bool);
        return new MethodResult({});
    }



    @decorators.MethodMock({})
    @decorators.Method('GET', '/api/player')
    public async list(
        @Mapping.Headers('auth') auth: string = 'kkk',
        @Mapping.Query('order_by') orderBy: string = 'asc'): Promise<any> {
        const result = new MethodResult([1, 2, 3, 4, 5], 5, 2);
        result.pipe({});
        result.on('finish', (data: any) => {
            return data;
        });
        //  result.setHeader('good-header', generateUuid());
        return result;
    }

    @decorators.Method('GET', '/api/player/desfaults')
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

    @decorators.Method('POST', '/api/screens')
    public async create(@Mapping.Body('item') item: ScreenModel) {
        return new MethodResult(item);
    }

    @decorators.MethodPipe('GET', '/api/player/:player_id')
    public async read(@Mapping.Param('player_id') playerId: number) {
        throw new MethodError('intended error', 500, { cause: 'some more data' });
    }

    @decorators.Method('GET', '/api/player/:field/:value')
    public async getByField(@Mapping.Param('field') field: any, @Mapping.Param('value') value: number) {
        return new MethodResult({}, 100, 1);
    }

    @decorators.Method('PUT', '/api/player')
    public async update() {
        return new MethodResult({});
    }

    @decorators.Method('DELETE', '/api/player')
    public delete() {
        return new MethodResult({});
    }

}
