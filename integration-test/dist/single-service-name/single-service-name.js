"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = require("@methodus/server");
let SingleServiceName = class SingleServiceName {
    constructor() {
    }
};
SingleServiceName = tslib_1.__decorate([
    server_1.Injectable('SingleServiceName'),
    tslib_1.__metadata("design:paramtypes", [])
], SingleServiceName);
exports.SingleServiceName = SingleServiceName;
