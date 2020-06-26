import { OutputService } from '../output.service';

declare var Blockly: any;

export class PropertyGetBlock {
    constructor(public displayName: string, public type: string, persistCallback: any,  public output: OutputService) {
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
                            .appendField("From Object");
                        this.appendValueInput("_object")
                            .setCheck("Object");

                        this.appendDummyInput()
                            .appendField("Property Get");
                        this.appendValueInput("property")
                            .setCheck("String");
                        this.setInputsInline(true);
                        this.setOutput(true, null);
                        this.setColour('#44719c');

                        Blockly.JavaScript[blockTypeName] = function (block) {
                            var value_object = Blockly.JavaScript.valueToCode(block, '_object', Blockly.JavaScript.ORDER_ATOMIC);
                            var value_property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_ATOMIC);
                            const code = `Property_get(${value_object},${value_property})`;
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
        const parseWrapper = function (object, property) {
            return interpreter.createPrimitive(object.data[property.data]);
        };
        interpreter.setProperty(scope, 'Property_get', interpreter.createNativeFunction(parseWrapper));
    }
}
