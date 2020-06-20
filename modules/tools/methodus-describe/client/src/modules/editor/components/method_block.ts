import { EventEmitter } from '@angular/core';
import { BaseBlock } from './base_block';
import { RemoteCallService } from '../remote-call.service';
import { OutputService } from '../output.service';


declare var Blockly: any;

export class MethodBlock extends BaseBlock {

  constructor(public displayName: string,
    public type: string,
    public method: any,
    persistCallback: any, controller: string,
    public lastBlockIdEmitter: EventEmitter<string>,
    public output: OutputService
  ) {
    super();
    if (this.type) {
      const blockDisplayName = displayName;
      const blockTypeName = type;
      Blockly.Blocks[blockTypeName] = {
        init: (/**
                     * @return {?}
                     */
          function () {
            /** @type {?} */
            this.appendDummyInput()
              .appendField(blockDisplayName + ' (');

            let numberOfParams = method.params.length - 1;
            method.params.forEach((param, index) => {




              if (!shouldCode(param)) {
                numberOfParams--;
                return;
              }

              const key = param.name || param.from;

              this.appendDummyInput()
                .appendField(key + ':');
              this.appendValueInput(key)

              if (numberOfParams - 1 > index) {
                this.appendDummyInput()
                  .appendField(' ,');
              } else {
                this.appendDummyInput()
                  .appendField(')');
              }
            });
            this.setInputsInline(true);
            this.setOutput(true);

            this.setColour('#603278');
            this.setTooltip('');
            this.setHelpUrl('');

            Blockly.JavaScript[blockTypeName] = function (block) {
              const args = method.params.filter((param) => shouldCode(param)).map((param) => {
                const val = Blockly.JavaScript.valueToCode(block, param.name || param.from, Blockly.JavaScript.ORDER_ATOMIC);
                return val;
              }).join(',');

              const code = `${controller}_${displayName}(${args})`;
              return [code, Blockly.JavaScript.ORDER_ATOMIC];
            };

            this.setOnChange((/**
                         * @param {?} changeEvent
                         * @return {?}
                         */
              (changeEvent) => {
                persistCallback(changeEvent);
              }));
          })
      };
    }

  }
  block: any;

  toXML() {
    return `<block type="${this.type}"></block>`;
  }

  public register(interpreter, scope, apiObjects, callService: RemoteCallService) {
    // let lastBlockId = '';
    // this.lastBlockIdEmitter.subscribe((lastId) => {
    //   lastBlockId = lastId;
    // });
    const stringify = this.stringify;
    const output = this.output;
    // Begin routes api
    Object.keys(apiObjects).forEach((controller) => {
      Object.keys(apiObjects[controller]).forEach((key) => {
        interpreter.setProperty(scope, `${controller}_${key}`, interpreter.createAsyncFunction(function () {
          const functionArguments = arguments;
          const callback = functionArguments[functionArguments.length - 1];
          new Promise(async function (resolve, reject) {
            const clone = cloneObject(apiObjects[controller][key]);

            clone.params.filter(param => shouldCode(param)).forEach(function (param, index) {
              if (index < functionArguments.length) {
                if (functionArguments[index]) {
                  if (functionArguments[index].data !== undefined) {
                    param.value = functionArguments[index].data;
                  } else {
                    param.value = cloneObject(functionArguments[index]);
                  }
                }

              }
            });
            const routeFor = clone.prefix ? clone.prefix + clone.route : clone.route;
            const authOptions: any = {};
            const result = await callService.activate(routeFor, clone);

            if (result.ok) {
              const stringREsult = await result.json();
              output.log(`Evaluating ${controller}.${key}`);
              output.log(`Params: \n ${clone.params.map((param) => {
                return `${param.name || param.from}: ${stringify(param.value)}\n`;
              })}`);
              resolve(stringREsult);
            } else {

              output.log(`Error in ${controller}_${key}`);
              output.log(result.statusText);
              //error message
              try {
                const errorMessage = await result.json();
                output.log(`Message: ${JSON.stringify(errorMessage)}`);
              } catch (error) {

              }
              reject(new Error(result.statusText));
            }

          }).then((value) => {
            output.log(`Result: \n${stringify(value)}`);
            output.log(`Completed ${controller}_${key}\n\n*****`);
            callback(interpreter.createPrimitive(value));
          }).catch((error) => {
            output.log(`error ${stringify(error)}`);
            callback(interpreter.createPrimitive(error));
          });
        }));
      });
    });

  }
}


export function shouldCode(param) {
  return !(
    param.from === 'request' ||
    param.from === 'security-context');
}

export function cloneObject(source) {
  let _clone = source
  try {
    _clone = JSON.parse(JSON.stringify(source));
  } catch (error) {
    console.log(error);
    return source;
  }
  return _clone;

}
