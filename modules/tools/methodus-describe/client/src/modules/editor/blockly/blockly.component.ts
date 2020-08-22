import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import * as acorn from 'acorn';
import * as FileSaver from 'file-saver';
import * as Interpreter from 'js-interpreter';
import * as es7PluginBuilder from 'acorn-es7-plugin';
es7PluginBuilder(acorn);
import { Injector } from '@methodus/platform-web';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxBlocklyConfig, CustomBlock, NgxBlocklyGeneratorConfig } from 'ngx-blockly';
import {
  NgxToolboxBuilderService,
  LOGIC_CATEGORY,
  LOOP_CATEGORY,
  MATH_CATEGORY,
  TEXT_CATEGORY,
  LISTS_CATEGORY,
  // COLOUR_CATEGORY,
  VARIABLES_CATEGORY,
  FUNCTIONS_CATEGORY,
  Category,
} from 'ngx-blockly';
import { MethodBlock } from '../components/method_block';
import { ExpectBlock } from '../components/expect_block';
import { ConsoleBlock } from '../components/console_block';
import { FirstItemBlock } from '../components/first_item_block';
import { RemoteCallService } from '../remote-call.service';
import { JsonBlock } from '../components/json_block';
import { JsonStringifyBlock } from '../components/json_stringify_block';
import { PropertyGetBlock } from '../components/property_get_block';
import { PropertySetBlock } from '../components/property_set_block';
import { RandomStringBlock } from '../components/random_block';
import { OutputService } from '../output.service';
import { TestOutputService } from '../test-ouput.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { ClipboardService } from 'ngx-clipboard';
import { DescribeView } from '../../shim';

declare var Blockly: any;
let generalObject: BlocklyComponent = null;
const persistingEvents = ['move', 'create', 'delete', 'change'];

Blockly.BlockSvg.prototype.addError = function () {
  Blockly.utils.dom.removeClass(this.svgGroup_, 'expect-success');
  Blockly.utils.dom.addClass(this.svgGroup_, 'expect-error');
};

Blockly.BlockSvg.prototype.addSuccess = function () {
  Blockly.utils.dom.removeClass(this.svgGroup_, 'expect-error');
  Blockly.utils.dom.addClass(this.svgGroup_, 'expect-success');
};

Blockly.BlockSvg.prototype.removeError = function () {
  Blockly.utils.dom.removeClass(this.svgGroup_, 'expect-error');
};
Blockly.BlockSvg.prototype.removeSuccess = function () {
  Blockly.utils.dom.removeClass(this.svgGroup_, 'expect-success');
};

Blockly.Block.prototype.getCommentText = function () {
  return this.commentModel.text || '';
}


const apiObjects: any = {};
let allBlocks = [];

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss'],
})
export class BlocklyComponent implements OnInit {
  @ViewChild('fileInput', { read: ElementRef, static: true }) fileInput;
  public splitConfig = { hor: { sizes: [40, 60] }, ver: { sizes: [60, 40] } };

