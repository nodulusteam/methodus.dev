function isObject(value: any) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}
const hasOwnProperty = Object.prototype.hasOwnProperty;

// function arrayEach(array: any, iteratee: any) {
//     let index = -1;
//     const length = array == null ? 0 : array.length;

//     while (++index < length) {
//         if (iteratee(array[index], index, array) === false) {
//             break;
//         }
//     }
//     return array;
// }
// function keys(object: any) {
//     return isArrayLike(object)
//         ? arrayLikeKeys(object)
//         : Object.keys(Object(object));
// }

// function arrayLikeKeys(value: any, inherited?: any) {
//     const isArr = Array.isArray(value);

//     const skipIndexes = isArr; // || isArg || isBuff || isType
//     const length = value.length;
//     const result = new Array(skipIndexes ? length : 0);
//     let index = skipIndexes ? -1 : length;
//     while (++index < length) {
//         result[index] = `${index}`;
//     }
//     for (const key in value) {
//         if ((inherited || hasOwnProperty.call(value, key)) &&
//             !(skipIndexes &&
//                 // Safari 9 has enumerable `arguments.length` in strict mode.
//                 (key === 'length')

//             )) {
//             result.push(key);
//         }
//     }
//     return result;
// }

// function isArrayLike(value: any) {
//     return value != null && typeof value !== 'function' && value.length !== undefined;
// }

// function baseFor(object: any, iteratee: any, keysFunc: any) {
//     const iterable = Object(object);
//     const props = keysFunc(object);
//     let { length } = props;
//     let index = -1;

//     while (length--) {
//         const key = props[++index];
//         if (iteratee(iterable[key], key, iterable) === false) {
//             break;
//         }
//     }
//     return object;
// }
// function baseForOwn(object: any, iteratee: any) {
//     return object && baseFor(object, iteratee, keys);
// }
export class fp {
    public static maybe(object: any): any {

        if (!object) {
            return {};
        }
        return object;
    }

    public static unique(myArray: any): any {
        return [...new Set(myArray)];
    }

    // public static transform(object: any, iteratee: any, accumulator: any) {
    //     const isArr = Array.isArray(object);
    //     const isArrLike = isArr || Buffer.isBuffer(object) || Array.isArray(object);
    //     if (accumulator == null) {
    //         const Ctor = object && object.constructor;
    //         if (isArrLike) {
    //             accumulator = isArr ? new Ctor() : [];
    //         } else if (isObject(object)) {
    //             accumulator = typeof Ctor === 'function'
    //                 ? Object.create(Object.getPrototypeOf(object))
    //                 : {};
    //         } else {
    //             accumulator = {};
    //         }
    //     }
    //     (isArrLike ? arrayEach : baseForOwn)(object, (value: any, index: any, aobj: any) =>
    //         iteratee(accumulator, value, index, aobj));
    //     return accumulator;
    // }

    public static maybeProto(object: any): any {
        if (object.methodus) {
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

    public static maybeMethodus(object: any): any {
        const proto = object.prototype;
        if (proto && proto.constructor && proto.constructor.methodus) {
            return proto.constructor.methodus;
        }
        if (!proto && object.__proto__ && object.__proto__.methodus) {
            return object.__proto__.methodus;
        }
        if (object.methodus) {
            return object.methodus;
        }
        return proto.methodus;
    }

    public static maybeEach(object: any, callback: any) {
        if (object.forEach) {
            object.forEach((item: any) => {
                callback(item);
            });
        }
    }
    // public static array(object: any): any[] {

    //     const arr: any[] = [];
    //     for (const key in object) {
    //         if (object[key]) {
    //             arr.push(object[key]);
    //         }
    //     }
    //     return arr;
    // }

    public static maybeJson(object: any): object {
        if (!object) {
            return {};
        }
        try {
            return JSON.parse(object);
        } catch (error) {
            return {};
        }
    }

    public static maybeString(object: any): string {
        if (!object) {
            return '';
        }
        return object;
    }

    // public static if(condition: any, trueaction?: any, falseaction?: any): any {
    //     if (condition && trueaction) {
    //         return trueaction(condition);
    //     } else if (!condition && falseaction) {
    //         return falseaction(condition);
    //     } else if (falseaction) {
    //         falseaction(condition);
    //     }
    // }

    // public static ensure(object: any, property: string | string[], defaultValue?: any) {
    //     if (Array.isArray(property)) {
    //         (property).forEach((prop) => {
    //             if (!object[prop]) {
    //                 object[prop] = defaultValue || null;
    //             }
    //         });
    //     } else {
    //         if (!object[property]) {
    //             object[property] = defaultValue || null;
    //         }
    //     }
    // }
}
