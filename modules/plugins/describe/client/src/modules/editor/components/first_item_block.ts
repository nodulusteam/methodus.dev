import { OutputService } from '../output.service';

declare var Blockly: any;

export class FirstItemBlock {
    constructor(public displayName: string, public type: string, persistCallback: any, public output: OutputService) {
        //  super(type, null, null);
        if (type) {
            const blockTypeName = type;
            Blockly.Blocks[blockTypeName] = {
                init: (/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        this.appendDummyInput()
                            .appendField("Get First Item of");
                        this.appendValueInput("list")
                            .setCheck("Array");
                        this.setInputsInline(true);
                        this.setOutput(true, null);
                        this.setColour('#44719c');



                        Blockly.JavaScript[blockTypeName] = function (block) {
                            var value_list = Blockly.JavaScript.valueToCode(block, 'list', Blockly.JavaScript.ORDER_ATOMIC);

                            const code = `first(${value_list})`;
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
    public register(interpreter, scope) {
        const firstWrapper = function (message) {
            if (message.data && message.data.length) {
                return interpreter.createPrimitive(message.data[0]);
            } else {
                return interpreter.createPrimitive(null);
            }
        };

        interpreter.setProperty(scope, 'first', interpreter.createNativeFunction(firstWrapper));


    }
}
