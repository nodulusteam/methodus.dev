import { ParamsMap, Verbs } from '../commons';
import { MethodError } from '../response/methodError';
import axios, { AxiosRequestConfig } from 'axios';
export class Rest {
    public static interceptor: (options: any) => {} | undefined;
    public options: any = {};
    public request: any;

    constructor(uri: string, verb: Verbs, paramsMap: ParamsMap[], args: any[]) {
        this.options.uri = uri;
        this.parse(verb, paramsMap, args);
        if (Rest.interceptor !== undefined) {
            Rest.interceptor(this.options);
        }
    }
    public static intercept(interceptor: (options: any) => {}) {
        Rest.interceptor = interceptor;
    }

    public parse(verb: Verbs, paramsMap: ParamsMap[], args: any[]) {
        const queryString: any = [];
        let body: any = {};

        const headers: any = {};
        const options = {
            cache: 'default',
            credentials: 'include',
            headers: Object.assign(headers, {
                'Content-Type': 'application/json',
            }),
            method: verb,
            mode: 'cors',
            redirect: 'follow',
        };

        paramsMap.forEach((param: ParamsMap) => {
            if (param.index !== undefined && args[param.index] !== undefined) {
                switch (param.from) {
                    case 'params':
                        if (this.options.uri) {
                            this.options.uri = this.options.uri.replace(':' + param.name, args[param.index]);
                        }
                        break;
                    case 'query':
                        if (param.name) {
                            queryString.push({ name: param.name, value: args[param.index] });
                        } else {
                            const queryObject = args[param.index];
                            Object.keys(queryObject).forEach((key: string) => {
                                if (Array.isArray(queryObject[key])) {
                                    queryObject[key].forEach((item: string) => {
                                        queryString.push({ name: key, value: item });
                                    });
                                } else {
                                    queryString.push({ name: key, value: queryObject[key] });
                                }
                            });
                        }
                        break;

                    case 'body':
                        if (param.name) {
                            body[param.name] = args[param.index];
                        } else {
                            Object.assign(body, args[param.index]);
                        }

                        break;
                    case 'files':
                        // create a new multipart-form for every file
                        const formBody: FormData = new FormData();
                        let argus = args[param.index];
                        if (!Array.isArray(args[param.index])) {
                            argus = [args[param.index]];
                        }

                        argus.forEach((file: File) => {
                            formBody.append(param.name || 'files', file, file.name);
                        });

                        Object.assign(options, { body: formBody });
                        delete options.headers['Content-Type'];
                        break;
                    case 'headers':
                        if (param.name) {
                            headers[param.name] = args[param.index];
                        } else {
                            Object.assign(headers, args[param.index]);
                        }
                        break;
                }
            }
        });
        if (queryString.length > 0) {
            this.options.uri =
                this.options.uri +
                '?' +
                queryString
                    .map((item: any) => {
                        if (typeof item.value === 'object') {
                            return `${item.name}=${encodeURIComponent(JSON.stringify(item.value))}`;
                        } else {
                            return `${item.name}=${encodeURIComponent(item.value)}`;
                        }
                    })
                    .join('&');
        }

        if (body && Object.keys(body).length > 0) {
            Object.assign(this.options, options, { body: JSON.stringify(body) });
        } else {
            Object.assign(this.options, options);
        }

        return this.options;
    }

private parseItem(){
    
}

    public async send() {
        const requestOptions: AxiosRequestConfig = {
            method: this.options.method,
            url: this.options.uri,
            timeout: 1000 * 60 * 5,
            data: this.options.body,
        };
        const response = await axios(requestOptions);
        if (response.status === 200) {
            return response.data;
            // const clone = response.clone();
            // try {

            //     return await response.json();
            // } catch (error) {
            //     return await  clone.blob();
            // }
        } else {
            console.error(response);
            throw new MethodError(response.data, response.status);
        }
    }

    // public async execute() {
    //     const response = await fetch(this.request, this.options);
    //     if (response.ok) {
    //         return response.json();
    //     } else {
    //         throw (new MethodError(response.statusText, response.status));
    //     }
    // }
}
