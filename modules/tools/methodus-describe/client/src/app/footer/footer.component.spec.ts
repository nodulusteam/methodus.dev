import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../../modules/shared.module';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [FooterComponent],
      providers: []
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
