"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ExpressTestServer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressTestServer = void 0;
const server_1 = require("@methodus/server");
const decorators_1 = __importDefault(require("@methodus/server/decorators"));
const platform_express_1 = require("@methodus/platform-express");
const platform_rest_1 = require("@methodus/platform-rest");
const path = __importStar(require("path"));
const controllers_1 = require("../controllers/");
const proxy_controller_1 = require("../controllers/proxy.controller");
const controller_copy_1 = require("../controllers/controller.copy");
let ExpressTestServer = ExpressTestServer_1 = class ExpressTestServer extends server_1.ConfiguredServer {
    constructor() {
        super(ExpressTestServer_1);
    }
};
ExpressTestServer = ExpressTestServer_1 = __decorate([
    decorators_1.default.ServerConfiguration(platform_express_1.Express, { port: process.env.PORT || 8020 }),
    decorators_1.default.PluginConfiguration(path.join(__dirname, '../../index'), { path: '/describe' }),
    decorators_1.default.RouterConfiguration(controllers_1.TestController, platform_express_1.Express),
    decorators_1.default.RouterConfiguration(controller_copy_1.CopyController, platform_express_1.Express),
    decorators_1.default.RouterConfiguration(proxy_controller_1.ProxiedController, platform_express_1.Express),
    decorators_1.default.ClientConfiguration(controllers_1.TestTarget, platform_rest_1.Http, `https://jsonplaceholder.typicode.com`),
    __metadata("design:paramtypes", [])
], ExpressTestServer);
exports.ExpressTestServer = ExpressTestServer;
//# sourceMappingURL=express.server.js.map