"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app-module");
const appModule = new app_module_1.AppModule();
//get express instance
describe('test', () => {
    var _a;
    const app = (_a = appModule.server) === null || _a === void 0 ? void 0 : _a.app;
    const superTest = SuperTest(app);
    test('test', () => {
        const req = new Request(app);
        superTest.get('/user')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200)
            .end((err, res) => {
            if (err)
                throw err;
        });
    });
});
