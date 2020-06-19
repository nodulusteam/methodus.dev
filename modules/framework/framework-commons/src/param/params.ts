import 'reflect-metadata';
// tslint:disable-next-line:no-namespace
export namespace Mapping {
    function recurseODM(odm: any) {
        const _objectSchema: any = {};
        Object.values(odm.fields).forEach((field: any) => {
            if (field.odm && field.odm.odm) {
                _objectSchema[field.propertyKey] = recurseODM(field.odm.odm);
            } else {
                _objectSchema[field.propertyKey] = field.type;
            }
        });
        return _objectSchema;
    }

    function pushParams(target: any, propertyKey: any, param: any) {
        const designType = Reflect.getMetadata('design:paramtypes', target, propertyKey);

        const actualParam = designType[param.index];
        let objectSchema: any = null;
        let typeName;
        if (actualParam && actualParam.odm) {
            //recurse odm
            objectSchema = recurseODM(actualParam.odm);

            typeName = actualParam.name;
        } else if (actualParam && actualParam.type) {
            typeName = actualParam.type;
        } else {
            typeName = (designType && designType[param.index] !== undefined && designType[param.index].name) ?
                designType[param.index].name.toLowerCase() : 'any';
            if (param.type) {
                typeName = param.type;
            }
            if (typeName === undefined) {
                typeName = 'object';
            }
        }

        target.methodus = target.methodus || {};
        const name = target.name || target.constructor.name;
        target.methodus[name] = target.methodus[name] || { _auth: {}, _events: {}, _descriptors: {} };
        const mTarget = target.methodus[name];

        mTarget._descriptors[propertyKey] = mTarget._descriptors[propertyKey] || { params: [] };
        mTarget._descriptors[propertyKey].params.push(Object.assign({}, param, { type: typeName, actualType: actualParam, schema: objectSchema }));
    }

    function build(from: string, name?: string, type?: string, defaultValue?: any) {
        return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
            if (name) {
                pushParams(target, propertyKey, { type, from, index: parameterIndex, defaultValue, name });
            } else {
                pushParams(target, propertyKey, { type, from, index: parameterIndex, defaultValue });
            }
        };
    }

    export function Body(name?: string, type?: any) {
        return build('body', name, type);
    }

    export function Param(name?: string) {
        return build('params', name);
    }

    export function Files(name?: string) {
        return build('files', name);
    }

    export function Headers(name?: string) {
        return build('headers', name);
    }

    export function Cookies(name?: string) {
        return build('cookies', name);
    }

    export function Query(name?: string, type?: any, defaultValue?: any) {
        return build('query', name, type, defaultValue);
    }

    export function SecurityContext(name?: string, type?: any) {
        return build('security_context', name, type);
    }

    export function Response(name?: string) {
        return build('response', name);
    }

    export function Request(name?: string) {
        return build('request', name);
    }
}
