
#  @methodus/server

## Index

### Modules

* [Mapping](modules/mapping.md)
* [Methods](modules/methods.md)

### Enumerations

* [MethodType](enums/methodtype.md)
* [ServerType](enums/servertype.md)
* [TransportType](enums/transporttype.md)

### Classes

* [BaseServer](classes/baseserver.md)
* [BuiltInServers](classes/builtinservers.md)
* [BuiltInTransports](classes/builtintransports.md)
* [ConfiguredServer](classes/configuredserver.md)
* [EmitterPlugin](classes/emitterplugin.md)
* [ExpressRouter](classes/expressrouter.md)
* [ExtressTestModule](classes/extresstestmodule.md)
* [FP](classes/fp.md)
* [MethodError](classes/methoderror.md)
* [MethodResult](classes/methodresult.md)
* [MethodResultStatus](classes/methodresultstatus.md)
* [MethodusConfig](classes/methodusconfig.md)
* [Mocker](classes/mocker.md)
* [ModuleClass](classes/moduleclass.md)
* [ModulesTest](classes/modulestest.md)
* [PluginLoader](classes/pluginloader.md)
* [Proxy](classes/proxy.md)
* [Server](classes/server.md)
* [Servers](classes/servers.md)
* [ServersList](classes/serverslist.md)
* [Verbs](classes/verbs.md)

### Interfaces

* [IApp](interfaces/iapp.md)
* [IMethodusClassConfig](interfaces/imethodusclassconfig.md)
* [IMethodusConfig](interfaces/imethodusconfig.md)
* [IServer](interfaces/iserver.md)
* [IServerConfig](interfaces/iserverconfig.md)
* [ITransport](interfaces/itransport.md)
* [PluginEntry](interfaces/pluginentry.md)
* [Router](interfaces/router.md)

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

