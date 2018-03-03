export class fp {
    public static maybe(object: any): any {

        if (!object)
            return {};
        return object;
    }



    public static maybeProto(object: any): any {
        if (object.methodus)
            return object;

        let proto = object.prototype;
        if (proto && (proto.length === 0 || Object.keys(proto).length === 0) && proto.constructor)
            proto = proto.constructor;
        if (!proto)
            proto = object.__proto__;
        return proto;
    }

    public static maybeMethodus(object: any): any {
        let proto = object.prototype;
        if (proto && proto.constructor && proto.constructor.methodus)
            return proto.constructor.methodus;

        if (!proto && object.__proto__ && object.__proto__.methodus)
            return object.__proto__.methodus;

        if (object.methodus)
            return object.methodus;

        return proto.methodus;
    }

    public static maybeEach(object: any, callback) {
        if (object.forEach) {
            object.forEach((item) => {
                callback(item);
            })
        }
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
