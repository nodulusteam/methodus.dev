import { Injectable } from '../../di';

@Injectable('TestLogger')
export class TestLogger{
    log(...args: any[]){
        console.log(args)
    }
}