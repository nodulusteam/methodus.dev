import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DirtyService } from '../services/dirty.service';

describe('DirtyService', () => {
    let service: DirtyService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            declarations: [],
            providers: [DirtyService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();


    }));

    beforeEach(() => {
        service = new DirtyService();
        window.confirm = (() => true);
    });

    it('should setDirty dialog true', () => {
        return new Promise((resolve, reject) => {
            service.dirty.subscribe((value: boolean) => {
                expect(value).toBeTruthy();
                resolve();
            });
            service.setDirty();
        });
    });
    it('should setDirty dialog false', () => {
        return new Promise((resolve, reject) => {
            service.dirty.subscribe((value: boolean) => {
                expect(value).toBeFalsy();
                resolve();
            });
            service.clearDirty();
        });
    });

    it('should warn dirty', () => {

        service.setDirty();
        const res = service.warn();
        expect(res).toBeTruthy();
    });

    it('should warn', () => {

        service.clearDirty();
        const res = service.warn();
        expect(res).toBeTruthy();
    });


    it('should setSaving true', () => {
        return new Promise((resolve, reject) => {
            service.saving.subscribe((value: boolean) => {
                expect(value).toBeTruthy();
                resolve();
            });
            service.setSaving();
        });
    });

    it('should clearSaving false', () => {
        return new Promise((resolve, reject) => {

            service.saving.subscribe((value: boolean) => {
                expect(value).toBeFalsy();
                resolve();
            });
            service.clearSaving();
        });
    });

    it('should detectChanges', () => {
        return new Promise((resolve, reject) => {
            service.detect.subscribe((value: boolean) => {
                expect(value).toBeFalsy();
                resolve();
            });
            service.clearDirty();
            service.detectChanges();

        });
    });


});
