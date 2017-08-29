
export { MethodResult } from './response/methodResult';
export { MethodError } from './response/methodError';
export { MethodEvent } from './response/methodEvent';
export { MethodMessage } from './response/methodMessage';

export function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}
