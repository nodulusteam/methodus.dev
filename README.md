# Methodulus


### motivation
i wanted to create a dynamic procedure flow, with each segment with it's own setup.

`npm i -S methodulus`


```
import { Method, MethodConfig, Verbs, MethodType, Body, Param, Query } from 'methodulus';
const endPoint = 'http://localhost:8080';//https://jsonplaceholder.typicode.com';
const debug = require('debug')('methodulus');
@MethodConfig('TestClass', endPoint)
export class TestClass {
    constructor() { }

    @Method(Verbs.Get, '/posts/:id/:name')
    public action1( @Param('id') id: number, @Param('name') name: string) {
        // console.log('action1 was called');
        console.log({ id: id, name: name });
        return { id: id, name: name };
    }


    @Method(Verbs.Post, '/posts/')
    public action2( @Body() item) {
        console.log(item);
        return item;

    }


    @Method(Verbs.Delete, 'api/acion1')
    public action3() {
        console.log('action3');
    }
}

```