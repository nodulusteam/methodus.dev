import { Injectable } from '@methodus/server';

@Injectable('TestLogger')
export class TestLogger{
    log(...args: any[]){
        console.log(args)
    }
}