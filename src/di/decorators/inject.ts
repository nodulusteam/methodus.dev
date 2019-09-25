import { Injector } from './injector';

export function Inject(): any {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        // var params = [];
        // for (var i = 0; i < args.length; i++) {
        //     args[i] ? params.push(args[i]) : null;
        // }
        const constructorArgs = Reflect.getOwnMetadata('design:paramtypes', target);


        //  const argParam = Reflect.get(constructorArgs[parameterIndex]);
        // console.log(argParam);
        const propertyName = getConstructorArgumentsNames(target.prototype.constructor, parameterIndex);
        target.prototype[propertyName] = Injector.get(constructorArgs[parameterIndex]);
        //const instance = Injector.get(constructorArgs[parameterIndex]);
        // return injectProperty(propertyName)
        // return Object.defineProperty(target.prototype, propertyName, { value: instance });
        // target.prototype[propertyName] = instance;
        // console.log(args);
        // switch (params.length) {
        //     case 2:
        //         return injectProperty(keys[0]).apply(this, args);
        //     case 3:
        //         return injectMethod(...keys).apply(this, args);
        //     default:
        //         throw new Error("Decorators are not valid here!");
        // }
    };
}

// function injectProperty(...keys: string[]) {
//     return (target: any, property: string) => {
//         target[property] = Injector.get(keys[0]);
//     };
// }

function getConstructorArgumentsNames(constructor: any, index: number) {
    const functionString = constructor.toString();
    const params: any = GetArgumentNames(functionString);

    // const newConstructor: any = (...args: any) => {
    //     const newObj = new constructor(args);
    //     params.map((param: any, index: number) => newObj[param] = args[index]);
    //     return newObj;
    // }

    // newConstructor.prototype = constructor.prototype;
    return params[index];
}

const RegExInsideParentheses = /[(][^)]*[)]/;
const RegExParenthesesAndSpaces = /[()\s]/g;
const GetArgumentNames = (functionString: any) => {
    return RegExInsideParentheses.exec(functionString)![0].replace(RegExParenthesesAndSpaces, "").split(',').map(str => str.trim())
}


