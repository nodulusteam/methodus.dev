import injection from '@methodus/framework-injection';

@injection.Injectable('TestLogger')
export class TestLogger{
    log(...args: any[]){
        console.log(args)
    }
}