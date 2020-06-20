import { ExpressTestServer } from './servers/';
import { DescribeView } from '../describeView';
import { TestTarget, TestController } from './controllers';
import { Mocker } from '@methodus/server';
import injection from '@methodus/framework-injection';
import { CopyController } from './controllers/controller.copy';
const TIMEOUT = 1000 * 5 * 60;



describe('Test Xserver configuration', () => {

    const describeView = injection.Injector.get(DescribeView);
    const testController = injection.Injector.get(TestController);
    const testTarget = injection.Injector.get(TestTarget);
    const copyController = injection.Injector.get(CopyController);
    let server;
    beforeAll(() => {
        return new Promise((resolve, reject) => {
            server = new ExpressTestServer();
            server.on('ready', () => {
                resolve();
            });
        });
    });

    afterAll(() => {
        server.kill();
    });




    test('dashboard', () => {
        const response = describeView.dashboard();
        expect(response).resolves.toBeDefined();
    });

    describe('local services', () => {
        test('action', () => {
            const response = describeView.action('TestController', 'update');
            expect(response).resolves.toBeDefined();
        });


        test('dashboard', () => {
            const response = describeView.getMethodusData();
            expect(response).resolves.toBeDefined();
        });

        test('class information', () => {
            const response = describeView.getMethodusDataClass('TestController');
            expect(response).resolves.toBeDefined();
        });

    })

    describe('remote services', () => {
        test('remoteTest', () => {
            const response = describeView.remoteTest({ propertyKey: 'get', controllerName: 'TestTarget', params: [{ name: 'id', value: 1 }] }, 'localhost');
            expect(response).resolves.toBeDefined();
        });
    });
    describe('TestController methods', () => {
        test('list', () => {
            const response = testController.list({}, 1, 10, { headers: { 'host': 'localhost' } });
            expect(response).resolves.toBeDefined();
        });

        test('create', () => {
            expect(testController.create([], [], {})).resolves.toBeDefined();
        });

        test('read', () => {
            expect(testController.read(11)).resolves.toBeDefined();
        });

        test('get', () => {
            expect(testController.get(1, 'localhost')).resolves.toBeDefined();
        });

        test('getByField', () => {
            expect(testController.getByField('some value', 1)).resolves.toBeDefined();
        });

        test('update', () => {
            expect(testController.update()).resolves.toBeDefined();
        });
        test('delete', () => {
            expect(testController.delete('id')).resolves.toBeDefined();
        });
    });


    describe('CopyController methods', () => {
        test('update', () => {
            const response = copyController.update();
            expect(response).resolves.toBeDefined();
        });
        test('delete', () => {
            const response = copyController.delete(1);
            expect(response).resolves.toBeDefined();
        });

    });

    describe('TestTarget methods', () => {
        test('list', () => {
            const response = testTarget.list({}, 1, 10, { headers: { 'host': 'localhost' } });
            expect(response).resolves.toBeDefined();
        });

        test('read', () => {
            expect(testTarget.read(11)).resolves.toBeDefined();
        });




        test('delete', () => {
            expect(testTarget.delete('id')).resolves.toBeDefined();
        });
    });


    describe('Mock tests', () => {

        test('mock dashboard', () => {
            Mocker.mockServer(DescribeView);
            const response = describeView.dashboard();
            expect(response).resolves.toBeDefined();

        });




        test('mock action', () => {
            Mocker.mockServer(DescribeView);
            const response = describeView.action('TestController', 'update');
            expect(response).resolves.toBeDefined();
        });
    });
})




