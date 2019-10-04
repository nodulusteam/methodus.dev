
#  A Methodus guide

## Index

### Modules

* [Mapping](modules/mapping.md)
* [Methods](modules/methods.md)

### Enumerations

* [AuthType](enums/authtype.md)
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
* [Injector](classes/injector.md)
* [MethodError](classes/methoderror.md)
* [MethodErrorTest](classes/methoderrortest.md)
* [MethodResult](classes/methodresult.md)
* [MethodResultStatus](classes/methodresultstatus.md)
* [MethodResultTest](classes/methodresulttest.md)
* [MethodusConfig](classes/methodusconfig.md)
* [Mocker](classes/mocker.md)
* [ModuleClass](classes/moduleclass.md)
* [ModulesTest](classes/modulestest.md)
* [PluginLoader](classes/pluginloader.md)
* [ProxiedClass](classes/proxiedclass.md)
* [Proxy](classes/proxy.md)
* [ProxyTest](classes/proxytest.md)
* [ResponseParser](classes/responseparser.md)
* [RestLink](classes/restlink.md)
* [Server](classes/server.md)
* [Servers](classes/servers.md)
* [ServersList](classes/serverslist.md)
* [SimpleClass](classes/simpleclass.md)
* [Verbs](classes/verbs.md)
* [WebRequest](classes/webrequest.md)

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

* [Auth](#auth)
* [ClientConfiguration](#clientconfiguration)
* [Inject](#inject)
* [Injectable](#injectable)
* [Module](#module)
* [ModuleConfiguration](#moduleconfiguration)
* [PluginConfiguration](#pluginconfiguration)
* [RouterConfiguration](#routerconfiguration)
* [ServerConfiguration](#serverconfiguration)
* [Singleton](#singleton)

---

## Variables

<a id="resultemitter"></a>

### `<Const>` resultEmitter

**● resultEmitter**: *`EventEmitter`* =  new EventEmitter()

*Defined in build/tests/servers/emitter.plugin.d.ts:6*
*Defined in [src/tests/servers/emitter.plugin.ts:12](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/tests/servers/emitter.plugin.ts#L12)*

___

## Functions

<a id="auth"></a>

###  Auth

▸ **Auth**(type: *[AuthType](enums/authtype.md)*, options?: *`any`*): `function`

*Defined in build/decorators/auth/auth.d.ts:9*

the AuthConfig decorator registers the controller as a router @param {AuthType} type - the type of authentication to apply. @param {options} options - the auth options

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [AuthType](enums/authtype.md) |
| `Optional` options | `any` |

**Returns:** `function`

___
<a id="clientconfiguration"></a>

###  ClientConfiguration

▸ **ClientConfiguration**(controller: *`any`*, transportType: *`any`*, resolver?: *`any`*): `function`

*Defined in build/decorators/client.d.ts:2*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| controller | `any` |
| transportType | `any` |
| `Optional` resolver | `any` |

**Returns:** `function`

___
<a id="inject"></a>

###  Inject

▸ **Inject**(): `any`

*Defined in build/di/decorators/inject.d.ts:1*

**Returns:** `any`

___
<a id="injectable"></a>

###  Injectable

▸ **Injectable**(name?: *`undefined` \| `string`*): `function`

*Defined in build/di/decorators/injectable.d.ts:2*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `function`

___
<a id="module"></a>

###  Module

▸ **Module**(): `function`

*Defined in build/decorators/module/module.d.ts:2*

the Module decorator registers a module

**Returns:** `function`

___
<a id="moduleconfiguration"></a>

###  ModuleConfiguration

▸ **ModuleConfiguration**(moduleClass: *`any`*): `function`

*Defined in build/decorators/module/module-config.d.ts:2*

the ModuleConfiguration decorator registers a module to the main server instance @param {Class} Class - A module class, using the @Module decorator

**Parameters:**

| Name | Type |
| ------ | ------ |
| moduleClass | `any` |

**Returns:** `function`

___
<a id="pluginconfiguration"></a>

###  PluginConfiguration

▸ **PluginConfiguration**(name: *`string`*, options?: *`any`*): `function`

*Defined in build/decorators/plugin.d.ts:2*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` options | `any` |

**Returns:** `function`

___
<a id="routerconfiguration"></a>

###  RouterConfiguration

▸ **RouterConfiguration**(controller: *`any`*, serverType: *[ServerType](enums/servertype.md) \| `string`*): `function`

*Defined in build/decorators/router.d.ts:3*

the RouterConfiguration decorator registers the controller as a router @param {type} controller - a controller class using the @MethodConfig decorator. @param {string} serverType - the name of the server

**Parameters:**

| Name | Type |
| ------ | ------ |
| controller | `any` |
| serverType | [ServerType](enums/servertype.md) \| `string` |

**Returns:** `function`

___
<a id="serverconfiguration"></a>

###  ServerConfiguration

▸ **ServerConfiguration**(serverType: *`any`*, options?: *`any`*): `function`

*Defined in build/decorators/server.d.ts:2*

the ServerConfiguration decorator registers a server @param {string} serverType - the type for the server. @param {object} options - any options that needs to be passed to the server object

**Parameters:**

| Name | Type |
| ------ | ------ |
| serverType | `any` |
| `Optional` options | `any` |

**Returns:** `function`

___
<a id="singleton"></a>

###  Singleton

▸ **Singleton**(): `function`

*Defined in build/di/decorators/singleton.d.ts:2*

**Returns:** `function`

___

