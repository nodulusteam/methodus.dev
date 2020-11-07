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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const path = __importStar(require("path"));
const injection_1 = __importDefault(require("@methodus/server/injection"));
const platform_express_1 = require("@methodus/platform-express");
const describeView_1 = require("./describeView");
function init(config, pluginOptions = {}) {
    const describePath = pluginOptions.path || '/describe';
    config.run('express', {
        onStart: (instance) => {
            var options = {
                default: ['index.html'],
                //dotfiles: 'ignore',
                etag: true,
                extensions: ['htm',
                    'ico',
                    'html',
                    'gif',
                    'ogg',
                    'mp3',
                    'png',
                    'wav',
                    'js',
                    'js.map',
                    'css',
                    'json',
                    'cur',
                    'woff',
                    'eot',
                    'svg',
                    'ttf'],
                maxAge: '1d',
                redirect: false,
                setHeaders: function (res) {
                    res.set('x-timestamp', Date.now());
                }
            };
            const clientDir = path.resolve(path.join(__dirname, '..', 'public'));
            instance.use(`${describePath}/`, platform_express_1.Express.static(clientDir, options));
            instance.get(`${describePath}`, function (req, res) { res.redirect(`${describePath}/`); });
            const methodClientPath = path.join(process.cwd(), 'node_modules', '@methodus/platform-web', 'dist');
            instance.use(`${describePath}/scripts/`, platform_express_1.Express.static(methodClientPath, options));
        }
    });
    config.use(injection_1.default.Injector.get(describeView_1.DescribeView), 'Local', platform_express_1.Express);
    return config;
}
exports.init = init;
//# sourceMappingURL=index.js.map