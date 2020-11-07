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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescribeView = void 0;
var M = require("@methodus/platform-web");
var includes_1 = require("../includes");
// Methodus contract.
// Generated at: Fri Nov 06 2020 22:42:46 GMT+0200 (GMT+02:00)
var DescribeView = /** @class */ (function () {
    function DescribeView() {
    }
    DescribeView.prototype.maybeMethodus = function (object) {
        return null;
    };
    DescribeView.prototype.getMethodusData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    DescribeView.prototype.getMethodusDataClass = function (className) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    DescribeView.prototype.describeproxy = function (applicationEndpoint, applicationName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    DescribeView.prototype.dashboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, includes_1.Mock.dashbaord.apply(this, [])];
            });
        });
    };
    DescribeView.prototype.action = function (className, actionKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, includes_1.Mock.action.apply(this, [className, actionKey])];
            });
        });
    };
    DescribeView.prototype.remoteTest = function (methodInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, includes_1.Mock.action.apply(this, [methodInfo])];
            });
        });
    };
    __decorate([
        M.Method(M.Verbs.Get, '/describe/methodus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], DescribeView.prototype, "getMethodusData", null);
    __decorate([
        M.Method(M.Verbs.Get, '/describe/methodus/:className'),
        __param(0, M.P.Param('className')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Object)
    ], DescribeView.prototype, "getMethodusDataClass", null);
    __decorate([
        M.Method(M.Verbs.Get, '/describeproxy/:path'),
        __param(0, M.P.Query('u')), __param(1, M.P.Param('path')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Object)
    ], DescribeView.prototype, "describeproxy", null);
    __decorate([
        M.Method(M.Verbs.Get, '/describe/dashboard'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], DescribeView.prototype, "dashboard", null);
    __decorate([
        M.Method(M.Verbs.Get, '/describe/test/:className/:actionKey'),
        __param(0, M.P.Param('className')), __param(1, M.P.Param('actionKey')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Object)
    ], DescribeView.prototype, "action", null);
    __decorate([
        M.Method(M.Verbs.Post, '/describe/remote-test'),
        __param(0, M.P.Body('methodInfo')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], DescribeView.prototype, "remoteTest", null);
    DescribeView = __decorate([
        M.MethodConfig('DescribeView')
    ], DescribeView);
    return DescribeView;
}());
exports.DescribeView = DescribeView;
new DescribeView();
//# sourceMappingURL=describeView.js.map