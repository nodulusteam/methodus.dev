import decorators from '@methodus/server/decorators';
/*start custom*/
import { BaseController } from './basecontroller';
/*end custom*/

@decorators.MethodConfig('Inherit2')
export class Inherit2 extends BaseController {

}
