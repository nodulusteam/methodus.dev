
import commons from '@methodus/framework-decorators/commons';


const primitiveArray: any = {
    'bool': (val: string | boolean) => val === 'true' || val === true,
    'date': (val: string) => new Date(val),
    'string': (val: string) => val,
    'object': (val: string | any) => {
        let returnValue = val;
        if (typeof returnValue === 'string') {
            try {
                returnValue = JSON.parse(val);
            }
            catch (error) {

            }
        }
        return returnValue;
    }
}

/** Deserialize values according to their types
  *  @param { type: any, value: string } item - the arguments sent to the original function.
  *
  */
export function deserialize(item: { type?: any, value: string } | any) {
    if (item !== undefined && item !== null && item.type) {
        if (primitiveArray[item.type]) {
            return primitiveArray[item.type](item.value);
        }



        if (item.type && item.type.deserialize) {
            try {
                return item.type.deserialize(item.value);
            } catch (error) {
                commons.logger.warn('error deserializing argument, will try other ways', item);
            }
        } else if (item.type && item.type.prototype && item.type.prototype.constructor) {
            return new item.type(returnJson(item.value));
        } else if (typeof (item.value) === 'string' && item.type === 'object') {
            return returnJson(item.value);

        } else if (item.value === undefined && typeof (item) === 'object') {
            return item;
        }
    } else if (typeof item.value === 'string') {
        return returnJson(item.value);
    } else {
        return item;
    }

    return item.value;
}


function returnJson(str: string) {
    try {
        return JSON.parse(str);
    } catch (error) {
    }
    return str;
}