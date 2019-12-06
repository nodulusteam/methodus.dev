import 'reflect-metadata';
export * from './express';
import * as express from 'express';
export * from './Router';
import { ServerDefinition } from '@methodus/server';
import { ExpressPlugin } from './express';

export const Express: ServerDefinition = {
    name: 'express',
    module: ExpressPlugin,
    static: express.static
}
