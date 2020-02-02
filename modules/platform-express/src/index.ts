import 'reflect-metadata';
import * as express from 'express';
import { ServerDefinition } from '@methodus/server';
export * from './verbs';
export * from './express';
export * from './router';
export * from './parser';
import { ExpressPlugin } from './express';
import { RestParser, RestResponse } from './parser';


export const Express: ServerDefinition = {
    name: 'express',
    module: ExpressPlugin,
    static: express.static,
    parser: RestParser,
    response: RestResponse

}  
