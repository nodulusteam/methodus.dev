import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { SharedModule } from '../../../modules/shared.module';
import { LoaderService } from '../../services/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LoaderComponent],
      providers: [LoaderService]
    })
      .compileComponents().then((resolve) => {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
