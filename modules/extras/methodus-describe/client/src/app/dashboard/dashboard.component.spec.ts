import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SharedModule } from '../../modules/shared.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../common/loader/loader.component';
import { LoaderService } from '../services/loader.service';

export function getToken(): string {
  return sessionStorage.getItem('token');
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule],
      declarations: [DashboardComponent, MenuComponent, LoaderComponent],
      providers: [LoaderService]
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
    });
  }));
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
