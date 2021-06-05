import { NgModule, ModuleWithProviders } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { AngularSplitModule } from 'angular-split';
import { AngularMaterialModule } from './angular-material.module';
import { AdaptHeightDirective } from '../app/directives/adapt-height';
import { NgxBlocklyModule } from 'ngx-blockly';


const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false, automaticLayout: true },
  onMonacoLoad: monacoLoad,
};


export function monacoLoad() {
  const _monaco = (<any>window).monaco;
  // validation settings
  _monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  });
}

@NgModule({
  imports: [
    NgxBlocklyModule,
    CommonModule,
    FormsModule,
    AccordionModule.forRoot(),
    MonacoEditorModule.forRoot(monacoConfig),
    HttpClientTestingModule,
    AngularMaterialModule,
    BsDropdownModule.forRoot(),
    AngularSplitModule.forRoot(),
  ],
  declarations: [
    AdaptHeightDirective
  ],
  providers: [


  ],
  exports: [
    RouterTestingModule,
    CommonModule,
    AccordionModule,
    AngularSplitModule,
    AngularMaterialModule,
    AdaptHeightDirective,
    MonacoEditorModule,
    NgxBlocklyModule,

  ],
})
export class SharedModule {
  constructor() {

  }

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,

      providers: [],
    };
  }
}
