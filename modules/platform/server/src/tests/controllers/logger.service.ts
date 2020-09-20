import injection from '@methodus/framework-decorators/injection';

@injection.Injectable('TestLogger')
export class TestLogger{
    log(...args: any[]){
        console.log(args)
    }
}