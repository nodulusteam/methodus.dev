import 'reflect-metadata';
import {
    MethodType,
    ServerType,
    ServerDefinition,
    ClassRef,
} from '@methodus/framework-commons';

/** the RouterConfiguration decorator registers the controller as a router
 *  @param {type} controller - a controller class using the @MethodConfig decorator.
 *  @param {string} serverType - the name of the server
 */
export function RouterConfiguration(
    controller: ClassRef | null,
    serverType: ServerType | string | ServerDefinition | any
) {
    return (target: ClassRef) => {
        const original = target.prototype.constructor;
        original.prototype.options = original.prototype.options || {
            servers: [],
            classes: [],
            clients: [],
            plugins: [],
        };
        original.prototype.options.classes.push({
            classType: controller,
            controller,
            methodType: MethodType.Local,
            serverType,
        });
    };
}
