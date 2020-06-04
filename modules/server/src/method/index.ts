export * from '@methodus/framework-decorators';
export * from './deserialize';


import { Methods as MethodPipeNS } from './method-pipe';
import { Methods as MethodConfigBaseNS } from './method-config-base';
import { Decorators as MethodMockNS } from './method-mock';

/**
 * @hidden
 */
export const MethodPipe = MethodPipeNS.MethodPipe;

/**
 * @hidden
 */
export const MethodConfigBase = MethodConfigBaseNS.MethodConfigBase;

/**
 * @hidden
 */
export const MethodMock = MethodMockNS.Methods.MethodMock;
