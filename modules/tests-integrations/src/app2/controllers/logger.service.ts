import { Injectable } from '@methodus/framework-injection';

@Injectable('TestLogger')
export class TestLogger{
    log(...args: any[]){
        console.log(args)
    }
}