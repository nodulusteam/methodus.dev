import { Method, MethodConfig,MethodConfigExtend, MethodResult, Verbs, Headers, Query, MethodError, Param, MethodMock } from '@methodus/server';
import { Mock } from '../../../build_mocks/mock';
/*start custom*/
import { BaseController } from './basecontroller';
/*end custom*/

@MethodConfig('Inherit2')
export class Inherit2 extends BaseController {

}
