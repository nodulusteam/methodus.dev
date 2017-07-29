// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
import { TestClass } from './classes/test-class';
import { Server, MethodulusConfig, MethodType, ServerType } from '../index';
import { ServerHelper, ClientHelper, CallHelper } from './helpers'
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";

const staticResolve = 'http://localhost:8090';


describe('testing resolver options', function () {
    it('Http without a resolver throws an error', (done) => {

        let config = new MethodulusConfig();
        config.run(ServerType.Express, {port:process.env.PORT || 8020 });
        try {
            config.use(TestClass, MethodType.Http);
        }
        catch (error) {
            expect(error).to.not.equal(undefined);
            done();
        }

    });
    it('Http with function resolver', async (done) => {

        let config = new MethodulusConfig();
        config.run(ServerType.Express, {port:process.env.PORT || 8020 });
        let resolver = (name) => {
            console.log(name);
            return Promise.resolve('http://localhost:8090');
        }

        config.use(TestClass, MethodType.Http, resolver)




        expect(config).to.not.equal(undefined);
        this.timeout(2000);
        done();


    });



});
