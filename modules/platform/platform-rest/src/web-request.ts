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

/**
 * @hidden
 */
export class WebRequest {
    constructor() {}

    async sendRequest(methodus: MethodusObject, uri: string, params: any[], paramsMap: RequestParams[], securityContext?: any) {
        const auth: AuthType = methodus._auth.type || AuthType.None;
        const authOptions: any = methodus._auth.options;
        const verb = methodus.verb;

        let body: Dictionary<string> | string = {};
        const headers: Dictionary = {};
        const query: Dictionary = {};
        const files: Dictionary = [];
        paramsMap.forEach((item: any) => {
            item.value = params[item.index];
            switch (item.from) {
                case 'params':
                    if (item.name) {
                        uri = uri.replace(':' + item.name, item.value);
                    } else {
                        Object.keys(item.value).forEach((element) => {
                            uri = uri.replace(':' + element, item.value[element]);
                        });
                    }
                    break;

                case 'body':
                    if (item.name) {
                        (body as Dictionary)[item.name] = item.value;
                    } else {
                        if (typeof item.value === 'object' && !Array.isArray(item.value)) {
                            Object.assign(body, item.value);
                        } else {
                            body = item.value;
                        }
                    }

                    break;
                case 'query':
                    if (item.name) {
                        query[item.name] = item.value;
                    } else {
                        Object.assign(query, item.value);
                    }
                    break;
                case 'security_context':
                    securityContext = {
                        uid: item.value.uid,
                        user_id: item.value.user_id,
                    };
                    break;
                case 'headers':
                    if (item.name) {
                        headers[item.name] = item.value;
                    } else {
                        Object.assign(headers, item.value);
                    }
                    break;

                case 'files':
                    if (item.name) {
                        files[item.name] = item.value;
                    } else {
                        Object.assign(files, item.value);
                    }
                    break;
            }
        });
        if (Object.keys(query).length > 0) {
            uri +=
                '?' +
                Object.keys(query)
                    .map((element: any) => {
                        if (Array.isArray(query[element])) {
                            return query[element]
                                .map((subelement: any) => {
                                    if (typeof subelement !== 'string') {
                                        return `${element}=${encodeURIComponent(JSON.stringify(subelement))}`;
                                    } else {
                                        return `${element}=${encodeURIComponent(subelement)}`;
                                    }
                                })
                                .join('&');
                        }

                        if (query[element] && query[element].toISOString) {
                            // test for date
                            return `${element}=${encodeURIComponent(query[element].toISOString())}`;
                        } else if (typeof query[element] !== 'string') {
                            // test for other object types
                            return `${element}=${encodeURIComponent(JSON.stringify(query[element]))}`;
                        } else {
                            return `${element}=${encodeURIComponent(query[element])}`;
                        }
                    })
                    .join('&');
        }

        const parts = uri.split('://')[1].split('/');
        parts.splice(0, 1);
        let requestOptions: AxiosRequestConfig = {
            method: verb.toLowerCase() as Method,
            baseURL: uri,
            url: uri,
            timeout: 1000 * 60 * 5,
        };

        let mixedProtocolProxySettings = false;

        if (process.env.METHODUS_PROXY) {
            if (uri.indexOf('https://') === 0 && process.env.METHODUS_PROXY_PORT! !== '443') {
                mixedProtocolProxySettings = true;
            }

            Object.assign(requestOptions, {
                proxy: {
                    host: process.env.PROXY,
                    port: process.env.PROXY_PORT,
                },
            });
        }

        if (uri.indexOf('https://') === 0) {
            const hostParts = uri.split('://')[1].split('/')[0].split(':');
            const sslPort = hostParts[1] ? Number(hostParts[1]) : 443;

            let agent;
            if (!mixedProtocolProxySettings) {
                agent = new https.Agent({
                    host: hostParts[0],
                    port: sslPort,
                    path: parts.join('/').split('?')[0] || '',
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
                method: verb.toLowerCase() as Method,
                url: uri,
                timeout: 1000 * 60 * 5,
            };

            if (process.env.METHODUS_PROXY && process.env.METHODUS_PROXY_PORT) {
                Object.assign(requestOptions, { proxy: { host: process.env.METHODUS_PROXY, port: process.env.METHODUS_PROXY_PORT } });
            }
        }

        if (auth) {
            logger.log(`Auth is ${JSON.stringify(auth)}`);
            switch (auth) {
                case AuthType.Basic:
                    requestOptions.headers = requestOptions.headers || {};
                    if (typeof authOptions === 'function') {
                        requestOptions.headers['Authorization'] = await authOptions.apply(this, [requestOptions]);
                    } else if (authOptions.user && authOptions.password) {
                        const base64HEader = Encoder.encodeBase64(`${authOptions.user}:${authOptions.password}`);
                        requestOptions.headers['Authorization'] = `Basic ${base64HEader}`;
                    } else if (authOptions.token) {
                        requestOptions.headers['Authorization'] = `Basic ${authOptions.token}`;
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
                    if (typeof authOptions === 'function') {
                        requestOptions.headers['Authorization'] = await authOptions.apply(this, [requestOptions]);
                    } else {
                        requestOptions.headers['Authorization'] = authOptions.token;
                    }
                    break;
                // case AuthType.DigestAuth:
                //     break;
            }
        }

        if (typeof body === 'object') {
            if (Object.keys(body).length) {
                requestOptions.data = body;
                headers['Content-Type'] = 'application/json';
            }
        } else if ((body as string).length) {
            requestOptions.data = body;

            headers['Content-Type'] = 'application/xml';
        }

        if (securityContext) {
            Object.assign(requestOptions.headers, {
                security_context: JSON.stringify(securityContext),
            });
        }

        if (headers && Object.keys(headers).length > 0) {
            if (!requestOptions.headers) {
                requestOptions.headers = {};
            }
            Object.assign(requestOptions.headers, headers);
        }

        if (files && files.length > 0) {
            const file: any = files[0];
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
        } else if (files && files.readable) {
            const formData: any = {
                custom_file: {
                    value: files,
                    options: {
                        filename: path.basename(files.path),
                    },
                },
            };
            requestOptions.data = formData;
            Object.assign(requestOptions.data, formData);
        }

        logger.log('Request options are: ', JSON.stringify(requestOptions));
        try {
            const result = await axios.request(requestOptions);
            logger.log('Request success');
            return result;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
