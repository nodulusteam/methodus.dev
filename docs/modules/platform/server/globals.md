[Server components](README.md) › [Globals](globals.md)

# Server components

## Index

### Namespaces

* [Methods](modules/methods.md)

### Classes

* [ConfiguredServer](classes/configuredserver.md)
* [EmitterPlugin](classes/emitterplugin.md)
* [MethodHandler](classes/methodhandler.md)
* [MethodPipeHandler](classes/methodpipehandler.md)
* [Mocker](classes/mocker.md)
* [Parser](classes/parser.md)
* [ParserResponse](classes/parserresponse.md)
* [PluginLoader](classes/pluginloader.md)
* [Response](classes/response.md)
* [ResponseParser](classes/responseparser.md)
* [Server](classes/server.md)
* [ServersList](classes/serverslist.md)
* [TestLogger](classes/testlogger.md)
* [Verbs](classes/verbs.md)

### Interfaces

* [IApp](interfaces/iapp.md)

### Type aliases

* [nameStruct](globals.md#namestruct)

### Variables

* [ServerPlugin](globals.md#const-serverplugin)
* [Servers](globals.md#const-servers)
* [getClassOf](globals.md#const-getclassof)
* [logger](globals.md#const-logger)
* [messageServer](globals.md#const-messageserver)
* [metadataKey](globals.md#const-metadatakey)
* [methodMetadataKey](globals.md#const-methodmetadatakey)
* [resultEmitter](globals.md#const-resultemitter)

### Functions

* [deserialize](globals.md#deserialize)
* [handleResult](globals.md#handleresult)
* [returnJson](globals.md#returnjson)
* [validateServerIsRunning](globals.md#validateserverisrunning)
* [verbBasedMethod](globals.md#verbbasedmethod)

### Object literals

* [primitiveArray](globals.md#const-primitivearray)

## Type aliases

###  nameStruct

Ƭ **nameStruct**: *object*

*Defined in [src/response/response-parser.ts:10](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/response/response-parser.ts#L10)*

this function parses values from the request object into the function args

**`param`** the arguments sent to the original function.

**`param`** express route string.

#### Type declaration:

* **name**: *string*

## Variables

### `Const` ServerPlugin

• **ServerPlugin**: *[EmitterPlugin](classes/emitterplugin.md)‹›* = new EmitterPlugin()

*Defined in [src/tests/servers/emitter.server.ts:13](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/tests/servers/emitter.server.ts#L13)*

___

### `Const` Servers

• **Servers**: *any* = (global as any).METHODUS_BRIDGE

*Defined in [src/servers/serversList.ts:45](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/servers/serversList.ts#L45)*

___

### `Const` getClassOf

• **getClassOf**: *any* = Function.prototype.call.bind(Object.prototype.toString)

*Defined in [src/method/method.ts:9](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/method.ts#L9)*

___

### `Const` logger

• **logger**: *Logger‹›* = commons.logger

*Defined in [src/plugins.ts:2](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/plugins.ts#L2)*

___

### `Const` messageServer

• **messageServer**: *CustomMessageServer* = new CustomMessageServer()

*Defined in [src/tests/servers/emitter.plugin.ts:94](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/tests/servers/emitter.plugin.ts#L94)*

___

### `Const` metadataKey

• **metadataKey**: *"methodus"* = "methodus"

*Defined in [src/tests/servers/emitter.plugin.ts:12](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/tests/servers/emitter.plugin.ts#L12)*

___

### `Const` methodMetadataKey

• **methodMetadataKey**: *"methodus"* = "methodus"

*Defined in [src/method/method.ts:10](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/method.ts#L10)*

*Defined in [src/method/method-pipe.ts:7](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/method-pipe.ts#L7)*

___

### `Const` resultEmitter

• **resultEmitter**: *EventEmitter* = new EventEmitter()

*Defined in [src/tests/servers/emitter.plugin.ts:17](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/tests/servers/emitter.plugin.ts#L17)*

## Functions

###  deserialize

▸ **deserialize**(`item`: object | any): *any*

*Defined in [src/method/deserialize.ts:27](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/deserialize.ts#L27)*

Deserialize values according to their types

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`item` | object &#124; any | the arguments sent to the original function.   |

**Returns:** *any*

___

###  handleResult

▸ **handleResult**(`methodResult`: any): *Promise‹any›*

*Defined in [src/method/method.ts:205](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/method.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`methodResult` | any |

**Returns:** *Promise‹any›*

___

###  returnJson

▸ **returnJson**(`str`: string): *any*

*Defined in [src/method/deserialize.ts:59](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/deserialize.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *any*

___

###  validateServerIsRunning

▸ **validateServerIsRunning**(): *void*

*Defined in [src/method/method.ts:246](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/method.ts#L246)*

**Returns:** *void*

___

###  verbBasedMethod

▸ **verbBasedMethod**(`target`: any, `propertyKey`: string, `descriptor`: TypedPropertyDescriptor‹any›, `verb?`: undefined | string, `route?`: undefined | string, `middlewares?`: Function[]): *TypedPropertyDescriptor‹any›*

*Defined in [src/method/method.ts:23](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/method.ts#L23)*

the @Method decorator registers route listeners

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | any | - |
`propertyKey` | string | - |
`descriptor` | TypedPropertyDescriptor‹any› | - |
`verb?` | undefined &#124; string | the HTTP verb for the route. |
`route?` | undefined &#124; string | express route string. |
`middlewares?` | Function[] | an array of middlewares to apply to this function}  |

**Returns:** *TypedPropertyDescriptor‹any›*

## Object literals

### `Const` primitiveArray

### ▪ **primitiveArray**: *object*

*Defined in [src/method/deserialize.ts:5](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/deserialize.ts#L5)*

###  bool

▸ **bool**(`val`: string | boolean): *boolean*

*Defined in [src/method/deserialize.ts:6](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/deserialize.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | string &#124; boolean |

**Returns:** *boolean*

###  date

▸ **date**(`val`: string): *Date*

*Defined in [src/method/deserialize.ts:7](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/deserialize.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *Date*

###  object

▸ **object**(`val`: string | any): *any*

*Defined in [src/method/deserialize.ts:9](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/deserialize.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | string &#124; any |

**Returns:** *any*

###  string

▸ **string**(`val`: string): *string*

*Defined in [src/method/deserialize.ts:8](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/server/src/method/deserialize.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`val` | string |

**Returns:** *string*
