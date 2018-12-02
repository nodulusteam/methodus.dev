import 'reflect-metadata';
function pushParams(target, propertyKey, param) {
    const designType = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    let typeName = (designType[param.index] !== undefined && designType[param.index].name) ?
        designType[param.index].name.toLowerCase() : 'any';
    if (param.type) {
        typeName = param.type;
    }

    if (typeName === undefined) {
        typeName = 'object';
    }

    target.methodus = target.methodus || { _events: {}, _descriptors: {} };
    target.methodus._descriptors[propertyKey] = target.methodus._descriptors[propertyKey] || { params: [] };
    target.methodus._descriptors[propertyKey].params.push(Object.assign({}, param, { type: typeName }));
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
