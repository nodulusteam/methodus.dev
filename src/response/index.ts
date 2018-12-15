export * from './methodError';
export * from './methodEvent';
export * from './methodResult';
export * from './methodMessage';

export function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}