  constructor(
    public ngxToolboxBuilder: NgxToolboxBuilderService,
    public dialog: MatDialog,
    private router: Router,
    private _hotkeysService: HotkeysService,
    private _clipboardService: ClipboardService,
    private activatedRoute: ActivatedRoute,
    private remoteCallService: RemoteCallService,
    private output: OutputService,
    public testService: TestOutputService
  ) {
    const categories = [];

    // ['cut', 'copy', 'paste'].forEach(function (event) {
    //   document.addEventListener(event, function (e) {
    //     console.log(event);

    //     e.preventDefault();
    //   });
    // });

    this._hotkeysService.add(
      new Hotkey(
        'ctrl+shift+c',
        (event: KeyboardEvent): any => {
          this._clipboardService.copyFromContent(generalObject.activeBlockText);
          let e: ExtendedKeyboardEvent = event;
          e.returnValue = false; // Prevent bubbling
          return e;
        },
        undefined,
        'Copy selection to another workspace'
      )
    );

    this._hotkeysService.add(
      new Hotkey(
        'ctrl+shift+v',
        (event: KeyboardEvent): any => {
          navigator.clipboard.readText().then(clipBoardContent => {
            const domXml = Blockly.Xml.textToDom(clipBoardContent, true);
            Blockly.Xml.domToBlock(domXml, Blockly.mainWorkspace);
          });

          let e: ExtendedKeyboardEvent = event;
          e.returnValue = false; // Prevent bubbling
          return e;
        },
        undefined,
        'Paste clipboard from another workspace'
      )
    );

    {
      const blocks = [];

      blocks.push(new RandomStringBlock('Random String Set', 'random_string_block', this.persist, this.output));
      blocks.push(new ConsoleBlock('Console', 'console_block', this.persist, this.output));
      blocks.push(new FirstItemBlock('First Item', 'first_item_block', this.persist, this.output));
      blocks.push(new JsonBlock('JSON object', 'json_block', this.persist, this.output));
      blocks.push(new JsonStringifyBlock('JSON stringify', 'json_stringify_block', this.persist, this.output));
      blocks.push(new PropertyGetBlock('Property Get', 'property_get_block', this.persist, this.output));
      blocks.push(new PropertySetBlock('Property Set', 'property_set_block', this.persist, this.output));
      allBlocks = allBlocks.concat(blocks);
      categories.push(new Category('Describe', '#44719c', blocks, null));
    }

    {
      const blocks = [];
      [{ key: 'expect_value_tobe', label: 'Expect' }].forEach(blockDefinition => {
        const block: any = new ExpectBlock(
          blockDefinition.label,
          blockDefinition.key,
          this.persist,
          this.lastBlockId,
          this.output,
          this.testService
        );
        blocks.push(block);
      });
      allBlocks = allBlocks.concat(blocks);
      categories.push(new Category('Test', '#618c5f', blocks, null));
    }

    Injector.get<DescribeView>('DescribeView')
      .dashboard()
      .then(methods => {
        const LovalControllersCategory = new Category('Local Controllers', '#603278', [], null);
        methods.routes.forEach(controller => {
          const blocks = [];

          Object.keys(controller.methodus._descriptors).forEach(method => {
            const blockName = `${controller.name}_${method}_block`.toLowerCase();
            const block: any = new MethodBlock(
              method,
              blockName,
              controller.methodus._descriptors[method],
              this.persist,
              controller.name,
              this.lastBlockId,
              this.output
            );

            if (controller.methodus.prefix) {
              block.method.prefix = controller.methodus.prefix;
            }
            blocks.push(block);
            apiObjects[controller.name] = apiObjects[controller.name] || {};
            apiObjects[controller.name][method] = controller.methodus._descriptors[method];
          });
          allBlocks = allBlocks.concat(blocks);
          LovalControllersCategory.blocks.push(new Category(controller.name, '#603278', blocks, null) as any);
        });
        categories.push(LovalControllersCategory);

        const RemoteControllersCategory = new Category('Remote Controllers', '#603278', [], null);

        methods.remoteRoutes.forEach(controller => {
          const blocks = [];

          Object.keys(controller.methodus._descriptors).forEach(method => {
            const blockName = `${controller.name}_${method}_block`.toLowerCase();
            const block: any = new MethodBlock(
              method,
              blockName,
              controller.methodus._descriptors[method],
              this.persist,
              controller.name,
              this.lastBlockId,
              this.output
            );

            if (controller.methodus.prefix) {
              block.method.prefix = controller.methodus.prefix;
            }
            blocks.push(block);
            apiObjects[controller.name] = apiObjects[controller.name] || {};
            apiObjects[controller.name][method] = controller.methodus._descriptors[method];
          });
          allBlocks = allBlocks.concat(blocks);
          RemoteControllersCategory.blocks.push(new Category(controller.name, '#603278', blocks, null) as any);
        });
        categories.push(RemoteControllersCategory);

        //  new Category(blocks, '#603278', controller.name, null

        this.ngxToolboxBuilder.nodes = [
          ...categories,
          LOGIC_CATEGORY,
          LOOP_CATEGORY,
          MATH_CATEGORY,
          TEXT_CATEGORY,
          LISTS_CATEGORY,
          // COLOUR_CATEGORY,
          VARIABLES_CATEGORY,
          FUNCTIONS_CATEGORY,
        ];
        this.config.toolbox = this.ngxToolboxBuilder.build();
        this.loadComplete = true;

        for (var key in localStorage) {
          if (key.indexOf('workspace-') === 0) {
            const workspaceName = key.replace('workspace-', '');
            this.workspaces.push({ name: workspaceName });
          }
        }
        const activespace = localStorage.getItem('active-workspace') || 'default.xml';

        this.loadWorkspace(activespace);

        generalObject = this;
      });
    const str = localStorage.getItem('d-u-hor');
    if (str) {
      this.splitConfig = JSON.parse(str);
    }
  }

