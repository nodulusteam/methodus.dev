import { AsyncTest, Expect, Test, TestCase, TestFixture, Timeout } from "alsatian";
import { TestClass } from './classes/TestClass';
import { logger, Server, ServerType, MethodulusConfig, MethodType, Proxify } from '../index';
import { ServerHelper, ClientHelper, CallHelper, PortHelper } from './helpers'

const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
var childProcessDebug = require('child-process-debug');
process.env.CONFIG_PATH = "./tests/config";





@TestFixture("Test proxy creation")
export class Servers {

    // use the async/await pattern in your tests as you would in your code
    @AsyncTest("proxy class")

    @TestCase(TestClass)
    public async testProxy(classType) {
        let proxy = Proxify(classType);
        Expect(proxy).toBe(proxy);


    }

    // pass arguments into your test functions to keep your test code from being repetative
    // @TestCase(2, 2, 4)
    // @TestCase(2, 3, 5)
    // @TestCase(3, 3, 6)
    // @Test("addition tests")
    // public addTest(firstNumber: number, secondNumber: number, expectedSum: number) {
    //     Expect(firstNumber + secondNumber).toBe(expectedSum);
    // }
}


async function wait(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    })

}
