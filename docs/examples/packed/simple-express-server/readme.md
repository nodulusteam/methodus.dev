
## A simple "Express" application (Hello World);

> Start a new NodeJS Typescript project (npm i/yarn)
```Json
{
  "name": "simple-express-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "open": "call start http://localhost:6695",
    "start": "tsc && npm run open &&  node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@methodus/server": "^3.0.18",
    "@types/node": "^12.0.0"
  },
  "peerDependencies": {
    "typescript": "^3.4.0"
  }
}
```

### Step 1 - create a local controller => controller.ts
> Methodus controllers are transport agnostic; parameters are passed via arguments to a function , which returns a value or raise an error, pretty straightforward but extermely powerful.

This simple controller is not doing any thing.

> controller.ts
```typescript
import { MethodConfig, Method, Verbs, Body, Param,
MethodResult, MethodError } from '@methodus/server';
const items: any = { 'item1': 'item 1 value',
                     'item2': 'item 2 value',
                     'item3': 'item 3 value' }
@MethodConfig('LocalController')// anotate using the class Name - exact!
export class LocalController {
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
import { LocalController } from './controller';
@ServerConfiguration(BuiltInServers.Express, { port: 6695 }) // instantiate express on given port
@RouterConfiguration(LocalController, BuiltInServers.Express) // attach the DataController class to the Express instance 
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




