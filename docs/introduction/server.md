## Getting started


### A Methodus server application will contain one or more frameworks, agnostically bound to logic code.

## Install
`npm i @methodus/server @methodus/describe` or `yarn add @methodus/server @methodus/describe`. This will install the server components of methodus as well as a plugin for API tests.


> There is no scaffolding tool for Methodus, so structure is based on the developers preferences.
How ever an entry file is required. So before you start create your flavor of a nodeJS Typescript
application and add an `index.ts` file.


*index.ts*
```typescript
import { BuiltInServers, ServerConfiguration, ModuleConfiguration,
         PluginConfiguration, ConfiguredServer } from '@methodus/server';
import { MyLogicModule } from './module';

@ServerConfiguration(BuiltInServers.Express, { port:  3060 }) 
@ModuleConfiguration(MyLogicModule)
@PluginConfiguration('@methodus/describe')
export class SetupServer extends ConfiguredServer {
  constructor() {
    super(SetupServer);     
  }
}

(() => {
    return new SetupServer()  ;
})();
```

`ServerConfiguration` creates an Express application instance listening on port 3060

`ModuleConfiguration` binds a module to the application.

`PluginConfiguration` adds plugin functionality to the application.


*module.ts*
```typescript
import { BuiltInServers, Module, RouterConfiguration } from '@methodus/server';
import { MyLogicController } from './controller';

@Module()
@RouterConfiguration(MyLogicController, BuiltInServers.Express)
export class MyLogicModule { }
```

`Module` decorates the class for a module. The class itself is empty.

`RouterConfiguration` binds a controller class a specified server, in this case the express instance.


Finaly we add the controller, here is a simple one

*controller.ts*
```typescript
import { MethodConfig, Method, Verbs,Param ,MethodResult } from '@methodus/server';

@MethodConfig('MyLogicController')
export class MyLogicController {

    @Method(Verbs.Get, '/add/:first/:second')
    public async command(@Param('first') first: number, @Param('second') second: number): Promise<MethodResult<number>> {
        const value = Number(first) + Number(second); 
        return new MethodResult(value);
    }
}
```

