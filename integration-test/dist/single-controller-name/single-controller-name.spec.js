"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@methodus/server");
const single_controller_name_1 = require("./single-controller-name");
describe('SingleControllerName', () => {
    let controller;
    beforeAll(() => {
        controller = server_1.Injector.get(single_controller_name_1.SingleControllerName);
    });
    it('Server created', async () => {
        expect(controller).toBeDefined();
    });
});
