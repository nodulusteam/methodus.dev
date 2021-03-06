import 'reflect-metadata';
import { Injector } from "../container";



export function Inject(name?: string, propertyName?: string): any {
    return function (
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number
    ) {
        const constructorArgs = Reflect.getOwnMetadata(
            'design:paramtypes',
            target
        );
        if (!propertyName) {
            propertyName = getConstructorArgumentsNames(
                target.prototype.constructor,
                parameterIndex
            );
        }
        if (propertyName) {
            target.prototype[propertyName] = Injector.resolve(
                constructorArgs[parameterIndex]
            );
        } else {
            throw new Error(`missing property name for injection`);
        }
    };
}

function getConstructorArgumentsNames(constructor: any, index: number) {
    const functionString = constructor.toString();
    const params: any = GetArgumentNames(functionString);
    return params[index];
}

const RegExInsideParentheses = /[(][^)]*[)]/;
const RegExParenthesesAndSpaces = /[()\s]/g;
const GetArgumentNames = (functionString: any) => {
    return RegExInsideParentheses.exec(functionString)![0]
        .replace(RegExParenthesesAndSpaces, '')
        .split(',')
        .map((str) => str.trim());
};
