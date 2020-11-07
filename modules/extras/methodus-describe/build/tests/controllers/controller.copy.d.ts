import { MethodResult } from '@methodus/server/commons';
import { BaseController } from './controller.base';
export declare class CopyController extends BaseController {
    update(): Promise<MethodResult<{}>>;
    delete(id: string): Promise<MethodResult<string>>;
}
