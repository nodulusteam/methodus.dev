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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTarget = void 0;
const decorators_1 = __importDefault(require("@methodus/server/decorators"));
const commons_1 = require("@methodus/server/commons");
const platform_express_1 = require("@methodus/platform-express");
let TestTarget = class TestTarget {
    list(pageNumber = 1, pageSize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult({});
        });
    }
    get(id, host = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult({});
        });
    }
    create(files, cookies, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult({});
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult({});
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult({});
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult({});
        });
    }
};
__decorate([
    decorators_1.default.MethodMock({}),
    decorators_1.default.Method(platform_express_1.Verbs.Get, '/comments'),
    __param(0, commons_1.Mapping.Query('pageNumber')), __param(1, commons_1.Mapping.Query('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TestTarget.prototype, "list", null);
__decorate([
    decorators_1.default.Method(platform_express_1.Verbs.Get, '/comments/:id'),
    __param(0, commons_1.Mapping.Param('id')), __param(1, commons_1.Mapping.Headers('host')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TestTarget.prototype, "get", null);
__decorate([
    decorators_1.default.MethodPipe(platform_express_1.Verbs.Post, '/comments'),
    __param(0, commons_1.Mapping.Files('files')),
    __param(1, commons_1.Mapping.Cookies('cookies')), __param(2, commons_1.Mapping.Body('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], TestTarget.prototype, "create", null);
__decorate([
    decorators_1.default.Method(platform_express_1.Verbs.Get, '/comments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestTarget.prototype, "read", null);
__decorate([
    decorators_1.default.Method(platform_express_1.Verbs.Put, '/comments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestTarget.prototype, "update", null);
__decorate([
    decorators_1.default.Method(platform_express_1.Verbs.Delete, '/comments/:id'),
    __param(0, commons_1.Mapping.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestTarget.prototype, "delete", null);
TestTarget = __decorate([
    decorators_1.default.MethodConfig('TestTarget', [], '/api/test-contracts')
], TestTarget);
exports.TestTarget = TestTarget;
//# sourceMappingURL=target.test.js.map