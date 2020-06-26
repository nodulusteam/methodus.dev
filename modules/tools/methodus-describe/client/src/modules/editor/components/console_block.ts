import { OutputService } from '../output.service';
import { BaseBlock } from './base_block';

declare var Blockly: any;

export class ConsoleBlock extends BaseBlock {
    constructor(public displayName: string,
        public type: string,
        persistCallback: any,
        public output: OutputService

    ) {
        super();
        if (type) {
            const blockTypeName = type;
            Blockly.Blocks[blockTypeName] = {
                init: (/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        this.appendDummyInput()
                            .appendField('Console.log(');
                        this.appendValueInput('message')
                            .setCheck(null);
                        this.appendDummyInput()
                            .appendField(')');
                        this.setInputsInline(true);
                        this.setPreviousStatement(true, null);
                        this.setNextStatement(true, null);
                        this.setColour('#44719c');
                        this.setTooltip('');


                        Blockly.JavaScript[blockTypeName] = function (block) {
                            var value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
                            const code = `Console(${value_message});\n`;
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
        const output = this.output;
        const stringify = this.stringify;
        const consoleWrapper = function (message) {
            try {
                output.log('log: ' + stringify(message.data));
            } catch (e) {
                output.log(message.data);
            }
        };
        interpreter.setProperty(scope, 'Console', interpreter.createNativeFunction(consoleWrapper));
    }
}
