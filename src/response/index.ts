export * from './methodError';
export * from './methodResult';

/**
 * @hidden
 */
export function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}
