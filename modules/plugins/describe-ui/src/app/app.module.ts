import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsBootstrapUIModule } from '@ng-dynamic-forms/ui-bootstrap';
import { HotkeyModule } from 'angular2-hotkeys';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { SharedModule } from '../modules/shared.module';
import { SharedAppModule } from './shared.app.module';
import { appRoutes } from './routes';

import { RefreshService } from './services/refresh.service';

@NgModule({
  declarations: [AppComponent],

  imports: [
    CommonModule,
    SharedAppModule.forRoot(),
    SharedModule.forRoot(),
    HttpClientModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    SortableModule.forRoot(),
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    OrderModule,
    DynamicFormsBootstrapUIModule,
    BrowserAnimationsModule,
    HotkeyModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {
        relativeLinkResolution: 'corrected',
        enableTracing: false,
        useHash: true,
      } // <-- debugging purposes only
    ),
  ],
  providers: [RefreshService],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
