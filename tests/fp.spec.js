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
const alsatian_1 = require("alsatian");
const fp_1 = require("../src/fp");
let FP = class FP {
    maybeJson(object) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = JSON.stringify(object);
            let parsed = fp_1.fp.maybeJson(json);
            alsatian_1.Expect(parsed).not.toBeNull();
        });
    }
    maybeString(object) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = JSON.stringify(object);
            let parsed = fp_1.fp.maybeString(json);
            alsatian_1.Expect(parsed).not.toBeNull();
        });
    }
    proto(object) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = JSON.stringify(object);
            let parsed = fp_1.fp.proto(new Object());
            alsatian_1.Expect(parsed).not.toBeNull();
        });
    }
    maybe(object) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = JSON.stringify(object);
            let parsed = fp_1.fp.maybe(new Object());
            alsatian_1.Expect(parsed).not.toBeNull();
        });
    }
    array(object) {
        return __awaiter(this, void 0, void 0, function* () {
            let json = JSON.stringify(object);
            let parsed = fp_1.fp.array(new Object());
            alsatian_1.Expect(parsed).not.toBeNull();
        });
    }
};
__decorate([
    alsatian_1.Test("maybeJson"),
    alsatian_1.TestCase({ 'prop1': 1, prop2: 2 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FP.prototype, "maybeJson", null);
__decorate([
    alsatian_1.Test("maybeString"),
    alsatian_1.TestCase({ 'prop1': 1, prop2: 2 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FP.prototype, "maybeString", null);
__decorate([
    alsatian_1.Test("proto"),
    alsatian_1.TestCase({ 'prop1': 1, prop2: 2 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FP.prototype, "proto", null);
__decorate([
    alsatian_1.Test("maybe"),
    alsatian_1.TestCase({ 'prop1': 1, prop2: 2 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FP.prototype, "maybe", null);
__decorate([
    alsatian_1.Test("array"),
    alsatian_1.TestCase({ 'prop1': 1, prop2: 2 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FP.prototype, "array", null);
FP = __decorate([
    alsatian_1.TestFixture("Test the FP functions")
], FP);
exports.FP = FP;
//# sourceMappingURL=fp.spec.js.map