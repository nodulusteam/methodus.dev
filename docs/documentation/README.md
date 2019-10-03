
#  @methodus/server

## Index

### Modules

* [Mapping](documentation/modules/mapping.md)
* [Methods](documentation/modules/methods.md)

### Enumerations

* [MethodType](documentation/enums/methodtype.md)
* [ServerType](documentation/enums/servertype.md)
* [TransportType](documentation/enums/transporttype.md)

### Classes

* [BaseServer](documentation/classes/baseserver.md)
* [BuiltInServers](documentation/classes/builtinservers.md)
* [BuiltInTransports](documentation/classes/builtintransports.md)
* [ConfiguredServer](documentation/classes/configuredserver.md)
* [EmitterPlugin](documentation/classes/emitterplugin.md)
* [ExpressRouter](documentation/classes/expressrouter.md)
* [ExtressTestModule](documentation/classes/extresstestmodule.md)
* [FP](documentation/classes/fp.md)
* [MethodError](documentation/classes/methoderror.md)
* [MethodResult](documentation/classes/methodresult.md)
* [MethodResultStatus](documentation/classes/methodresultstatus.md)
* [MethodusConfig](documentation/classes/methodusconfig.md)
* [Mocker](documentation/classes/mocker.md)
* [ModuleClass](documentation/classes/moduleclass.md)
* [ModulesTest](documentation/classes/modulestest.md)
* [PluginLoader](documentation/classes/pluginloader.md)
* [Proxy](documentation/classes/proxy.md)
* [Server](documentation/classes/server.md)
* [Servers](documentation/classes/servers.md)
* [ServersList](documentation/classes/serverslist.md)
* [Verbs](documentation/classes/verbs.md)

### Interfaces

* [IApp](interfaces/iapp.md)
* [IMethodusClassConfig](documentation/interfaces/imethodusclassconfig.md)
* [IMethodusConfig](documentation/interfaces/imethodusconfig.md)
* [IServer](documentation/interfaces/iserver.md)
* [IServerConfig](documentation/interfaces/iserverconfig.md)
* [ITransport](documentation/interfaces/itransport.md)
* [PluginEntry](documentation/interfaces/pluginentry.md)
* [Router](documentation/interfaces/router.md)

### Variables

* [resultEmitter](#resultemitter)

### Functions

* [ClientConfiguration](#clientconfiguration)
* [Module](#module)
* [ModuleConfiguration](#moduleconfiguration)
* [PluginConfiguration](#pluginconfiguration)
* [RouterConfiguration](#routerconfiguration)
* [ServerConfiguration](#serverconfiguration)

---

## Variables

<a id="resultemitter"></a>

### `<Const>` resultEmitter

**● resultEmitter**: *`EventEmitter`* =  new EventEmitter()

*Defined in [tests/servers/emitter.plugin.ts:12](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/tests/servers/emitter.plugin.ts#L12)*

___

## Functions

<a id="clientconfiguration"></a>

###  ClientConfiguration

▸ **ClientConfiguration**(controller: *`any`*, transportType: *`any`*, resolver?: *`any`*): `(Anonymous function)`

*Defined in [decorators/client.ts:7](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/decorators/client.ts#L7)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| controller | `any` |
| transportType | `any` |
| `Optional` resolver | `any` |

**Returns:** `(Anonymous function)`

___
<a id="module"></a>

###  Module

▸ **Module**(): `(Anonymous function)`

*Defined in [decorators/module/module.ts:6](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/decorators/module/module.ts#L6)*

the Module decorator registers a module

**Returns:** `(Anonymous function)`

___
<a id="moduleconfiguration"></a>

###  ModuleConfiguration

▸ **ModuleConfiguration**(moduleClass: *`any`*): `(Anonymous function)`

*Defined in [decorators/module/module-config.ts:6](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/decorators/module/module-config.ts#L6)*

the ModuleConfiguration decorator registers a module to the main server instance @param {Class} Class - A module class, using the @Module decorator

**Parameters:**

| Name | Type |
| ------ | ------ |
| moduleClass | `any` |

**Returns:** `(Anonymous function)`

___
<a id="pluginconfiguration"></a>

###  PluginConfiguration

▸ **PluginConfiguration**(name: *`string`*, options?: *`any`*): `(Anonymous function)`

*Defined in [decorators/plugin.ts:7](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/decorators/plugin.ts#L7)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` options | `any` |

**Returns:** `(Anonymous function)`

___
<a id="routerconfiguration"></a>

###  RouterConfiguration

▸ **RouterConfiguration**(controller: *`any`*, serverType: *[ServerType](enums/servertype.md) \| `string`*): `(Anonymous function)`

*Defined in [decorators/router.ts:8](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/decorators/router.ts#L8)*

the RouterConfiguration decorator registers the controller as a router @param {type} controller - a controller class using the @MethodConfig decorator. @param {string} serverType - the name of the server

**Parameters:**

| Name | Type |
| ------ | ------ |
| controller | `any` |
| serverType | [ServerType](enums/servertype.md) \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="serverconfiguration"></a>

###  ServerConfiguration

▸ **ServerConfiguration**(serverType: *`any`*, options?: *`any`*): `(Anonymous function)`

*Defined in [decorators/server.ts:8](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/decorators/server.ts#L8)*

the ServerConfiguration decorator registers a server @param {string} serverType - the type for the server. @param {object} options - any options that needs to be passed to the server object

**Parameters:**

| Name | Type |
| ------ | ------ |
| serverType | `any` |
| `Optional` options | `any` |

**Returns:** `(Anonymous function)`

___

