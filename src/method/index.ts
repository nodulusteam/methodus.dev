export * from './method-config';
export * from './deserialize';

import { Methods as MethodNS } from './method';
import { Methods as MethodConfigNS } from './method-config';

import { Methods as MethodPipeNS } from './method-pipe';
import { Methods as MethodConfigBaseNS } from './method-config-base';
import { Methods as MethodMockNS } from './method-mock';

/**
 * @hidden
 */
export const MethodPipe = MethodPipeNS.MethodPipe;
/**
 * @hidden
 */
export const Method = MethodNS.Method;

/**
 * @hidden
 */
export const MethodConfigBase = MethodConfigBaseNS.MethodConfigBase;

/**
 * @hidden
 */
export const MethodMock = MethodMockNS.MethodMock;

/**
 * @hidden
 */
export const MethodConfig = MethodConfigNS.MethodConfig;
