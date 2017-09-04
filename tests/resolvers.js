"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
const TestClass_1 = require("./classes/TestClass");
const index_1 = require("../index");
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";
const staticResolve = 'http://127.0.0.1:8090';
xdescribe('testing resolver options', function () {
    it('Http without a resolver throws an error', (done) => {
        let config = new index_1.MethodulusConfig();
        config.run(index_1.ServerType.Express, { port: process.env.PORT || 8020 });
        try {
            config.use(TestClass_1.TestClass, index_1.MethodType.Http);
        }
        catch (error) {
            expect(error).to.not.equal(undefined);
            done();
        }
    });
    it('Http with function resolver', (done) => __awaiter(this, void 0, void 0, function* () {
        let config = new index_1.MethodulusConfig();
        config.run(index_1.ServerType.Express, { port: process.env.PORT || 8020 });
        let resolver = (name) => {
            console.log(name);
            return Promise.resolve('http://127.0.0.1:8090');
        };
        config.use(TestClass_1.TestClass, index_1.MethodType.Http, resolver);
        expect(config).to.not.equal(undefined);
        this.timeout(2000);
        done();
    }));
});
//# sourceMappingURL=resolvers.js.map