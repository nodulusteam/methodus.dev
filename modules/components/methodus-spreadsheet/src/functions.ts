

export type Dictionary<T = any> = { [key: string]: T };
const log = require('debug')('methodus:spreadsheet');

export function forceArray(val: any) {
    if (Array.isArray(val)) return val;
    if (!val) return [];
    return [val];
}

export function xmlSafeValue(val: any) {
    if (val == null) return '';
    return String(val).replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '&#10;')
        .replace(/\r/g, '&#13;');
}
export function xmlSafeColumnName(val: any) {
    if (!val) return '';
    return String(val).replace(/[\s_]+/g, '')
        .toLowerCase();
}

export function prepareObject(finalObject: { [key: string]: any } | any) {
    Object.keys(finalObject).forEach((property) => {
        if (finalObject[property] !== undefined && finalObject[property] !== null) {
            if (typeof finalObject[property] === 'object' && !finalObject[property].getDate) {
                finalObject[property] = JSON.stringify(finalObject[property]);
            } else if (finalObject[property].getDate) {
                finalObject[property] = finalObject[property].toISOString();
            } else {
                finalObject[property] = finalObject[property].toString();
            }
        }
    });
    return finalObject;

}


export function parseObjects(clone: Dictionary, key: string): void {
    try {
        if (clone[key]) {
            if (clone[key].indexOf('[') === 0 || clone[key].indexOf('{') === 0 || clone[key].indexOf('\'') === 0) {
                clone[key] = JSON.parse(clone[key]);
            } else {
                const numResult = Number(clone[key]);
                if (!Number.isNaN(numResult)) {
                    clone[key] = numResult;
                } else {
                    clone[key] = JsonDateParse(clone[key]);
                }
            }
        }

    } catch (error) {
        log(error);
    }

}

export function parseObject(clone: Dictionary): void {
    Object.keys(clone).forEach((key: string) => {
        parseObjects(clone, key);
    });
}


export function JsonDateParse(value: string) {
    const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    const reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

    if (typeof value === 'string') {
        if (value.indexOf('"') === 0 && value.indexOf('"', 1) === value.length - 1) {
            value = value.replace(/"/g, '');
        }


        var a = reISO.exec(value);
        if (a) {
            return new Date(value);

        }
        a = reMsAjax.exec(value);
        if (a) {
            var b = a[1].split(/[-+,.]/);
            return new Date(b[0] ? +b[0] : 0 - +b[1]);
        }

        try {
            const d = new Date(value);
            if (!isNaN(d.getTime())) {
                return d;
            }
        } catch (error) {

        }
        //finally just try a date

    }
    return value;

}



