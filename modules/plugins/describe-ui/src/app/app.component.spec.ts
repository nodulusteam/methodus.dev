import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from '../modules/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutes } from './routes';
import { MenuComponent } from './menu/menu.component';
import { RefreshService } from './services/refresh.service';

describe('AppComponent', () => {




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(appRoutes),
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        MenuComponent,
      ],
      providers: [
        RefreshService,
      ]
    }).compileComponents();

  }));
});
