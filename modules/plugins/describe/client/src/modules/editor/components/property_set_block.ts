import { OutputService } from '../output.service';

declare var Blockly: any;

export class PropertySetBlock {
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
                            .appendField("Set Property");
                        this.appendValueInput("property")
                            .setCheck("String");


                        this.appendDummyInput()
                            .appendField("Of Object ");
                        this.appendValueInput("_object")
                            .setCheck("Object");

                        this.appendDummyInput()
                            .appendField("With Value");
                        this.appendValueInput("value");


                        this.setPreviousStatement(true, null);
                        this.setNextStatement(true, null);

                        this.setInputsInline(true);
                         
                        this.setColour('#44719c');

                        Blockly.JavaScript[blockTypeName] = function (block) {
                            var value_object = Blockly.JavaScript.valueToCode(block, '_object', Blockly.JavaScript.ORDER_ATOMIC);
                            var value_property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_ATOMIC);
                            var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
                            const code = `Property_set(${value_object},${value_property}, ${value_value});\n`;
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
        return `<block type="${this.type}"></block>`;
    }
    public register(interpreter, scope) {
        const parseWrapper = function (object, property, value) {
            object.data[property.data] = value.data;
            return object;
        };
        interpreter.setProperty(scope, 'Property_set', interpreter.createNativeFunction(parseWrapper));
    }
}
