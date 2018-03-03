import { TestClass } from '../classes/TestClass';
import { Server, MethodType, MethodusConfig } from '../../index';
import {} from './servers'

async function test() {

    
    let server = new Server(process.env.PORT);
   // server.app.useClass(TestClass);

    let myClass = new TestClass();
    myClass.action1(1, 'roi');



    // var request = require('request');

    // var options = {
    //     method: 'POST',
    //     url: 'http://127.0.0.1:8090/posts',
    //     headers:
    //     {
    //         'postman-token': '04a12df6-cad2-b5cd-f5b9-c7de540964da',
    //         'cache-control': 'no-cache',
    //         'content-type': 'application/json'
    //     },
    //     body: { name: 'roi', id: '1' },
    //     json: true
    // };

    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);

    //     console.log(body);
    // });



    // let me = new TestClass();
    // let result = await me.action1(1, 2, 'xxxx');
    // await me.action2();
    // await me.action3();

    // let de = new Proxy<MyClass>().proxify(me, ProxyType.Local);
    // let dethisOne = await de.action1(1, 2, 'xxxx');
    // console.log('call result local', dethisOne);


    // let be = new Proxy<MyClass>().proxify(me, ProxyType.Http);
    // let thisOne = await be.action1(1, 2, 'bbbb');
    // console.log('call result', thisOne);

}
//test();
