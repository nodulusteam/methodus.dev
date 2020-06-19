import { injectionModule as injection } from '@methodus/server';

@injection.Injectable('TestLogger')
export class TestLogger {
    log(...args: any[]) {
        console.log(args)
    }
}