"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SecondClass_1 = require("../../classes/SecondClass");
const index_1 = require("../../../index");
let config = new index_1.MethodulusConfig();
const redis_addr = '//192.168.99.100:32768';
if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, { port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
    });
}
config.use(SecondClass_1.SecondClass, process.env.METHODTYPE, 'http://127.0.0.1:8092');
const server = new index_1.Server(process.env.PORT).configure(config).start();
//# sourceMappingURL=SecondClass.js.map