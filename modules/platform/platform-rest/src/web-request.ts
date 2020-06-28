import 'reflect-metadata';
import axios, { AxiosRequestConfig, Method } from 'axios';
import * as https from 'https';

import * as fs from 'fs';
import * as path from 'path';
import * as tunnel from 'tunnel';
import { Encoder } from './encoder';
import { Dictionary, RequestParams, MethodusObject } from './interfaces';
import commons, { AuthType } from '@methodus/framework-commons';

const logger = new commons.Logger('transports:http');

export type RequestPayload = {
    params: any[];
    uri: string;
    body: any;
    query: any;
    headers: any;
    files: any;
    securityContext?: any;
    verb: string;
    parts: string[];
    auth?: AuthType;
    authOptions: any;
};

/**
 * @hidden
 */
export class WebRequest {
    onBeforeRequest?: Function;
    // private _requestOptions: any;
    constructor() {}

    handleParamsMap(paramsMap: any[], payload: RequestPayload) {
        paramsMap.forEach((item: any) => {
            item.value = payload.params[item.index];
            switch (item.from) {
                case 'params':
                    if (item.name) {
                        payload.uri = payload.uri.replace(':' + item.name, item.value);
                    } else {
                        Object.keys(item.value).forEach((element) => {
                            payload.uri = payload.uri.replace(':' + element, item.value[element]);
                        });
                    }
                    break;

                case 'body':
                    if (item.name) {
                        (payload.body as Dictionary)[item.name] = item.value;
                    } else {
                        if (typeof item.value === 'object' && !Array.isArray(item.value)) {
                            Object.assign(payload.body, item.value);
                        } else {
                            payload.body = item.value;
                        }
                    }

                    break;
                case 'query':
                    if (item.name) {
                        payload.query[item.name] = item.value;
                    } else {
                        Object.assign(payload.query, item.value);
                    }
                    break;
                case 'security_context':
                    payload.securityContext = {
                        uid: item.value.uid,
                        user_id: item.value.user_id,
                    };
                    break;
                case 'headers':
                    if (item.name) {
                        payload.headers[item.name] = item.value;
                    } else {
                        Object.assign(payload.headers, item.value);
                    }
                    break;

                case 'files':
                    if (item.name) {
                        payload.files[item.name] = item.value;
                    } else {
                        Object.assign(payload.files, item.value);
                    }
                    break;
            }
        });
        return payload;
    }
    handleQuery(payload: RequestPayload) {
        if (Object.keys(payload.query).length > 0) {
            payload.uri +=
                '?' +
                Object.keys(payload.query)
                    .map((element: any) => {
                        if (Array.isArray(payload.query[element])) {
                            return payload.query[element]
                                .map((subelement: any) => {
                                    if (typeof subelement !== 'string') {
                                        return `${element}=${encodeURIComponent(JSON.stringify(subelement))}`;
                                    } else {
                                        return `${element}=${encodeURIComponent(subelement)}`;
                                    }
                                })
                                .join('&');
                        }

                        if (payload.query[element] && payload.query[element].toISOString) {
                            // test for date
                            return `${element}=${encodeURIComponent(payload.query[element].toISOString())}`;
                        } else if (typeof payload.query[element] !== 'string') {
                            // test for other object types
                            return `${element}=${encodeURIComponent(JSON.stringify(payload.query[element]))}`;
                        } else {
                            return `${element}=${encodeURIComponent(payload.query[element])}`;
                        }
                    })
                    .join('&');
        }
        return payload;
    }

    handleProxy(requestOptions: any, payload: RequestPayload) {
        let mixedProtocolProxySettings = false;
        if (process.env.METHODUS_PROXY) {
            if (payload.uri.indexOf('https://') === 0 && process.env.METHODUS_PROXY_PORT! !== '443') {
                mixedProtocolProxySettings = true;
            }

            Object.assign(requestOptions, {
                proxy: {
                    host: process.env.PROXY,
                    port: process.env.PROXY_PORT,
                },
            });
        }

        if (payload.uri.indexOf('https://') === 0) {
            const hostParts = payload.uri.split('://')[1].split('/')[0].split(':');
            const sslPort = hostParts[1] ? Number(hostParts[1]) : 443;

            let agent;
            if (!mixedProtocolProxySettings) {
                agent = new https.Agent({
                    host: hostParts[0],
                    port: sslPort,
                    path: payload.parts.join('/').split('?')[0] || '',
                    rejectUnauthorized: false,
                });
                Object.assign(requestOptions, { httpsAgent: agent });
            } else {
                agent = tunnel.httpsOverHttp({
                    proxy: {
                        host: process.env.METHODUS_PROXY!,
                        port: Number(process.env.METHODUS_PROXY_PORT!),
                    },
                });

                Object.assign(requestOptions, { httpsAgent: agent, proxy: false });
            }
        } else {
            requestOptions = {
                method: payload.verb.toLowerCase() as Method,
                url: payload.uri,
                timeout: 1000 * 60 * 5,
            };

            if (process.env.METHODUS_PROXY && process.env.METHODUS_PROXY_PORT) {
                Object.assign(requestOptions, { proxy: { host: process.env.METHODUS_PROXY, port: process.env.METHODUS_PROXY_PORT } });
            }
        }
        return requestOptions;
    }

