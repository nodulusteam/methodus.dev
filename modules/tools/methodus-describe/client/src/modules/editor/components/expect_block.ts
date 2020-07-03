import { EventEmitter } from '@angular/core';
import { OutputService } from '../output.service';
import { TestOutputService } from '../test-ouput.service';

declare var Blockly: any;
export class Expectation {
    result?: boolean;
    constructor(public testValue: any,
        public value: any,
        public operator: string) {

    }

}
export class ExpectBlock {
    constructor(public displayName: string, public type: string, persistCallback: any,
        public lastBlockIdEmitter: EventEmitter<string>,
        public output: OutputService,
        public testOutput: TestOutputService) {
        //  super(type, null, null);
        if (type) {
            const blockDisplayName = displayName;
            const blockTypeName = type;
            Blockly.Blocks[blockTypeName] = {
                init: (/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        this.appendDummyInput()
                            .appendField(blockDisplayName);
                        // this.appendDummyInput();
                        this.appendValueInput('Result');
                        //.setCheck('Object');
                        // this.appendDummyInput()
                        //     .appendField('.');
                        // this.appendValueInput('Property')
                        //     .setCheck('String');
                        this.appendDummyInput().appendField(new Blockly.FieldDropdown([['Equal', '=='], ['Not Equal', '!='],
                        ['Lesser than', '<'], ['Greater than', '>'],]), 'Operator');
                        this.appendValueInput('ToBe');
                        // this.appendValueInput('Operator')
                        //     .setCheck('String')
                        //     .appendField(new Blockly.FieldDropdown([['Equal', 'Equal'],
                        //     ['Lesser than', 'Lesser than'], ]), 'Verb');



                        this.setInputsInline(true);
                        this.setPreviousStatement(true, null);
                        this.setNextStatement(true, null);

                        this.setColour('#618c5f');
                        this.setTooltip('');
                        this.setHelpUrl('');

                        Blockly.JavaScript[blockTypeName] = function (block) {


                            const value_Result = Blockly.JavaScript.valueToCode(block, 'Result', Blockly.JavaScript.ORDER_ATOMIC);


                            const value_Operator = block.getFieldValue('Operator');
                            const value_toBe = Blockly.JavaScript.valueToCode(block, 'ToBe', Blockly.JavaScript.ORDER_ATOMIC);
                            const code = `Expect(${value_Result},'${value_Operator}',${value_toBe} );\n`;
                            return code;

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
        return `<block type='${this.type}'></block>`;
    }
    public register(interpreter, scope) {

        let lastBlockId = '';
        this.lastBlockIdEmitter.subscribe((lastId) => {
            lastBlockId = lastId;
        });

        const service = this.testOutput;

        // Begin Expect api
        const expectWrapper = function (testedValue, operator, expectedValue) {
            const expectation = new Expectation(testedValue.data, expectedValue.data, operator.data);
            service.expect(expectation);

            switch (operator.data) {
                case '==':
                    expectation.result = (testedValue.data === expectedValue.data);
                    break;
                case '!=':
                    expectation.result = (testedValue.data !== expectedValue.data);
                    break;
                case '<':
                    expectation.result = (testedValue.data < expectedValue.data);
                    break;
                case '>':
                    expectation.result = (testedValue.data > expectedValue.data);
                    break;
            }

            if (expectation.result) {
                Blockly.mainWorkspace.getBlockById(lastBlockId).addSuccess();
            } else {

                Blockly.mainWorkspace.getBlockById(lastBlockId).addError();
            }
        };

        interpreter.setProperty(scope, 'Expect', interpreter.createNativeFunction(expectWrapper));
        // End Expect api

    }
}
