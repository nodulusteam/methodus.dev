import { MethodConfig } from '@methodus/server';
/*start custom*/
import { DataController } from './datacontroller';
/*end custom*/
@MethodConfig('ModelsController', [], '/api/users')
export class ModelsController extends DataController {

}
