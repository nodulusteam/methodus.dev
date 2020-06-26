import { OutputService } from '../output.service';

declare var Blockly: any;

export class RandomStringBlock {
    constructor(public displayName: string, public type: string, persistCallback: any,  public output: OutputService) {
        if (type) {
            const blockTypeName = type;
            Blockly.Blocks[blockTypeName] = {
                init: (/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        this.appendDummyInput()
                            .appendField("Random string");
                        this.setOutput(true, null);
                        this.setColour('#44719c');
                        this.setTooltip("");
                        this.setHelpUrl("");

                        Blockly.JavaScript[blockTypeName] = function (block) {
                            const code = `RandomString()`;
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
       
        const randomWrapper = function () {
            return interpreter.createPrimitive(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
        };
        interpreter.setProperty(scope, 'RandomString', interpreter.createNativeFunction(randomWrapper));

    }
}
