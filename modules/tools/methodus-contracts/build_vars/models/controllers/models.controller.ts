import decorators from '@methodus/server/decorators';
/*start custom*/
import { DataController } from './datacontroller';
/*end custom*/
@decorators.MethodConfig('ModelsController', [], '/api/users')
export class ModelsController extends DataController {

}
