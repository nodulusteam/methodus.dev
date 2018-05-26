function isObject(value) {
    const type = typeof value
    return value != null && (type == 'object' || type == 'function')
}
const hasOwnProperty = Object.prototype.hasOwnProperty

function arrayEach(array, iteratee) {
    let index = -1
    const length = array == null ? 0 : array.length

    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break
        }
    }
    return array
}
function keys(object) {
    return isArrayLike(object)
        ? arrayLikeKeys(object)
        : Object.keys(Object(object))
}

function arrayLikeKeys(value, inherited?) {
    const isArr = Array.isArray(value)
    //const isArg = !isArr && isArguments(value)
    // const isBuff = !isArr && !isArg && isBuffer(value)
    //const isType = !isArr && !isArg && !isBuff && isTypedArray(value)
    const skipIndexes = isArr //|| isArg || isBuff || isType
    const length = value.length
    const result = new Array(skipIndexes ? length : 0)
    let index = skipIndexes ? -1 : length
    while (++index < length) {
        result[index] = `${index}`
    }
    for (const key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes &&
                // Safari 9 has enumerable `arguments.length` in strict mode.
                (key == 'length')
                // Node.js 0.10 has enumerable non-index properties on buffers.
                //(isBuff && (key == 'offset' || key == 'parent')) ||
                // PhantomJS 2 has enumerable non-index properties on typed arrays.
                //(isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) || // Skip index properties.
                //isIndex(key, length))
            )) {
            result.push(key)
        }
    }
    return result
}



function isArrayLike(value) {
    return value != null && typeof value != 'function' && value.length !== undefined
}

function baseFor(object, iteratee, keysFunc) {
    const iterable = Object(object)
    const props = keysFunc(object)
    let { length } = props
    let index = -1

    while (length--) {
        const key = props[++index]
        if (iteratee(iterable[key], key, iterable) === false) {
            break
        }
    }
    return object
}
function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys)
}
export class fp {
    public static maybe(object: any): any {

        if (!object)
            return {};
        return object;
    }




    public static unique(myArray: any): any {
        return [...new Set(myArray)];
    }


    public static transform(object, iteratee, accumulator) {
        const isArr = Array.isArray(object)
        const isArrLike = isArr || Buffer.isBuffer(object) || Array.isArray(object)

        if (accumulator == null) {
            const Ctor = object && object.constructor
            if (isArrLike) {
                accumulator = isArr ? new Ctor : []
            }
            else if (isObject(object)) {
                accumulator = typeof Ctor == 'function'
                    ? Object.create(Object.getPrototypeOf(object))
                    : {}
            }
            else {
                accumulator = {}
            }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, (value, index, object) =>
            iteratee(accumulator, value, index, object))
        return accumulator
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
