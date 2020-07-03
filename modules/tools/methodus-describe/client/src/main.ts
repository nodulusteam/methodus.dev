
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
let methodType = 'Http';
if (window.location.host === 'localhost:4200') {
  (window as any).METHODUS_CONFIG = { DescribeView: { transport: 'Mock', methodType: 'Mock' } };
} else {
  (window as any).METHODUS_CONFIG = { DescribeView: { transport: 'Http', methodType: 'Http' } };
}

import { DescribeView } from '@methodus/describe-client';
export const contract = new DescribeView();



import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'reflect-metadata';

if (environment.production) {
  enableProdMode();
}

if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');

}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));




