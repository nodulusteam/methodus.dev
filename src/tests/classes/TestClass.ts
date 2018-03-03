import { Method, MethodConfig, Verbs, MethodType, Body, Param, Query, MethodResult, MethodError, logger } from '../../index';
const endPoint = 'http://localhost:8090';//https://jsonplaceholder.typicode.com';

export class Deserializable {
    public name: string;
    public date: Date;
    public bool: boolean;

    public static deserialize(data) {
        let parsedObject = JSON.parse(data);
        const returnObject = new Deserializable();
        returnObject.name = parsedObject.name;
        returnObject.date = new Date(parsedObject.date);
        returnObject.bool = parsedObject.bool;
        return returnObject;
    }
}

@MethodConfig('TestClass')
export class TestClass {
    constructor() { }

    @Method(Verbs.Get, '/api/testclass/:id/:name')
    public action1(@Param('id') id: number, @Param('name') name: string) {
        console.log(`action1: ${id} ${name}`);
        return new MethodResult({ id: id, name: name, add: id * id });
    }


    // @Method(Verbs.Get, '/posts/error')
    // public error() {
    //     console.log('running error localy');
    //     throw new MethodError('error returned', 500);
    // }


    @Method(Verbs.Post, '/api/testclass/posts')
    public action2(@Body() item) {

        return new MethodResult(item);

    }




    @Method(Verbs.Get, '/api/testclass/action5')
    public action5(@Query('someObject', Deserializable) someObject: Deserializable, @Query('minDate', Date) minDate: Date, @Query('maxDate', Date) maxDate: Date) {
        console.log(someObject, minDate, maxDate);
        return minDate;
    }



    @Method(Verbs.Delete, '/api/testclass/action3')
    public action3() {
        console.log('action3');
    }
}
