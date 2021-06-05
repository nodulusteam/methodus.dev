import 'reflect-metadata';
import { Mapping } from './mapping';
import { Field, ModelInMemory } from '@methodus/framework-data';

@ModelInMemory('TargetClass')
class TargetClass {
    constructor(name: string) {
        this.name = name;
    }
    @Field()
    name?: string;
}

class Controller {
    updateName(
        @Mapping.Body() data: TargetClass,
        @Mapping.Param('name') name: string,
        @Mapping.Query('query') query: string,
        @Mapping.Headers('headers') headers: string,
        @Mapping.Files('files') files: string,
        @Mapping.Cookies('cookies') cookies: string,
        @Mapping.SecurityContext('SecurityContext') securityContext: string,
        @Mapping.Session('session') session: string,
        @Mapping.Application('application') application: string,
        @Mapping.Response('response') reponse: string,
        @Mapping.Request('request') request: string
    ) {
        console.log(data);
    }
}

describe('Test Mapping', () => {
    it('push params', async () => {
        const target = new Controller();
        target.updateName(
            new TargetClass('my name'),
            'new name',
            'query',
            'headers',
            'files',
            'cookies',
            'securityContext',
            'session',
            'application',
            'response',
            'request'
        );
    });
});
