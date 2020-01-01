/** this function parses values from the request object into the function args
  *  @param {any} args - the arguments sent to the original function.
  *  @param {[string]} paramsMap - express route string.
  *
  */
export function deserialize(item: { type: any, value: string }) {
    if (item !== undefined && item !== null) {
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
