
### Step 1 - create a controller : LocalController
Methodus controllers are transport agnostic; parameters are passed via arguments to a function , which returns a value or raise an error, pretty straightforward but extermely powerful.
This simple controller is not doing any thing.







<!-- tabs:start -->

#### **package.json**
> Start a new NodeJS Typescript project (npm i/yarn)

```Json
 {
  "name": "consuming-rest-services",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "open": "call start http://localhost:6695/describe/",
    "start": "tsc && npm run open &&  node build/index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@methodus/describe": "^4.0.10",
    "@methodus/server": "^3.0.18",
    "@types/node": "^12.0.0"
  },
  "peerDependencies": {
    "typescript": "^3.4.0"
  }
}

```

#### **remote.controller.ts**
> Create the remote contract controller. This controller is a virtual controller to a remote endpoint. The transport configuration determines its role in the server file.


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

#### **local.controller.ts**

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

#### **index.ts**
> We want to "bind" our controller as a REST endpoint, for that we will need a server.

```typescript
 import {
    ServerConfiguration, RouterConfiguration, ClientConfiguration,
    ConfiguredServer, PluginConfiguration,
} from '@methodus/server';
import { Express } from '@methodus/platform-express';
import { Http } from '@methodus/platform-rest';

import { LocalController } from './controllers/local.controller';
import { RemoteService } from './controllers/remote.service';
@PluginConfiguration('@methodus/describe')
@ServerConfiguration(Express, { port: 6695 })
@RouterConfiguration(LocalController, Express)
@ClientConfiguration(RemoteService, Http, 'https://jsonplaceholder.typicode.com')
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

(() => {
    return new Xserver();
})();
```

> The `@ClientConfiguration` decorator represents a target reachable by the transport,
> while the `@RouterConfiguration` is used to bind our controller to the type of server we wish to use.

> @PluginConfiguration is a way to connect "sub applications" to a main one. In this case we're using the "Describe" plugin, which contains an api explorer for us to use. 

<!-- tabs:end -->

 

### Run
After running your server you should be able to browse to http://localhost:6695/describe/

[![Edit Methodus - Consuming Rest Services](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/methodus-consuming-rest-services-35j7u?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fdescribe%2F&module=%2Fsrc%2Findex.ts&view=preview)

<iframe src="https://codesandbox.io/embed/methodus-consuming-rest-services-35j7u?previewwindow=browser&autoresize=1&fontsize=12&hidenavigation=1&initialpath=%2Fdescribe%2F&module=%2Fsrc%2Findex.ts&expanddevtools=0&view=preview" title="Methodus - Consuming Rest Services" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:800px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