    async handleAuth(requestOptions: any, payload: RequestPayload) {
        if (payload.auth) {
            logger.log(`Auth is ${JSON.stringify(payload.auth)}`);
            switch (payload.auth) {
                case AuthType.Basic:
                    requestOptions.headers = requestOptions.headers || {};
                    if (typeof payload.authOptions === 'function') {
                        requestOptions.headers['Authorization'] = await payload.authOptions.apply(this, [requestOptions]);
                    } else if (payload.authOptions.user && payload.authOptions.password) {
                        const base64HEader = Encoder.encodeBase64(`${payload.authOptions.user}:${payload.authOptions.password}`);
                        requestOptions.headers['Authorization'] = `Basic ${base64HEader}`;
                    } else if (payload.authOptions.token) {
                        requestOptions.headers['Authorization'] = `Basic ${payload.authOptions.token}`;
                    }

                    // requestOptions.auth = {
                    //     username: authOptions.user,
                    //     password: authOptions.password,
                    // };
                    break;
                // case AuthType.ApiKey:
                //     break;
                case AuthType.BearerToken:
                    requestOptions.headers = requestOptions.headers || {};
                    if (typeof payload.authOptions === 'function') {
                        requestOptions.headers['Authorization'] = await payload.authOptions.apply(this, [requestOptions]);
                    } else {
                        requestOptions.headers['Authorization'] = payload.authOptions.token;
                    }
                    break;
                // case AuthType.DigestAuth:
                //     break;
            }
        }
        return requestOptions;
    }
    handleFiles(requestOptions: any, payload: RequestPayload) {
        if (payload.files && payload.files.length > 0) {
            const file: any = payload.files[0];
            const formData: any = {
                custom_file: {
                    value: fs.createReadStream(path.resolve(file.path)),
                    options: {
                        filename: file.originalname,
                        contentType: file.mimetype,
                        size: file.size,
                    },
                },
            };
            Object.assign(requestOptions.data, formData);
        } else if (payload.files && payload.files.readable) {
            const formData: any = {
                custom_file: {
                    value: payload.files,
                    options: {
                        filename: path.basename(payload.files.path),
                    },
                },
            };
            requestOptions.data = formData;
            Object.assign(requestOptions.data, formData);
        }
        return requestOptions;
    }

    handleHeaders(requestOptions: any, payload: RequestPayload) {
        requestOptions.headers = {};
        if (typeof payload.body === 'object') {
            if (Object.keys(payload.body).length) {
                requestOptions.data = payload.body;
                requestOptions.headers['Content-Type'] = 'application/json';
            }
        } else if ((payload.body as string).length) {
            requestOptions.data = payload.body;
            requestOptions.headers['Content-Type'] = 'application/xml';
        }

        if (payload.securityContext) {
            Object.assign(requestOptions.headers, {
                security_context: JSON.stringify(payload.securityContext),
            });
        }

        if (payload.headers && Object.keys(payload.headers).length > 0) {
            if (!requestOptions.headers) {
                requestOptions.headers = {};
            }
            Object.assign(requestOptions.headers, payload.headers);
        }
        return requestOptions;
    }
    async sendRequest(methodus: MethodusObject, uri: string, params: any[], paramsMap: RequestParams[], securityContext?: any): Promise<any> {
        const auth: AuthType = methodus._auth.type || AuthType.None;
        const authOptions: any = methodus._auth.options;
        const verb = methodus.verb;

        let body: Dictionary<string> | string = {};
        const headers: Dictionary = {};
        const query: Dictionary = {};
        const files: Dictionary = [];
        const parts = uri.split('://')[1].split('/');
        parts.splice(0, 1);

        const payload = this.handleParamsMap(paramsMap, {
            auth,
            authOptions,
            params,
            uri,
            body,
            query,
            headers,
            files,
            verb,
            parts,
        });
        this.handleQuery(payload);
        let requestOptions: AxiosRequestConfig = {
            method: verb.toLowerCase() as Method,
            baseURL: uri,
            url: uri,
            timeout: 1000 * 60 * 5,
        };

        requestOptions = this.handleProxy(requestOptions, payload);
        requestOptions = this.handleHeaders(requestOptions, payload);
        requestOptions = this.handleFiles(requestOptions, payload);
        requestOptions = await this.handleAuth(requestOptions, payload);

        logger.debug('Request options are: ', JSON.stringify(requestOptions));
        if (this.onBeforeRequest) {
            this.onBeforeRequest(requestOptions);
        }

        // this._requestOptions = requestOptions;
        debugger;
        return requestOptions;
    }

    async send(requestOptions: any) {
        try {
            return await axios.request(requestOptions);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
