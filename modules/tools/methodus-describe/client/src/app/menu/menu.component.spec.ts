import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../../modules/shared.module';
import { LoaderComponent } from '../common/loader/loader.component';
import { LoaderService } from '../services/loader.service';
export function getToken(): string {
  return sessionStorage.getItem('token');
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MenuComponent, LoaderComponent],
      providers: [LoaderService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create MenuComponent', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
