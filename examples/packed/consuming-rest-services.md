

[Download the code for the simple-express-server](./simple-express-server.zip "Simple express server")
### step 1 - create a controller : DataController
Methodus controllers are transport agnostic; parameters are passed via arguments to a function , which returns a value or raise an error, pretty straightforward but extermely powerful.
This simple controller is not doing any thing.

```typescript
import { MethodConfig, Method, Verbs, Body, Param, MethodResult, MethodError } from '@methodus/server';

const items: any = { 'item1': 'item 1 value', 'item2': 'item 2 value', 'item3': 'item 3 value', }
@MethodConfig('DataController')// anotate using the class Name - exact!
export class DataController {

    @Method(Verbs.Get, '/')
    public static async list(): Promise<MethodResult> {
        return new MethodResult(items); // always return a MethodResult object
    }

    @Method(Verbs.Get, '/:id')
    public static async get(@Param('id') id: string): Promise<MethodResult> {
        return new MethodResult(items[id]);
    }

    @Method(Verbs.Get, '/api/error/')
    public static async error(@Body('item') item: any): Promise<MethodResult> {
        throw new MethodError('some error happend', 503);
    }
}
```

### step 1 - create a server
We want to "bind" our controller as a REST endpoint, for that we will need a server.

Create an "Express" server using the built in implementation.
> The `@ServerConfiguration` decorator represents an instance of a server,
> while the `@RouterConfiguration` is used to bind our controller to the type of server we wish to use.

```typescript
import { ServerConfiguration, RouterConfiguration, ConfiguredServer, BuiltInServers } from '@methodus/server';
import { DataController } from './controller';
@ServerConfiguration(BuiltInServers.Express, { port: 6695 }) // instantiate express on given port
@RouterConfiguration(DataController, BuiltInServers.Express) // attach the DataController class to the Express instance 
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

// just running the server
(() => {
    return new Xserver();
})();
```

### Run
After running your server you should be able to browse to http://localhost:6695/




