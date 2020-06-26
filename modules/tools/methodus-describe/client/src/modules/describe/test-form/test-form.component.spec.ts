import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormComponent } from './test-form.component';
import { SharedModule } from '../../../modules/shared.module';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { TestRouteService } from '../test-route.service';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../navigation.service';
import { DomSanitizer } from '@angular/platform-browser';
const mockRouter = {
  params: new Subject<any>()
};

const mockRouteService = {
  activate: () => {
    return {
      json: () => {

      }
    };
  }
};


describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  // constructor(
  //   private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
  //   public testRouteService: TestRouteService, public navigationService: NavigationService,

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, RouterTestingModule],

      declarations: [
        TestFormComponent

      ],
      providers: [
        NavigationService,
        {
          provide: DomSanitizer, useValue: {
            sanitize: () => 'safeString',
            bypassSecurityTrustHtml: () => 'safeString',
            bypassSecurityTrustUrl : () => 'safeString',
          }
        },
        { provide: ActivatedRoute, useValue: mockRouter },
        { provide: TestRouteService, useValue: mockRouteService }
      ],
      schemas: []
    })
      .compileComponents();
      fixture = TestBed.createComponent(TestFormComponent);
      component = fixture.componentInstance;
    // // add it to TestBed module in `providers` array:

    // fixture = TestBed.createComponent(TestFormComponent);
    // component = fixture.componentInstance;
    // component.methodInfo = {
    //   'verb': 'GET', 'route': '/api/player', 'propertyKey': 'list',
    //   'params':
    //     [{ 'type': 'object', 'from': 'query', 'index': 0, 'name': 'filter' },
    //     { 'type': 'number', 'from': 'query', 'index': 1, 'name': 'pageNumber' },
    //     { 'type': 'number', 'from': 'query', 'index': 2, 'name': 'pageSize' },
    //     { 'type': 'string', 'from': 'headers', 'index': 3, 'name': 'host' }]
    // };
    // fixture.detectChanges();
    // expect(component).toBeTruthy();
  }));



  it('load', () => {
    const router = TestBed.get(ActivatedRoute);
    router.params.next({ controller: 'cname', method: 'list' });
    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('navigate', () => {
    component.navigate({ action: 'list', href: 'https://jsonplaceholder.typicode.com/todos/1' });
    expect(component).toBeTruthy();

  });


  it('selectTab', () => {

    component.selectTab(component.tabs[0]);
    expect(component.tabs[0].selected).toBeTruthy();
  });


  // it('selectNavigationTab', () => {
  //   component.selectNavigationTab(component.navigationtabs[0]);
  //   expect(component.navigationtabs[0].selected).toBeTruthy();
  // });


  // it('sanitaize', () => {
  //   const url = component.runSanitize('https://jsonplaceholder.typicode.com/todos/1');
  //   expect(url).toBeTruthy();
  // });


  // it('testMethod', () => {
  //   component.testMethod();
  //   expect(component).toBeTruthy();
  // });

});
