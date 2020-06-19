import { ClassContainer } from './index';

describe('test the class container', () => {
    it('container set', async () => {
        ClassContainer.set('ClassA', []);
        ClassContainer.get('ClassA');
        expect(true).toBe(true);
    });
});
