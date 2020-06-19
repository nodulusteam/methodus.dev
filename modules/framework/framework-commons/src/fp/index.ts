/**
 * @hidden
 */
export class fp {
    public  maybe(object: any): any {
        if (!object) {
            return {};
        }
        return object;
    }

    public  unique(myArray: any): any {
        return [...new Set(myArray)];
    }

    public  maybeProto(object: any): any {
        if (!object || object.methodus) {
            return object;
        }

        let proto = object.prototype;
        if (proto && (proto.length === 0 || Object.keys(proto).length === 0) && proto.constructor) {
            proto = proto.constructor;
        }
        if (!proto) {
            proto = object.__proto__;
        }
        return proto;
    }

    public  maybeMethodus(object: any): any {
        if (!object) {
            return null;
        }
        if (object.methodus) {
            return object.methodus;
        }

        const proto = object.prototype;
        if (proto && proto.methodus) {
            return proto.methodus;
        }
        if (proto && proto.constructor && proto.constructor.methodus) {
            return proto.constructor.methodus;
        }
        if (!proto && object.__proto__ && object.__proto__.methodus) {
            return object.__proto__.methodus;
        }

        return proto.methodus;
    }

    public  maybeEach(object: any, callback: any) {
        if (object.forEach) {
            object.forEach((item: any) => {
                callback(item);
            });
        }
    }

    public  maybeJson(object: any): object {
        if (!object) {
            return {};
        }
        try {
            return JSON.parse(object);
        } catch (error) {
            return {};
        }
    }

    public  maybeString(object: any): string {
        if (!object) {
            return '';
        }
        return object;
    }

}

export const util = new fp();