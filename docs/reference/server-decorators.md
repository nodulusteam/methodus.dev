# Server Decorators



### ConfiguredServer
> This should be the base class for any methodus server instance.
```typescript
import { ConfiguredServer } from '@methodus/server';
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}
```

> ConfiguredServer can be decorated by 
* ServerConfiguration
* PluginConfiguration
* RouterConfiguration
* ClientConfiguration

### ServerConfiguration
> Used to bind a server instance to the process. The server behaviour is all up to it.
```typescript
import { ServerConfiguration, RouterConfiguration, ConfiguredServer, BuiltInServers } from '@methodus/server';
import { DataController } from './controller';
@ServerConfiguration(BuiltInServers.Express, { port: 6695 }) // instantiate express on given port
```

### PluginConfiguration
> Additional applications can be added to the initiated server instance and serve as plugins
```typescript
@PluginConfiguration('@methodus/describe)
```

### RouterConfiguration
> Bind a Controller to a server *InBound* function
```typescript
import { ServerConfiguration, RouterConfiguration, ConfiguredServer, BuiltInServers } from '@methodus/server';
import { LocalController } from './controller';
@ServerConfiguration(BuiltInServers.Express, { port: 6695 }) // instantiate express on given port
@RouterConfiguration(LocalController, BuiltInServers.Express)
```


### ClientConfiguration
> Bind a Controller to a server *OutBound* function
```typescript
import { ServerConfiguration, RouterConfiguration, ConfiguredServer, BuiltInServers } from '@methodus/server';
import { RemoteController } from './controller';
@ClientConfiguration(RemoteController, BuiltInServers.Express)
```





