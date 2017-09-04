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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirstClass_1 = require("./FirstClass");
const SecondClass_1 = require("./SecondClass");
const ThirdClass_1 = require("./ThirdClass");
const index_1 = require("../../index");
let Gateway = class Gateway {
    constructor() {
    }
    callFirstClass() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Gateway.callFirstClass()');
            new index_1.MethodEvent('FirstClassEvent', 'roi');
            let first = new FirstClass_1.FirstClass();
            let result = yield first.action1(1, 'roi from gateway');
            console.log('first.action1()', result);
            return new index_1.MethodResult(result.result);
        });
    }
    theEventHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('in event handler');
            // let second = new SecondClass();
            // return await second.action1(1, 'roi from gateway');
        });
    }
    callSecondClass() {
        return __awaiter(this, void 0, void 0, function* () {
            let second = new SecondClass_1.SecondClass();
            let result = yield second.action1(1, 'roi from gateway');
            return new index_1.MethodResult(result.result);
        });
    }
    callThirdClass() {
        return __awaiter(this, void 0, void 0, function* () {
            let third = new ThirdClass_1.ThirdClass();
            let result = yield third.action1(1, 'roi from gateway');
            return new index_1.MethodResult(result.result);
        });
    }
};
__decorate([
    index_1.Method(index_1.Verbs.Get, '/gateway/first'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "callFirstClass", null);
__decorate([
    index_1.Event('FirstClassEvent', index_1.Verbs.Post, '/events/theeventhandler'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "theEventHandler", null);
__decorate([
    index_1.Method(index_1.Verbs.Get, '/gateway/first'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "callSecondClass", null);
__decorate([
    index_1.Method(index_1.Verbs.Get, '/gateway/first'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "callThirdClass", null);
Gateway = __decorate([
    index_1.MethodConfig('Gateway'),
    __metadata("design:paramtypes", [])
], Gateway);
exports.Gateway = Gateway;
//# sourceMappingURL=Gateway.js.map