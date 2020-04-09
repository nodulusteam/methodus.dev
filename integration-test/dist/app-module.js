"use strict";
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = require("@methodus/server");
const platform_express_1 = require("@methodus/platform-express");
const single_controller_name_1 = require("./single-controller-name/single-controller-name");
const single_service_name_1 = require("./single-service-name/single-service-name");
const my_module_1 = require("./my-module/my-module");
let AppModule = AppModule_1 = class AppModule extends server_1.ConfiguredServer {
    constructor() {
        super(AppModule_1);
        this.declarations = [single_controller_name_1.SingleControllerName];
        this.providers = [single_service_name_1.SingleServiceName];
        this.imports = [my_module_1.MyModule];
    }
};
AppModule = AppModule_1 = tslib_1.__decorate([
    server_1.Module('AppModule'),
    server_1.ServerConfiguration(platform_express_1.Express, { port: 3060 }),
    tslib_1.__metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
