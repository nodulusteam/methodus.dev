import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ApiRoutesComponent } from './api-routes.component';
import { SharedModule } from '../../../modules/shared.module';
import { DescribeModule } from '../describe.module';

describe('ApiRoutesComponent', () => {
  let component: ApiRoutesComponent;
  let fixture: ComponentFixture<ApiRoutesComponent>;




  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    TestBed.configureTestingModule({
      imports: [SharedModule, DescribeModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ApiRoutesComponent);
        component = fixture.componentInstance;
      });
  }));



  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
