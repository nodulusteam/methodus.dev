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
exports.DescribeView = void 0;
const path = __importStar(require("path"));
const mock_1 = require("./mock");
const injection_1 = __importDefault(require("@methodus/server/injection"));
const decorators_1 = __importDefault(require("@methodus/server/decorators"));
const commons_1 = require("@methodus/server/commons");
const platform_rest_1 = require("@methodus/platform-rest");
function getBridge() {
    return global.METHODUS_BRIDGE;
}
let DescribeView = class DescribeView {
    maybeMethodus(object) {
        const proto = object.prototype || object.__proto__;
        const keyName = proto.constructor.name;
        if (proto && proto.constructor && proto.constructor.methodus) {
            return proto.constructor.methodus[keyName];
        }
        if (!proto && object.__proto__ && object.__proto__.methodus) {
            return object.__proto__.methodus[keyName];
        }
        if (object.methodus) {
            return object.methodus[keyName];
        }
        return proto.methodus[keyName];
    }
    loadPJ() {
        let mainpj;
        try {
            mainpj = require(path.join(process.cwd(), 'package.json'));
        }
        catch (error) {
            //console.error(error);
            try {
                mainpj = require(path.join(__dirname, '..', '..', '..', '..', 'package.json'));
            }
            catch (ex) {
                mainpj = { version: 'NA' };
            }
        }
        return mainpj;
    }
    getMethodusData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = getBridge();
            const routes = [];
            Object.keys(data.classes).forEach(cls => {
                const methodus = this.maybeMethodus(data.classes[cls].classType);
                const pj = this.loadPJ();
                routes.push({ name: cls, methodus, info: pj });
            });
            return new commons_1.MethodResult(routes);
        });
    }
    getMethodusDataClass(className) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = getBridge();
            const routes = [];
            const methodus = this.maybeMethodus(data.classes[className].classType);
            const pj = this.loadPJ();
            routes.push({ name: className, methodus, info: pj });
            return new commons_1.MethodResult(routes);
        });
    }
    describeproxy(applicationEndpoint, applicationName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new commons_1.MethodResult({});
        });
    }
    dashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            // const str = fs.readFileSync(path.join(clientDir, 'tabs/dashboard_tabs.ejs'), 'utf-8');
            // const template = ejs.compile(str, { filename: path.join(clientDir, 'tabs/dashboard_tabs.ejs') });
            const data = getBridge();
            const mainpj = this.loadPJ();
            const routes = [];
            const ignoreInClasse = ['DescribeView', 'ConfigView'];
            Object.keys(data.classes)
                .filter(cls => ignoreInClasse.indexOf(cls) === -1)
                .forEach(cls => {
                const methodus = this.maybeMethodus(data.classes[cls].classType);
                const pj = { version: getVersionFromPackageFile(methodus.name) };
                routes.push({ info: pj, active: true, methodus, name: cls });
            });
            const remoteRoutes = [];
            Object.keys(data.clients).forEach(cls => {
                const methodus = this.maybeMethodus(data.clients[cls].classType);
                const pj = { version: getVersionFromPackageFile(methodus.name) };
                remoteRoutes.push({ info: pj, active: true, methodus, name: cls });
            });
            const result = Object.assign({}, {
                routes,
                remoteRoutes,
            }, { app: { version: mainpj.version, name: mainpj.name } });
            return new commons_1.MethodResult(result);
        });
    }
    action(className, actionKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = getBridge();
            let testedClass = null;
            let isRemote = false;
            if (data.classes[className]) {
                testedClass = data.classes[className];
            }
            else {
                isRemote = true;
                testedClass = data.clients[className];
            }
            const methodus = this.maybeMethodus(testedClass.classType);
            const result = Object.assign({}, methodus._descriptors[actionKey], {
                cls: testedClass.classType,
                actionKey,
            }, { isRemote });
            if (methodus.prefix) {
                result.route = methodus.prefix + result.route;
            }
            return new commons_1.MethodResult(result);
        });
    }
    remoteTest(methodInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const className = methodInfo.controllerName;
            let testedClass = injection_1.default.Injector.get(className);
            const remoteResult = yield testedClass[methodInfo.propertyKey].apply(testedClass, methodInfo.params.map((param) => {
                return param.value;
            }));
            return remoteResult;
        });
    }
};
__decorate([
    decorators_1.default.Method(platform_rest_1.Verbs.Get, '/describe/methodus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DescribeView.prototype, "getMethodusData", null);
__decorate([
    decorators_1.default.Method(platform_rest_1.Verbs.Get, '/describe/methodus/:className'),
    __param(0, commons_1.Mapping.Param('className')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DescribeView.prototype, "getMethodusDataClass", null);
__decorate([
    decorators_1.default.Method(platform_rest_1.Verbs.Get, '/describeproxy/:path'),
    __param(0, commons_1.Mapping.Query('u')),
    __param(1, commons_1.Mapping.Param('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DescribeView.prototype, "describeproxy", null);
__decorate([
    decorators_1.default.MethodMock(mock_1.Mock.dashbaord),
    decorators_1.default.Method(platform_rest_1.Verbs.Get, '/describe/dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DescribeView.prototype, "dashboard", null);
__decorate([
    decorators_1.default.MethodMock(mock_1.Mock.action),
    decorators_1.default.Method(platform_rest_1.Verbs.Get, '/describe/test/:className/:actionKey'),
    __param(0, commons_1.Mapping.Param('className')),
    __param(1, commons_1.Mapping.Param('actionKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DescribeView.prototype, "action", null);
__decorate([
    decorators_1.default.MethodMock(mock_1.Mock.action),
    decorators_1.default.Method(platform_rest_1.Verbs.Post, '/describe/remote-test'),
    __param(0, commons_1.Mapping.Body('methodInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DescribeView.prototype, "remoteTest", null);
DescribeView = __decorate([
    decorators_1.default.MethodConfig('DescribeView')
], DescribeView);
exports.DescribeView = DescribeView;
function getVersionFromPackageFile(name) {
    try {
        const pj = require(path.join(process.cwd(), 'node_modules', name, 'package.json'));
        return pj.version;
    }
    catch (error) { }
}
//# sourceMappingURL=describeView.js.map