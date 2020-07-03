import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestRouteService } from './test-route.service';

describe('TestRouteService', () => {
    let service: TestRouteService;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [TestRouteService],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        service = new TestRouteService();
        window.confirm = () => true;
    });

    it('prepare', async () => {
        service.prepare(
            'http://jsonplaceholder.typicode.com/todos/:id',
            'list',
            [{ index: 0, from: 'params', name: 'id', value: 1 }],
            { body: 'body-value' },
            ['page=1', 'pagesize=10'],
            {}
        );

        expect(service.request).toBeDefined();
    });

    it('activate', async () => {
        const result = await service.activate('http://jsonplaceholder.typicode.com/todos/:id', {
            params: [{ index: 0, from: 'params', name: 'id', value: 1 }],
        }, {});
        expect(result).toBeDefined();
    });
});
