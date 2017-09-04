"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const debug = require('debug')('methodulus');
let ThirdClass = class ThirdClass {
    constructor() { }
    action1(id, name) {
        console.log('running action1 in ThirdClass', id, name);
        return new index_1.MethodResult({ id: id, name: name, add: 'added' });
    }
    error() {
        console.log('running error localy');
        return new index_1.MethodError('error returned', 500);
    }
    action2(item) {
        return item;
    }
    action3() {
        console.log('action3');
    }
};
__decorate([
    index_1.Method(index_1.Verbs.Get, '/posts/:id/:name'),
    __param(0, index_1.Param('id')), __param(1, index_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ThirdClass.prototype, "action1", null);
__decorate([
    index_1.Method(index_1.Verbs.Get, '/posts/error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ThirdClass.prototype, "error", null);
__decorate([
    index_1.Method(index_1.Verbs.Post, '/posts/'),
    __param(0, index_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ThirdClass.prototype, "action2", null);
__decorate([
    index_1.Method(index_1.Verbs.Delete, 'api/acion1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ThirdClass.prototype, "action3", null);
ThirdClass = __decorate([
    index_1.MethodConfig('ThirdClass'),
    __metadata("design:paramtypes", [])
], ThirdClass);
exports.ThirdClass = ThirdClass;
//# sourceMappingURL=ThirdClass.js.map