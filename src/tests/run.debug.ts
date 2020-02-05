import { deserialize } from "../method/deserialize";


// import { Injector } from './shim';
// import { TestController } from './controllers';
// import { EmitterTestServer } from './servers/emitter.server';

(async () => {


    const deserializeResult = deserialize({ value: '{ "name": "my name" }' })
    console.log(deserializeResult);

    // let server: EmitterTestServer;





    // await new Promise(async (resolve, reject) => {
    //     server = new EmitterTestServer();
    //     server.on('ready', () => {
    //         resolve();
    //     });
    // });



    // const testController = Injector.get(TestController);

    // const mockResult = await testController.testTypes(new Date().toISOString() as any,  'somstring', 'true' as any);


    // return mockResult;
})()
