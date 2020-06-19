
import { MethodError } from './method.error';

describe('Test MethodError', () => {
    it('create with string ', async () => {
        const result = new MethodError('An error message');
        expect(result.error).toBe('An error message');
    });

    it('createNewMethodErrorWithError', async () => {
        const result = new MethodError(new Error('my errror'));
        expect(result).not.toBeNull();
    });

    it('createNewMethodError With additionals', async () => {
        const result = new MethodError(new Error('my errror'), 503, { ref: 'some-ref' });
        expect(result.additional['ref']).toBe('some-ref');
        expect(result.statusCode).toBe(503);
    });

    // it('createNewMethodErrorWithObjectError', async () => {
    //     const result = new MethodError({ message: 'my-message', error: 'my-message', statusCode: 503 });
    //     expect(result).not.toBeNull();
    // });
});
