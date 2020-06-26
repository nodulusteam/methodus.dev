import { OutputService } from '../output.service';

declare var Blockly: any;

export class JsonBlock {
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
                            .appendField(displayName);
                        this.appendValueInput('json')
                            .setCheck('String');
                        this.setInputsInline(true);
                        this.setOutput(true, null);
                        this.setColour('#44719c');



                        Blockly.JavaScript[blockTypeName] = function (block) {
                            var value_json = Blockly.JavaScript.valueToCode(block, 'json', Blockly.JavaScript.ORDER_ATOMIC);

                            const code = `JSONparse(${value_json})`;
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
        return `<block type='${this.type}'></block>`;
    }
    public register(interpreter, scope) {
        const parseWrapper = function (message) {
            return interpreter.createPrimitive(JSON.parse(message.data || message));
        };
        interpreter.setProperty(scope, 'JSONparse', interpreter.createNativeFunction(parseWrapper));
    }
}



 
