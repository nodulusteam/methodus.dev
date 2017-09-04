"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThirdClass_1 = require("../../classes/ThirdClass");
const index_1 = require("../../../index");
let config = new index_1.MethodulusConfig();
const redis_addr = '//192.168.99.100:32768';
if (process.env.servers) {
    process.env.servers.split(',').map(server => {
        config.run(server, { port: process.env.PORT, client: redis_addr, server: redis_addr, amqp: '127.0.0.1' });
    });
}
config.use(ThirdClass_1.ThirdClass, process.env.METHODTYPE, 'http://127.0.0.1:8093');
const server = new index_1.Server(process.env.PORT).configure(config).start();
//# sourceMappingURL=ThirdClass.js.map