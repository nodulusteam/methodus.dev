import 'reflect-metadata';
import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import * as https from 'https';
import { AuthType, Logger } from '@methodus/server';
import * as fs from 'fs';
import * as path from 'path';

export type Dictionary<T = any> = { [key: string]: T };
const logger = new Logger('transports:http');

export interface RequestParams {
    from: string;
    name?: string;
    value?: any;
    index: number;
}

/**
 * @hidden
 */
export class WebRequest {
    constructor(public auth: AuthType = AuthType.None, public authOptions: any = {}) {}

    async sendRequest(verb: string, uri: string, params: any[], paramsMap: RequestParams[], securityContext?: any) {
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
                        Object.keys(item.value).forEach(element => {
                            uri = uri.replace(':' + element, item.value[element]);
                        });
                    }
                    break;

                case 'body':
                    if (item.name) {
                        (body as Dictionary)[item.name] = item.value;
                    } else {
                        if (typeof item.value === 'object') {
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
                            return `${element}=${query[element].toISOString()}`;
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
        let requestOptions: AxiosRequestConfig;

        if (uri.indexOf('https://') === 0) {
            const hostParts = uri
                .split('://')[1]
                .split('/')[0]
                .split(':');
            const sslPort = hostParts[1] ? Number(hostParts[1]) : 443;

            const agent = new https.Agent({
                host: hostParts[0],
                port: sslPort,
                path: parts.join('/').split('?')[0] || '',
                rejectUnauthorized: false,
            });

            requestOptions = {
                method: verb.toLowerCase() as Method,
                baseURL: uri,
                url: uri,

                timeout: 1000 * 60 * 5,
                httpAgent: agent, // add when working with https sites
                httpsAgent: agent,
            };
        } else {
            requestOptions = {
                method: verb.toLowerCase() as Method,
                url: uri,
                timeout: 1000 * 60 * 5,
            };
        }

        if (this.auth) {
            logger.log('Auth is ${JSON.stringify(this.auth)}');
            switch (this.auth) {
                case AuthType.Basic:
                    requestOptions.auth = {
                        username: this.authOptions.user,
                        password: this.authOptions.password,
                    };
                    break;
                // case AuthType.ApiKey:
                //     break;
                // case AuthType.BearerToken:
                //     break;
                // case AuthType.DigestAuth:
                //     break;
            }
        }

        if (process.env.PROXY) {
            Object.assign(requestOptions, {
                proxy: {
                    host: process.env.PROXY,
                    port: process.env.PROXY_PORT,
                },
            });
        }

        if (typeof body === 'object') {
            if (Object.keys(body).length) {
                requestOptions.data = body;
            }
            headers['Content-Type'] = 'application/json';
        } else if ((body as string).length) {
            requestOptions.data = body;

            headers['Content-Type'] = 'application/xml';
        }

        if (securityContext) {
            requestOptions.headers = {
                security_context: JSON.stringify(securityContext),
            };
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
        const returnedPipe = await this.promiseToTry(requestOptions);
        return returnedPipe;
    }

    public async promiseToTry(axiosOptions: AxiosRequestConfig): Promise<AxiosResponse> {
        try {
            const instance = axios.create(axiosOptions);
            const result = await instance.request(axiosOptions);
            return result;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
