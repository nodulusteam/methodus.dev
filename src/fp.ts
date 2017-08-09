import { logger } from './logger';

// export function maybeJson(value) {
//     try {
//         console.log(value);
//         let parsed = JSON.parse(value);
//         return parsed;
//     } catch (error) {
//         return null;
//     }
// }


export class fp {
    public static maybe(object: any): any {

        if (!object)
            return {};
        return object;
    }

    public static proto(object: any): any {

        let proto = object.prototype;
        if (!proto)
            proto = object.__proto__;

        return proto;
    }





    public static array(object: any): any[] {

        let arr: any[] = [];
        for (let key in object)
            arr.push(object[key]);
        return arr;
    }

    public static maybeJson(object: any): Object {
        if (!object)
            return '{}';
        try {
            return JSON.parse(object);
        } catch (error) {
            logger.error('error parsing JSON', object);
            return {};
        }
    }

    public static maybeString(object: any): string {
        if (!object)
            return '';
        return object;
    }


    public static if(condition: any, trueaction?: Function, falseaction?: Function): any {
        if (condition && trueaction)
            return trueaction(condition);
        else if (!condition && falseaction)
            return falseaction(condition);
        else if (falseaction)
            falseaction(condition);
    }


    public static ensure(object: Object, property: string | string[], defaultValue?: any) {
        if (Array.isArray(property)) {
            (property as string[]).map((prop) => {
                if (!object[prop])
                    object[prop] = defaultValue || null;
            });
        }
        else {
            if (!object[property])
                object[property] = defaultValue || null;
        }

    }



}