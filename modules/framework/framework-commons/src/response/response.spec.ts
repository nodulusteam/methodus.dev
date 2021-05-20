import 'reflect-metadata';
import { MethodResult, MethodResultStatus } from './method.result';
import { MethodError } from './method.error';

describe('Response', () => {
    it('error', async () => {
        try {
            throw new MethodError('my error');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('method result', async () => {
        const result = new MethodResult('my result', 100, 1);
        result.setHeader('key', 'value');
        expect(result.result).toBeDefined();
    });

    it('method result', async () => {
        const result = new MethodResultStatus('my result', 500);
        result.setHeader('key', 'value');

        expect(result.result).toBeDefined();
        expect(result.statusCode).toEqual(500);
    });

    it('method result', async () => {
        const result = new MethodResult('my result', 100, 1);

        const mockObject: any = { name: 'Object' };
        mockObject.methodus = {
            Object: {
                _descriptors: {
                    updateBy: {
                        name: 'updateBy',
                        propertyKey: 'updateBy',
                        params: [{ name: 'name', from: 'body' }],
                    },
                },
                name: 'Object',
            },
        };

        result.linkAction('updateBy', mockObject, 'name', {});
        expect(result.result).toBeDefined();
    });

    it('method result array', async () => {
        const result = new MethodResultStatus(['my result'], 200, 100, 1);

        const mockObject: any = { name: 'Object' };
        mockObject.methodus = {
            Object: {
                _descriptors: {
                    updateBy: {
                        name: 'updateBy',
                        route: '/:id/update',
                        propertyKey: 'updateBy',
                        params: [{ name: 'name', from: 'params' }],
                    },
                },
                name: 'Object',
            },
        };

        result.linkAction('updateBy', mockObject, 'name', {});
        expect(result.result).toBeDefined();

        const links = result.getLinks();
        expect(links).toBeDefined();
    });
});
