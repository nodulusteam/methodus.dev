import { Method, MethodConfig, Verbs, Body, Param, Query, MethodResult } from '../../index';

export class Deserializable {
    public static deserialize(data) {
        const parsedObject = JSON.parse(data);
        const returnObject = new Deserializable();
        returnObject.name = parsedObject.name;
        returnObject.date = new Date(parsedObject.date);
        returnObject.bool = parsedObject.bool;
        return returnObject;
    }
    public name: string;
    public date: Date;
    public bool: boolean;

}

@MethodConfig('TestClass')
export class TestClass {
    @Method(Verbs.Get, '/api/testclass/:id/:name')
    public async action1(@Param('id') id: number, @Param('name') name: string) {
        console.log(`action1: ${id} ${name}`);
        return new MethodResult({ id, name, add: 3 * id });
    }

    @Method(Verbs.Post, '/api/testclass/posts')
    public async action2(@Body() item) {
        return new MethodResult(item);
    }

    @Method(Verbs.Get, '/api/testclass/action5')
    public async action5(@Query('someObject', Deserializable) someObject: Deserializable,
        @Query('minDate', Date) minDate: Date, @Query('maxDate', Date) maxDate: Date): Promise<any> {
        console.log(someObject, minDate, maxDate);
        return new MethodResult({ someObject, minDate, maxDate });
    }

    @Method(Verbs.Delete, '/api/testclass/action3')
    public async action3() {
        console.log('action3');
    }
}
