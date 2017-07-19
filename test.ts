import { TestClass } from './tests/classes/test-class';
import { Server, MethodType, MethodulusConfig } from './index';
const { spawn } = require('child_process');



async function testRest() {

    MethodulusConfig.config['TestClass'] = MethodType.Http;
    MethodulusConfig.servers = ["rest"];
    const server = new Server(process.env.PORT);
    server.useClass(TestClass);
    let myClass = new TestClass();
    let res = await myClass.action1(199999999, "roi hagever");
    console.log(res);



}

async function testSocket() {
    MethodulusConfig.config['TestClass'] = MethodType.Socket;
    MethodulusConfig.servers = ["socketio"];
    let server = new Server(process.env.PORT);
    server.app.useClass(TestClass);

    let myClass = new TestClass();
    myClass.action1(1654564654, "roicccccc");

}


async function spawn2() {

    MethodulusConfig.config['TestClass'] = MethodType.Http;
    MethodulusConfig.servers = ["rest"];
    let server = new Server(8080);
    server.useClass(TestClass);

    const child1 = spawn(process.argv[0], ['./tests/servers/dynamic.js'], { detached: true, cwd: __dirname, env: { PORT: 8091, METHODTYPE: MethodType.Local } });

    setTimeout(async () => {
        let myClass = new TestClass();
        console.log('sending the call');
        let result = await myClass.action1(1654564654, "roicccccc");
        console.log(result);
    }, 5000)


    child1.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child1.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    child1.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });


}



async function spawn3() {

     MethodulusConfig.config['TestClass'] = MethodType.Socket;
     MethodulusConfig.servers = ["socketio"];
     let server = new Server(8080);
    // server.useClass(TestClass);

    const child1 = spawn(process.argv[0], ['./tests/servers/dynamic.js'], {
        detached: true, cwd: __dirname,
        env: { servers: ['rest','socketio'], PORT: 8091, METHODTYPE: MethodType.Local }
    });

    setTimeout(async () => {
        let myClass = new TestClass();
        console.log('sending the call');
        let result = await myClass.action1(1654564654, "roicccccc");
        console.log(result);
    }, 5000)


    child1.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child1.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    child1.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });


}


spawn3();
//testRest();
