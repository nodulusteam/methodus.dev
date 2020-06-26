import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { BlocklyComponent } from './blockly.component';
import { NgxToolboxBuilderService } from 'ngx-blockly';
import { RouterTestingModule } from '@angular/router/testing';
import { TestOutputService } from '../test-ouput.service';
import { OutputService } from '../output.service';
import { RemoteCallService } from '../remote-call.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { HotkeyModule  } from 'angular2-hotkeys';
import { DescribeView } from '@methodus/describe-client';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





describe('BlocklyComponent', () => {
  let component: BlocklyComponent;
  let fixture: ComponentFixture<BlocklyComponent>;
  let describeView: DescribeView;

  beforeEach(async(() => {

    new DescribeView();

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        BsDropdownModule.forRoot(),
        HotkeyModule.forRoot(),
      ],
      declarations: [BlocklyComponent],
      providers: [
        NgxToolboxBuilderService,
        TestOutputService,
        OutputService,
        RemoteCallService,


      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(BlocklyComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
