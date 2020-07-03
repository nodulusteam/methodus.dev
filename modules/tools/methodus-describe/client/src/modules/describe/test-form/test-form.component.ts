import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Injector } from '@methodus/client';
import { ActivatedRoute, Router } from '@angular/router';
import { DescribeView } from '../../shim';
import { TestRouteService } from '../test-route.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
    public testRouteService: TestRouteService, public navigationService: NavigationService,
  ) { }
  inRequest = false;
  navigationResult: any;
  resultsMode = 'result';
  actionResult: any;
  actionResultJson: string;
  controllerName: string;
  methodName: string;
  methodInfo: any;
  actionInfo: any;
  baseUrl: string;
  auth: number;
  auth_user: string;
  auth_password: string;
  auth_token: string;




  editorOptions = { theme: 'vs-dark', language: 'json' };
  fieldOptions = {
    theme: 'vs-light', language: 'json', minimap: {
      enabled: false
    }
  };
  navigationtabs = [{ name: 'result', selected: true }, { name: 'history', selected: false }];
  tabs = [{ name: 'method', selected: true }, { name: 'result', selected: false }, { name: 'navigation', selected: false }];
  primitives = ['string', 'number'];


  runSanitize(url: string): string {
    return this.sanitizer.bypassSecurityTrustUrl(url) as string;
  }

  setAuth(auth: number) {
    this.auth = auth;
  }
  selectNavigationTab(tab) {
    this.navigationtabs.forEach(element => {
      element.selected = false;
    });
    tab.selected = true;
    this.resultsMode = tab.name;

  }


  selectTab(tab) {
    this.tabs.forEach(element => {
      element.selected = false;
    });
    tab.selected = true;

  }


  async navigate(nav) {

    this.navigationService.add({ name: nav });
    this.methodName = nav.action;
    this.methodInfo = await Injector.get<DescribeView>('DescribeView').action(this.controllerName, this.methodName);
    // this.methodInfo = this.actionInfo.methodus._descriptors[this.methodName];
    // this.baseUrl = this.actionInfo.base;

    if (this.methodInfo) {

      const descriptor = this.methodInfo.methodus._descriptors[this.methodInfo.actionKey];
      const routeArr = descriptor.route.split('/');
      const navArr = nav.href.split('/').slice(2);

      const variables: any = {};
      routeArr.forEach((routePart, index) => {
        if (routePart.indexOf(':') === 0) {
          variables[`field_${index}`] = { index: index, name: routePart.replace(':', '') };
        }
      });

      navArr.forEach((routePart, index) => {
        if (variables[`field_${index}`]) {
          variables[`field_${index}`].value = routePart;
        }
      });

      descriptor.params.forEach((param, index) => {
        Object.values(variables).forEach((item: any) => {
          if (item.name === param.name) {
            param.value = item.value;
          }
        });
      });

    }

    this.tabs[0].selected = true;
    this.tabs[1].selected = false;
    this.tabs[2].selected = false;
    this.actionResultJson = '';
    this.navigationResult = [];

  }
  ngOnInit() {

    this.route.params.subscribe(async (data) => {


      this.controllerName = data.controller;
      this.methodName = data.method;
      this.methodInfo = await Injector.get<DescribeView>('DescribeView').action(this.controllerName, this.methodName);



      //this.methodInfo = this.actionInfo.methodus._descriptors[this.methodName];
      //  this.baseUrl = this.actionInfo.base;
      if (this.methodInfo) {
        const parameterStr = localStorage.getItem(`${this.methodInfo.verb}_${this.methodInfo.route}`);
        if (parameterStr) {
          const values = JSON.parse(parameterStr);
          this.methodInfo.params.forEach((param, index) => {
            if (this.forTextBox(param.from, param.type)) {
              param.value = values[index];
            } else {
              param.value = JSON.stringify(values[index], null, 2);
            }
          });
        } else {
          this.methodInfo.params.forEach((param, index) => {
            if (!this.forTextBox(param.from, param.type)) {
              param.value = JSON.stringify(param.schema, null, 2);
            }
          });

        }
      }


      this.tabs[0].selected = true;
      this.tabs[1].selected = false;
      this.tabs[2].selected = false;
      this.actionResultJson = '';

    });
  }

  forParams(from) {

    if (['request', 'response', 'security-context'].indexOf(from) > -1) {
      return false;
    }
    return true;
  }
  forTextArea(from, type) {
    return this.forParams(from) && this.primitives.indexOf(type) === -1;
  }

  forTextBox(from, type) {
    return this.forParams(from) && this.primitives.indexOf(type) > -1;
  }

  public activationResult: {
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
  };

  public resetForm() {
    localStorage.removeItem(`${this.methodInfo.verb}_${this.methodInfo.route}`);
    this.methodInfo.params.forEach((param, index) => {
      if (this.forTextBox(param.from, param.type)) {
        param.value = '';
      } else {
        param.value = JSON.stringify(param.schema, null, 2);
      }
    });
  }


  async testMethod() {
    const values = [];
    this.inRequest = true;

    this.methodInfo.params.forEach((param) => {
      if (!this.forTextBox(param.from, param.type)) {
        try {
          const jsonValue = JSON.parse(param.value);
          values.push(jsonValue);
        } catch (error) {//
          // console.warn('Invalid json data');
          values.push({});
        }

      } else {
        values.push(param.value);
      }
    });


    localStorage.setItem(`${this.methodInfo.verb}_${this.methodInfo.route}`, JSON.stringify(values));
    const clone = JSON.parse(JSON.stringify(this.methodInfo));
    clone.params.forEach((param, index) => {
      param.value = values[index];
    });
    const authOptions: any = {};
    if (this.auth) {
      switch (this.auth) {
        case 1:
          authOptions.type = this.auth;
          authOptions.user = this.auth_user;
          authOptions.password = this.auth_password;
          break;
        case 3:
          authOptions.type = this.auth;
          authOptions.token = this.auth_token;
          break;
      }
    }

    try {
      let response = null;
      let actionRoute = clone.route;
      if (this.methodInfo.isRemote) {

        clone.verb = 'POST';
        clone.params = [{
          from: 'body',
          index: 0,
          name: 'methodInfo',
          type: 'object',
          value: {
            propertyKey: clone.propertyKey,
            params: clone.params,
            controllerName: this.controllerName
          }
        }];

        actionRoute = '/describe/remote-test';
      }
      response = await this.testRouteService.activate(actionRoute, clone, authOptions);
      this.activationResult = {
        status: response.status,
        statusText: response.statusText,
        redirected: response.redirected,
        type: response.type,
        url: response.url,
      };

      this.actionResult = await response.json();
      const headersStr = response.headers.get('Link');

      if (headersStr) {
        const headers = JSON.parse(headersStr);
        this.navigationResult = headers.map((navigationItem) => {
          const navigationObject: any = {};
          const arr = navigationItem.split(',');
          arr.forEach((pair) => {
            const actionArr = pair.split('=');
            navigationObject[actionArr[0]] = actionArr[1];
          });
          return navigationObject;
        });
      }


      this.actionResultJson = JSON.stringify(this.actionResult, null, 2);


    } catch (error) {
      this.actionResultJson = JSON.stringify(error);
    }
    setTimeout(() => {
      this.inRequest = false;
    }, 100);
    this.tabs[0].selected = false;
    this.tabs[1].selected = true;
    this.tabs[2].selected = false;

  }
}
