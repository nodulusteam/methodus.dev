import injection from '@methodus/server/injection';

@injection.Injectable('TestLogger')
export class TestLogger{
    log(...args: any[]){
        console.log(args)
    }
}