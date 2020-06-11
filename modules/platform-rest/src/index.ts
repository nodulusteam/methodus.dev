import * as plugin from './sender';
export * from './web-request';
export * from './interfaces';
export const name: string = 'Http/Rest';
export const Http = { name: 'Http', class: plugin };
