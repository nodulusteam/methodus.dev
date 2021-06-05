import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideFooterComponent } from './slide-footer.component';

describe('SlideFooterComponent', () => {
  let component: SlideFooterComponent;
  let fixture: ComponentFixture<SlideFooterComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SlideFooterComponent],
      providers: []
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SlideFooterComponent);
        component = fixture.componentInstance;
      });

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
