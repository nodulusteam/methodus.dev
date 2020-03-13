
#  A Methodus guide

## Index

### Modules

* [Decorators](modules/decorators.md)
* [Mapping](modules/mapping.md)
* [Methods](modules/methods.md)

### Enumerations

* [AuthType](enums/authtype.md)
* [MethodType](enums/methodtype.md)
* [RegistrationTypes](enums/registrationtypes.md)
* [ServerType](enums/servertype.md)
* [TransportType](enums/transporttype.md)

### Classes

* [BaseServer](classes/baseserver.md)
* [ConfiguredServer](classes/configuredserver.md)
* [EmitterPlugin](classes/emitterplugin.md)
* [ExpressTestServer](classes/expresstestserver.md)
* [InjectorType](classes/injectortype.md)
* [Logger](classes/logger.md)
* [MethodError](classes/methoderror.md)
* [MethodResult](classes/methodresult.md)
* [MethodResultStatus](classes/methodresultstatus.md)
* [MethodusConfig](classes/methodusconfig.md)
* [Mocker](classes/mocker.md)
* [ModuleClass](classes/moduleclass.md)
* [Parser](classes/parser.md)
* [ParserForMocker](classes/parserformocker.md)
* [ParserResponse](classes/parserresponse.md)
* [PluginLoader](classes/pluginloader.md)
* [ProxiedClass](classes/proxiedclass.md)
* [Proxy](classes/proxy.md)
* [ResponseParser](classes/responseparser.md)
* [RestLink](classes/restlink.md)
* [Server](classes/server.md)
* [ServersList](classes/serverslist.md)
* [TestLogger](classes/testlogger.md)

### Interfaces

* [IApp](interfaces/iapp.md)
* [IMethodusClassConfig](interfaces/imethodusclassconfig.md)
* [IMethodusConfig](interfaces/imethodusconfig.md)
* [IServer](interfaces/iserver.md)
* [IServerConfig](interfaces/iserverconfig.md)
* [ITransport](interfaces/itransport.md)
* [PluginEntry](interfaces/pluginentry.md)
* [Router](interfaces/router.md)
* [ServerDefinition](interfaces/serverdefinition.md)

### Variables

* [Injector](#injector)
* [Servers](#servers)
* [logger](#logger)
* [resultEmitter](#resultemitter)

### Functions

* [Auth](#auth)
* [Inject](#inject)
* [Injectable](#injectable)
* [Module](#module)
* [ModuleConfiguration](#moduleconfiguration)
* [Singleton](#singleton)
* [deserialize](#deserialize)
* [validate](#validate)

---

## Variables

<a id="injector"></a>

### `<Const>` Injector

**● Injector**: *`any`* =  bridge.Injector

*Defined in lib/di/injector.d.ts:17*
*Defined in [src/di/injector.ts:103](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/di/injector.ts#L103)*

___
<a id="servers"></a>

### `<Const>` Servers

**● Servers**: *`any`* =  (global as any).METHODUS_BRIDGE

*Defined in lib/servers/serversList.d.ts:13*
*Defined in [src/servers/serversList.ts:45](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/servers/serversList.ts#L45)*

___
<a id="logger"></a>

### `<Const>` logger

**● logger**: *`Logger`* =  new Logger('general')

*Defined in lib/log/index.d.ts:12*
*Defined in [src/log/index.ts:52](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/log/index.ts#L52)*

___
<a id="resultemitter"></a>

### `<Const>` resultEmitter

**● resultEmitter**: *`EventEmitter`* =  new EventEmitter()

*Defined in lib/tests/servers/emitter.plugin.d.ts:6*
*Defined in [src/tests/servers/emitter.plugin.ts:13](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/tests/servers/emitter.plugin.ts#L13)*

___

## Functions

<a id="auth"></a>

###  Auth

▸ **Auth**(type: *[AuthType](enums/authtype.md)*, options?: *`any`*): `function`

*Defined in lib/decorators/auth/auth.d.ts:9*

the AuthConfig decorator registers the controller as a router @param {AuthType} type - the type of authentication to apply. @param {options} options - the auth options

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [AuthType](enums/authtype.md) |
| `Optional` options | `any` |

**Returns:** `function`

___
<a id="inject"></a>

###  Inject

▸ **Inject**(name?: *`undefined` \| `string`*, propertyName?: *`undefined` \| `string`*): `any`

*Defined in lib/di/decorators/inject.d.ts:1*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |
| `Optional` propertyName | `undefined` \| `string` |

**Returns:** `any`

___
<a id="injectable"></a>

###  Injectable

▸ **Injectable**(name?: *`undefined` \| `string`*): `function`

*Defined in lib/di/decorators/injectable.d.ts:2*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `function`

___
<a id="module"></a>

###  Module

▸ **Module**(name?: *`undefined` \| `string`*): `function`

*Defined in lib/decorators/module/module.d.ts:2*

the Module decorator registers a module

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `function`

___
<a id="moduleconfiguration"></a>

###  ModuleConfiguration

▸ **ModuleConfiguration**(moduleClass: *`any`*): `function`

*Defined in lib/decorators/module/module-config.d.ts:2*

the ModuleConfiguration decorator registers a module to the main server instance @param {Class} Class - A module class, using the @Module decorator

**Parameters:**

| Name | Type |
| ------ | ------ |
| moduleClass | `any` |

**Returns:** `function`

___
<a id="singleton"></a>

###  Singleton

▸ **Singleton**(name?: *`undefined` \| `string`*): `function`

*Defined in lib/di/decorators/singleton.d.ts:2*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `function`

___
<a id="deserialize"></a>

###  deserialize

▸ **deserialize**(item: *`object` \| `any`*): `any`

*Defined in lib/method/deserialize.d.ts:1*

Deserialize values according to their types @param { type: any, value: string } item - the arguments sent to the original function.

**Parameters:**

| Name | Type |
| ------ | ------ |
| item | `object` \| `any` |

**Returns:** `any`

___
<a id="validate"></a>

###  validate

▸ **validate**(args: *`any`[]*): `Promise`<`boolean` \| `string` \| `string`[]>

*Defined in lib/method/validate.d.ts:1*

**Parameters:**

| Name | Type |
| ------ | ------ |
| args | `any`[] |

**Returns:** `Promise`<`boolean` \| `string` \| `string`[]>

___

