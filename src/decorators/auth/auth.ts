import 'reflect-metadata';
import { Dictionary, AuthType, ClassRef } from '../../interfaces';




/** the AuthConfig decorator registers the controller as a router
 *  @param {AuthType} type - the type of authentication to apply.
 *  @param {options} options - the auth options
 */
export function Auth(type: AuthType, options?: Dictionary) {
    return (target: ClassRef) => {
        const original = target.prototype.constructor;
        original.prototype.options = original.prototype.options ||
            { servers: [], classes: [], clients: [], plugins: [] };

        if (!original.methodus) {
            original.prototype.methodus[original.name]._auth = { type: type, options: options };
        } else {

            original.methodus[original.name]._auth = { type: type, options: options };
        }

    };
}
