
const primitiveArray: any = {
    'bool': (val: string | boolean) => val === 'true' || val === true,
    'date': (val: string) => new Date(val),
    'string': (val: string) => val,
    'object': (val: string | any) => typeof val === 'string' ? JSON.parse(val) : val,
};

/** Deserialize values according to their types
  *  @param { type: any, value: string } item - the arguments sent to the original function.
  *
  */
export function deserialize(item: { type: any, value: string }) {
    if (item !== undefined && item !== null) {

        if (primitiveArray[item.type]) {
            return primitiveArray[item.type](item.value);
        }



        if (item.type && item.type.deserialize) {
            try {
                return item.type.deserialize(item.value);
            } catch (error) {
                //  logger.warn(this, 'error deserializing argument', item);
            }
        } else if (item.type && item.type.prototype && item.type.prototype.constructor) {
            return new item.type(item.value);
        } else if (typeof (item.value) === 'string' && item.type === 'object') {
            try {
                return JSON.parse(item.value);
            } catch (error) {
                // logger.warn(this, 'error parsing argument', item);
            }

        } else if (item.value === undefined && typeof (item) === 'object') {
            return item;
        }
    } else {
        return item;
    }

    return item.value;
}
