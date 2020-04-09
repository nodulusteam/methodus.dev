"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@methodus/server");
const single_service_name_1 = require("./single-service-name");
describe('SingleServiceName', () => {
    let service;
    beforeAll(() => {
        service = server_1.Injector.get(single_service_name_1.SingleServiceName);
    });
    it('Service created', async () => {
        expect(service).toBeDefined();
    });
});
