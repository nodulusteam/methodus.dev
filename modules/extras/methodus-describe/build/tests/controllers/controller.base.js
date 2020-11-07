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
var BaseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const server_1 = require("@methodus/server");
const decorators_1 = __importDefault(require("@methodus/server/decorators"));
const commons_1 = require("@methodus/server/commons");
const platform_express_1 = require("@methodus/platform-express");
const db_1 = require("../db");
let BaseController = BaseController_1 = class BaseController {
    list(filter = {}, pageNumber = 1, pageSize = 10, req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filter) {
                filter = {};
            }
            const dbResult = db_1.DB.getPosts(filter, pageNumber, pageSize);
            const result = new commons_1.MethodResult(dbResult);
            result.linkAction('get', BaseController_1, 'Post', dbResult, req.headers['host']);
            return result.apply();
        });
    }
    get(id, host = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResult = db_1.DB.getPosts({ id: Number(id) }, 1, 10);
            const result = new commons_1.MethodResult(dbResult);
            result.linkAction('list', BaseController_1, 'Get', {}, host);
            return result.apply();
        });
    }
    read(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult(playerId);
        });
    }
    getByField(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult({});
        });
    }
};
__decorate([
    decorators_1.default.MethodMock({}),
    decorators_1.default.Method(platform_express_1.Verbs.Get, '/'),
    __param(0, commons_1.Mapping.Query('filter')), __param(1, commons_1.Mapping.Query('pageNumber')),
    __param(2, commons_1.Mapping.Query('pageSize')), __param(3, commons_1.Mapping.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "list", null);
__decorate([
    decorators_1.default.Method(platform_express_1.Verbs.Get, '/:id'),
    __param(0, commons_1.Mapping.Param('id')), __param(1, commons_1.Mapping.Headers('host')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "get", null);
__decorate([
    decorators_1.default.Method(platform_express_1.Verbs.Get, '/get/:player_id'),
    __param(0, commons_1.Mapping.Param('player_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "read", null);
__decorate([
    decorators_1.default.Method(platform_express_1.Verbs.Get, '/:field/:value'),
    __param(0, commons_1.Mapping.Param('field')), __param(1, commons_1.Mapping.Param('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "getByField", null);
BaseController = BaseController_1 = __decorate([
    server_1.MethodConfigBase('BaseController')
], BaseController);
exports.BaseController = BaseController;
//# sourceMappingURL=controller.base.js.map