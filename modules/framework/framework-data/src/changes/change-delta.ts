export class ChangeDelta{
    property: Array<string>;
    value: {};

    constructor() {
        this.property = new Array();
        this.value = new Object();
    }
   
    //This is a workaround because JSON.stringify is not working for Set Type
    get properties(): Set<string>{ 
        return new Set(this.property);
    }
    set properties(values: Set<string>){
        this.property = Array.from(values);
    }
}