  public persistUi(split, $event) {
    this.splitConfig[split].sizes = $event.sizes;
    localStorage.setItem('d-u-hor', JSON.stringify(this.splitConfig));
    Blockly.svgResize(Blockly.mainWorkspace);
  }

  public workspaces = [];
  public activeWorkspace = '';

  public initWorkspace() {
    const workspaceName = prompt('Workspace name');
    if (workspaceName) {
      this.loadWorkspace(workspaceName);
    }
  }

  public deleteWorkspace(workspace: string) {
    if (confirm('Are you sure')) {
      localStorage.removeItem(`workspace-${workspace}`);
      const removeThis = this.workspaces.filter(item => {
        return item.name === workspace;
      });
      this.workspaces.splice(this.workspaces.indexOf(removeThis), 1);
      const activespace = localStorage.getItem('active-workspace') || 'default.xml';
      if (workspace === activespace) {
        this.loadWorkspace(this.workspaces[this.workspaces.length - 1].name);
      }
    }
  }

  public prevent($event) {
    $event.cancelBubble = true;
    $event.preventDefault();
    return false;
  }

  public editWorkspaceCancel($event, workspace) {
    $event.cancelBubble = true;
    $event.preventDefault();
    workspace.rename = false;
  }

  public editWorkspaceAccept($event, workspace) {
    const str = localStorage.getItem(`workspace-${workspace.name}`);
    localStorage.setItem(`workspace-${workspace.newname}`, str);
    localStorage.removeItem(`workspace-${workspace.name}`);
    workspace.name = workspace.newname;
    delete workspace.newname;

    $event.cancelBubble = true;
    $event.preventDefault();

    workspace.rename = false;
  }

  public editWorkspace($event, workspace) {
    workspace.newname = workspace.name;
    $event.cancelBubble = true;
    $event.preventDefault();

    workspace.rename = true;
  }

