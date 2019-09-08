import 'reflect-metadata';

export const enum AuthType {
    None,
    Basic,
    ApiKey,
    BearerToken,
    DigestAuth
}


/** the AuthConfig decorator registers the controller as a router
 *  @param {AuthType} type - the type of authentication to apply.
 *  @param {options} options - the auth options
 */
export function Auth(type: AuthType, options?: any) {
    return (target: any) => {
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
