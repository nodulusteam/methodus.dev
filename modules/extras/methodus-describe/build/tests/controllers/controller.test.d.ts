import { MethodResult } from '@methodus/server/commons';
import { BaseController } from './controller.base';
import { UserModel } from '../models/user.model';
export declare class TestController extends BaseController {
    update(user: UserModel): Promise<MethodResult<{}>>;
    create(user: UserModel): Promise<MethodResult<UserModel>>;
    delete(id: string): Promise<MethodResult<string>>;
}
