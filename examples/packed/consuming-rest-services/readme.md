

[Download the code for the consuming-rest-services](./consuming-rest-services.zip "Consuming Rest Services")
### step 1 - create a controller : DataController
Methodus controllers are transport agnostic; parameters are passed via arguments to a function , which returns a value or raise an error, pretty straightforward but extermely powerful.
This simple controller is not doing any thing.

- src/local.controller.ts
```typescript
import { MethodConfig, Method, Verbs, Body, Param, MethodResult, MethodError } from '@methodus/server';
import { RemoteService } from './remote.service';

@MethodConfig('LocalController')// anotate using the class Name - exact!
export class LocalController {

    @Method(Verbs.Get, '/todos')
    public static async list(): Promise<MethodResult> {
        return await RemoteService.list(); // calling the remote service
    }

    @Method(Verbs.Get, '/todos/:id')
    public static async get(@Param('id') id: number): Promise<MethodResult> {
        return await RemoteService.get(id);
    }

    @Method(Verbs.Post, '/todos')
    public static async create(@Body('data') data: any): Promise<MethodResult> {
        return await RemoteService.create(data);
    }

    @Method(Verbs.Put, '/todos/:id')
    public static async update(@Param('id') id: number, @Body('data') data: any): Promise<MethodResult> {
        return await RemoteService.update(id, data);
    }
}

```

- src/remote.service.ts
## step 2 - create the remote contract controller
This controller is a virtual controller to a remote endpoint. The transport configuration determines its role in the server file.

```typescript
import { MethodConfig, Method, Verbs, Body, Param, MethodResult, MethodError } from '@methodus/server';

@MethodConfig('RemoteService')// anotate using the class Name - exact!
export class RemoteService {

    @Method(Verbs.Get, '/todos')
    public static async list(): Promise<MethodResult<string[]>> {
        return new MethodResult([]);
    }

    @Method(Verbs.Get, '/todos/:id')
    public static async get(@Param('id') id: number): Promise<MethodResult<any>> {
        return new MethodResult({});
    }

    @Method(Verbs.Post, '/todos')
    public static async create(@Body('data') data: any): Promise<MethodResult> {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/todos/:id')
    public static async update(@Param('id') id: number, @Body('data') data: any): Promise<MethodResult> {
        return new MethodResult({});
    }

}


```
### step 3 - create the server
We want to "bind" our controller as a REST endpoint, for that we will need a server.

Create an "Express" server using the built in implementation.
> The `@ClientConfiguration` decorator represents a target reachable by the transport,
> while the `@RouterConfiguration` is used to bind our controller to the type of server we wish to use.

> @PluginConfiguration is a way to connect "sub applications" to a main one. In this case we're using the "Describe" plugin, which contains an api explorer for us to use. 
- index.ts
```typescript
import {
    ServerConfiguration, RouterConfiguration, ClientConfiguration,
    ConfiguredServer, BuiltInServers, BuiltInTransports, PluginConfiguration,
} from '@methodus/server';
import { LocalController } from './controllers/local.controller';
import { RemoteService } from './controllers/remote.service';
@PluginConfiguration('@methodus/describe')
@ServerConfiguration(BuiltInServers.Express, { port: 6695 })
@RouterConfiguration(LocalController, BuiltInServers.Express)
@ClientConfiguration(RemoteService, BuiltInTransports.Http, 'https://jsonplaceholder.typicode.com')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

(() => {
    return new Xserver();
})();

```

### Run
After running your server you should be able to browse to http://localhost:6695/describe/




