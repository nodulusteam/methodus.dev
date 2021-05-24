import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SlideHeaderComponent } from './slide-header.component';
import { SharedModule } from '../../../modules/shared.module';
import { DirtyService } from '../../services/dirty.service';

describe('SlideHeaderComponent', () => {
  let component: SlideHeaderComponent;
  let fixture: ComponentFixture<SlideHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SlideHeaderComponent],
      providers: [DirtyService]
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(SlideHeaderComponent);
        component = fixture.componentInstance;

      });
  }));

  it('should create', () => {

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
