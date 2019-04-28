export * from './methodError';
export * from './methodResult';

export function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}
