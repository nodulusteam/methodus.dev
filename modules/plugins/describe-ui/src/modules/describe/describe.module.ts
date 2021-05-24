import { NgModule, ModuleWithProviders } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TestFormComponent } from './test-form/test-form.component';
import { ApiRoutesComponent } from './api-routes/api-routes.component';
import { TestRouteService } from './test-route.service';
import { NavigationService } from './navigation.service';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '../../modules/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

export const describeRoutes: Routes = [
  { path: '', redirectTo: 'describe', pathMatch: "full" },
  { path: 'describe', component: WelcomeComponent },
  {
    path: 'describe/:type', component: ApiRoutesComponent, children: [
      { path: ':controller/:method', component: TestFormComponent },
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    AccordionModule.forRoot(),
    RouterModule.forChild(describeRoutes),
    BsDropdownModule,
  ],
  declarations: [
    TestFormComponent,
    ApiRoutesComponent,
    WelcomeComponent,
  ],
  entryComponents: [WelcomeComponent, ApiRoutesComponent],
  providers: [
    TestRouteService,
    NavigationService,
  ],
  exports: [
    TestFormComponent,
    ApiRoutesComponent,
    RouterModule,

  ],
})



export class DescribeModule {
  constructor() {
    // this language will be used as a fallback when a translation isn't found in the current language

  }

  static forRoot(loader): ModuleWithProviders<DescribeModule> {
    return {
      ngModule: DescribeModule,
      providers: [TestRouteService],
    };
  }
}
