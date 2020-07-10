## Getting started


### A Methodus server application will contain one or more frameworks, agnostically bound to logic code.

## Install the CLI
`npm i -g @methodus/cli`


## Create the project
`methodus application [name]`


## Install
`npm i @methodus/server @methodus/describe` or `yarn add @methodus/server @methodus/describe`. This will install the server components of methodus as well as a plugin for API tests.



*index.ts*
```typescript
import { ServerConfiguration, ModuleConfiguration,
         PluginConfiguration, ConfiguredServer } from '@methodus/server';
import { MyLogicModule } from './module';
import { Express } from '@methodus/platform-express';

@ServerConfiguration(Express, { port:  3060 }) 
@ModuleConfiguration(MyLogicModule)
@PluginConfiguration('@methodus/describe')
export class SetupServer extends ConfiguredServer {
  constructor() {
    super(SetupServer);     
  }
}

(() => {
    return new SetupServer(); //invoke the server
})();
```
> `@ServerConfiguration` creates an Express application instance listening on port 3060
>
> `@ModuleConfiguration` binds a module to the application.
>
> `@PluginConfiguration` adds plugin functionality to the application.


*module.ts*
```typescript
import { Module, RouterConfiguration } from '@methodus/server';
import { Express } from '@methodus/platform-express';
import { MyLogicController } from './controller';

@Module()
@RouterConfiguration(MyLogicController, Express)
export class MyLogicModule { }
```

> `@Module` decorates the class for a module. The class itself is empty.
> 
> `@RouterConfiguration` binds a controller class a specified server, in this case the express instance.


Finaly we add the controller, here is a simple one

*controller.ts*
```typescript
import { MethodConfig, Method, Mappings ,MethodResult } from '@methodus/server';
import { Verbs } from '@methodus/platform-rest';
@MethodConfig('MyLogicController')
export class MyLogicController {

    @Method(Verbs.Get, '/add/:first/:second')
    public async command(@Mappings.Param('first') first: number, @Mappings.Param('second') second: number): Promise<MethodResult<number>> {
        const value = Number(first) + Number(second); 
        return new MethodResult(value);
    }
}
```
> `@MethodConfig` names our controller making it a part of the injection system.
>
> `@Method` annotates the binding information of the method (route, verb, middlewares)
