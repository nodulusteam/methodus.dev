import { Method, MethodConfigExtend, MethodConfig, MethodResult, Verbs, Headers, Query, MethodError, Param, MethodMock } from '@methodus/server';
import { Mock } from '../../../build_mocks/mock';
/*start custom*/
import { BaseController } from './basecontroller';
/*end custom*/
@MethodConfig('Inherit')
export class Inherit extends BaseController {

}
