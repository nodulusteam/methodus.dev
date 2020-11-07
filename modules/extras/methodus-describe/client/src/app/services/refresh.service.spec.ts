import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RefreshService } from '../services/refresh.service';

describe('RefreshService', () => {
    let service: RefreshService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [],
            providers: [RefreshService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        service = new RefreshService();
    });

    it('should subscription', () => {
        const name = 'test';
        const value = 'testValue';
        service.subscription(name).subscribe(() => {
            expect(service).toBeTruthy();
        });
        service.refresh(name, value);
    });
});
