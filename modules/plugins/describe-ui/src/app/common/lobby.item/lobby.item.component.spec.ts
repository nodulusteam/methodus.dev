import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LobbyItemComponent } from './lobby.item.component';
import { SharedModule } from '../../../modules/shared.module';

describe('LobbyItemComponent', () => {
  let component: LobbyItemComponent;
  let fixture: ComponentFixture<LobbyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LobbyItemComponent],
      providers: []
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(LobbyItemComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
