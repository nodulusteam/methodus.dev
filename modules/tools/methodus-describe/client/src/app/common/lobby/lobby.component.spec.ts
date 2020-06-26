import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SharedModule } from '../../../modules/shared.module';
import { LobbyComponent } from './lobby.component';
import { LoaderComponent } from '../loader/loader.component';
import { KeysPipe } from '../../pipes/keys-pipe';
import { LobbyItemComponent } from '../lobby.item/lobby.item.component';
import { LoaderService } from '../../services/loader.service';

describe('LobbyComponent', () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        LobbyComponent,
        LoaderComponent,
        KeysPipe,
        LobbyItemComponent],
      providers: [LoaderService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(LobbyComponent);
        component = fixture.componentInstance;
      });

  }));



  it('should create', () => {
    component = fixture.componentInstance;

    component.items = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });

  it('deleteItemHandler', () => {

    component.deleteItemHandler({});
    expect(component).toBeTruthy();
  });

  it('editItemHandler', () => {
    component.items = [];
    component.editItemHandler({});
    expect(component).toBeTruthy();
  });

  it('newItemHandler', () => {

    component.newItemHandler({});
    expect(component).toBeTruthy();
  });

  it('selectItemHandler', () => {
    component.items = [];
    component.selectItemHandler({});
    expect(component).toBeTruthy();
  });

  it('getHeading', () => {

    const result = component.getHeading('key', 1);
    expect(result).toBe('key (1)');
  });
});