  public loadWorkspace(workspace: string) {
    this.activeWorkspace = workspace;

    const exist = this.workspaces.filter(ws => {
      return ws.name === workspace;
    }).length;

    if (!exist) {
      this.workspaces.push({ name: workspace });
    }

    localStorage.setItem('active-workspace', workspace);
    let workspaceStr = localStorage.getItem(`workspace-${workspace}`);
    if (!workspaceStr) {
      workspaceStr = `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;
    }

    setTimeout(() => {
      if (Blockly.mainWorkspace) {
        Blockly.mainWorkspace.clear();

        const xmlDocument = Blockly.Xml.textToDom(workspaceStr);
        this.listOfIds = Blockly.Xml.domToWorkspace(xmlDocument, Blockly.mainWorkspace);

        Blockly.mainWorkspace.setVisible(false);
        Blockly.mainWorkspace.setVisible(true);
        setTimeout(() => {
          Blockly.mainWorkspace.addChangeListener(this.persist);
        }, 1000);
      }
    }, 1000);
  }

  public loadComplete = false;
  private listOfIds = [];

  public javascriptCode: string;

  fieldOptions = {
    theme: 'vs-light',
    language: 'javascript',
    minimap: {
      enabled: false,
    },
  };
  public customBlocks: CustomBlock[] = [
    // new MethodBlock('methodus_method', null, null),
  ];

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    javascript: true,
  };

  toggleState: any = {};
  public config: NgxBlocklyConfig = {
    scrollbars: true,
    trashcan: true,
  };

  private highlightPause = false;
  private interpreter: any;
  private lastBlockId: EventEmitter<string> = new EventEmitter();

  private highlightBlock(id) {
    this.highlightPause = true;
    console.log(id);
    Blockly.mainWorkspace.highlightBlock(id);
    setTimeout(() => {
      this.highlightPause = false;
    }, 1000);
    return true;
  }

  private initApi(interpreter, scope) {
    //  new ExpectBlock(null, null, null, this.lastBlockId).register(interpreter, scope);

    // Begin highlight api
    const wrapper = id => {
      id = id ? id.toString() : '';
      this.lastBlockId.emit(id);
      return interpreter.createPrimitive(generalObject.highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
    // End highlight api

    allBlocks.forEach((block: MethodBlock) => {
      block.register(interpreter, scope, apiObjects, this.remoteCallService);
    });
  }

  public resetStepUi(clearOutput) {
    Blockly.mainWorkspace.highlightBlock(null);
    this.highlightPause = false;
  }

  public async stepCode() {
    if (!this.interpreter) {
      this.testService.expectations = [];
      // First statement of this code.
      // Clear the program output.
      this.resetStepUi(true);
      this.output.clear();

      Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      Blockly.JavaScript.addReservedWords('highlightBlock');

      Interpreter.PARSE_OPTIONS.ecmaVersion = 8;
      Interpreter.PARSE_OPTIONS.allowAwaitOutsideFunction = true;

      const latestCode = `async function start() {
        ${Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace)}
      };
      start();
      `;

      this.interpreter = new Interpreter(latestCode, this.initApi.bind(this));
      Blockly.JavaScript.STATEMENT_PREFIX = '';
      // And then show generated code in an alert.
      // In a timeout to allow the outputArea.value to reset first.
      setTimeout(() => {
        // alert('Ready to execute the following code\n' +
        //   '===================================\n' + latestCode);
        // this.highlightPause = true;

        this.stepCode();
      }, 1);
      return;
    }
    this.highlightPause = false;
    let hasMoreCode = false;

    try {
      hasMoreCode = this.interpreter.step();
    } catch (error) {
      console.log(error);
    }
    if (this.highlightPause) {
      await new Promise(resolve => {
        const interval = setInterval(() => {
          if (!this.highlightPause) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }

    if (!hasMoreCode) {
      // Program complete, no more code to execute.
      // outputArea.value += '\n\n<< Program complete >>';
      this.interpreter = null;
      this.resetStepUi(false);
    } else {
      setTimeout(() => {
        this.stepCode();
      }, 1);
    }
  }

  public export() {
    const dom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    const domText = Blockly.Xml.domToPrettyText(dom);
    const fileToSave = new Blob([domText], {
      type: 'application/json',
    });
    // Save the file
    FileSaver.saveAs(fileToSave, 'tests.xml');
  }
  public activeBlockId: string;
  public activeBlockText: string;
  private persist(event) {
    if (persistingEvents.indexOf(event.type) > -1) {
      const dom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace, true);
      const domText = Blockly.Xml.domToPrettyText(dom, true);
      localStorage.setItem(`workspace-${generalObject.activeWorkspace}`, domText);
    } else if (
      event.type == Blockly.Events.UI &&
      event.element === 'selected' &&
      event.newValue &&
      event.newValue !== generalObject.activeBlockId
    ) {
      generalObject.activeBlockId = event.newValue;
      const activeBlock = Blockly.mainWorkspace.getBlockById(event.newValue);
      const dom = Blockly.Xml.blockToDom(activeBlock, true);
      generalObject.activeBlockText = Blockly.Xml.domToPrettyText(dom);
    }
  }

  triggerUpload() {
    const fileBrowser = this.fileInput.nativeElement;
    fileBrowser.click();
  }

  readForUpload(eventData) {
    const fileReader = new FileReader();
    fileReader.onload = async (e: any) => {
      try {
        if (e.target.result) {
          const workspaceName = prompt('Workspace name');
          if (workspaceName) {
            localStorage.setItem(`workspace-${workspaceName}`, e.target.result);
            this.loadWorkspace(workspaceName);
            Blockly.mainWorkspace.setVisible(false);
            Blockly.mainWorkspace.setVisible(true);
          }

          // // try {
          // //   // Blockly.mainWorkspace.clear();

          // //   this.loadWorkspace('workspace');

          // //   // const xmlDocument = Blockly.Xml.textToDom(e.target.result);
          // //   // this.listOfIds = Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDocument.childNodes[0], Blockly.mainWorkspace);

          // // } catch (error) {
          // //   console.error(error);
          // // }
        }
      } catch (error) {
        console.warn(error);
        alert('file error');
      }
    };
    fileReader.readAsText(eventData.target.files[0]);
  }

  toggle(id) {
    if (this.toggleState[id] === undefined) {
      this.toggleState[id] = false;
    }
    this.toggleState[id] = !this.toggleState[id];
  }
  public onCode(code) {
    this.javascriptCode = code;
    const latestCode = `(function() {
    ${code}
})`;

    try {
      acorn.parse(latestCode, {
        allowAwaitOutsideFunction: true,
        plugins: { asyncawait: true },
        ecmaVersion: 8,
      } as any);
    } catch (error) {
      console.log(error);
    }
  }
  async ngOnInit() { }
}
