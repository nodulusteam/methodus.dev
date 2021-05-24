import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [],
      providers: [NavigationService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    service = new NavigationService();
    window.confirm = (() => true);
  });

  it('add', () => {
    service.add({ name: 'histo1' });
    service.add({ name: 'histo2' });
    service.add({ name: 'histo3' });
    service.moveBack();
    expect(service.historyIndex).toBe(2);
  });
});
