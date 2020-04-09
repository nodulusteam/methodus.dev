"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = require("@methodus/server");
const single_controller_name_1 = require("./single-controller-name/single-controller-name");
let MyModule = class MyModule {
    constructor() {
        this.declarations = [single_controller_name_1.SingleControllerName];
    }
};
MyModule = tslib_1.__decorate([
    server_1.Module('MyModule'),
    tslib_1.__metadata("design:paramtypes", [])
], MyModule);
exports.MyModule = MyModule;
