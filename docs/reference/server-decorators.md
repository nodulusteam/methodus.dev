


### ConfiguredServer

With Methodus, you'll be decorating this class to create any server instance.



```typescript
import { ConfiguredServer } from '@methodus/server';
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}
```
> [!NOTE]
> This code doesn't do any thing yet, we need to decorate the class.


> ConfiguredServer can be decorated using 
* [@ServerConfiguration](#serverconfiguration)
* [@PluginConfiguration](#pluginconfiguration)
* [@RouterConfiguration](#routerconfiguration)
* [@ClientConfiguration](#clientconfiguration)
* [@ModuleConfiguration](#moduleconfiguration)


### @ServerConfiguration 
> Used to bind a server instance to a framework. This example use the builtin `Express` server.
```typescript
import { ServerConfiguration, RouterConfiguration, ConfiguredServer, BuiltInServers } from '@methodus/server';
import { DataController } from './controller';
@ServerConfiguration(BuiltInServers.Express, { port: 6695 }) // instantiate express on given port
```

### @PluginConfiguration
> Additional applications can be added to the initiated server instance and serve as plugins
```typescript
@PluginConfiguration('@methodus/describe')
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



### ModuleConfiguration
> Bundle a group of servers, clients, routes and plugins in a single reusable module.
```typescript
import { ServerConfiguration, RouterConfiguration, ConfiguredServer, BuiltInServers } from '@methodus/server';
import { ModuleClass } from './moduleClass';
@ModuleConfiguration(ModuleClass)
```




