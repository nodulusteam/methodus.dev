"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const lib_1 = require("../../../lib");
const server_1 = require("@methodus/server");
const grpc_transport_1 = require("./grpc.transport");
let Controller = class Controller {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
};
__decorate([
    lib_1.Method()
], Controller.prototype, "add", null);
__decorate([
    lib_1.Method()
], Controller.prototype, "multiply", null);
Controller = __decorate([
    lib_1.MethodConfig('Controller')
], Controller);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const server = new server_1.Server();
    const moduleGrpc = index_1.default.module.register({ type: index_1.default, options: { port: 50050 } }, server);
    moduleGrpc.useClass(Controller, lib_1.MethodType.Local);
    const casted = Controller.prototype.methodus['Controller'];
    const merged = Object.assign({}, casted, casted._descriptors['add']);
    yield grpc_transport_1.send(merged, [1, 3], {}, {});
}))();
