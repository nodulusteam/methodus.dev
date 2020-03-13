import { Mocker } from '../mocker';
import { TestController } from './controllers';
import { Injector, MethodResult, MethodError, Injectable } from './shim';
import { deserialize } from '../method/deserialize';



@Injectable('ParserForundefined')
export class ParserForMocker {
    /**
     *
     */
    constructor() {

    }
    parse(args: any, paramsMap: any, functionArgs: any): ParserResponse {


        functionArgs = functionArgs || [];
        paramsMap.forEach((item: any) => {
            let value = null;
            const typeForDeserialization = (item.actualType.odm) ? item.actualType : item.type;
            value = deserialize({ value: args[item.index], type: typeForDeserialization });
            functionArgs.push(value);
        });
        return new ParserResponse(functionArgs, false, {});
    }

}



/**
 * @hidden
 */
@Injectable('ResponseForundefined')
export class MockerResponse {
    constructor() { }

    public handle(args: any, methodResult: MethodResult | MethodError | any, headers: any) {

        return methodResult;

    }

}
class ParserResponse {
    args: any;
    isRest: boolean;
    securityContext: any;
    constructor(args: any, isRest: boolean, securityContext: any) {
        this.args = args;
        this.isRest = false;
        this.securityContext = securityContext;
    }
}

describe('Test additional method classes', () => {
    it('TestController mock', async () => {

        const testController = Injector.get(TestController);
        Mocker.mock(TestController);
        const mockResult = await testController.list('', '');
        expect(mockResult).toBeDefined();
    });

    it('TestController mock for server', async () => {

        const testController = Injector.get(TestController);
        Mocker.mockServer(TestController);
        const mockResult = await testController.list('', '');
        expect(mockResult).toBeDefined();
    });

});