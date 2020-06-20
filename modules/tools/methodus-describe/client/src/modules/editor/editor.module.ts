import { NgModule, ModuleWithProviders } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '../shared.module';
import { Routes, RouterModule } from '@angular/router';
import { BlocklyComponent } from './blockly/blockly.component';
import { RemoteCallService } from './remote-call.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OutputService } from './output.service';
import { TestOutputService } from './test-ouput.service';
import { HotkeyModule } from 'angular2-hotkeys';

import { ClipboardModule } from 'ngx-clipboard';

export const editorRoutes: Routes = [
  {
    path: 'blocky', component: BlocklyComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    AccordionModule.forRoot(),
    RouterModule.forChild(editorRoutes),
    BsDropdownModule.forRoot(),
    HotkeyModule,
    ClipboardModule,
  ],
  declarations: [
    BlocklyComponent,

  ],
  entryComponents: [BlocklyComponent],
  providers: [
    RemoteCallService,
    OutputService,
    TestOutputService,
  ],
  exports: [

    RouterModule,

  ],
})



export class EditorModule {
  constructor() {
    // this language will be used as a fallback when a translation isn't found in the current language

  }

  static forRoot(loader): ModuleWithProviders<EditorModule> {
    return {
      ngModule: EditorModule,
      providers: [],
    };
  }
}
