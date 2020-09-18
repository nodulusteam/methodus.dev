[Methodus - platform rest](README.md) › [Globals](globals.md)

# Methodus - platform rest

## Index

### Classes

* [ClientList](classes/clientlist.md)
* [ConfiguredClient](classes/configuredclient.md)
* [Encoder](classes/encoder.md)
* [MethodHandler](classes/methodhandler.md)
* [Server](classes/server.md)
* [Verbs](classes/verbs.md)

### Interfaces

* [IApp](interfaces/iapp.md)
* [MethodusObject](interfaces/methodusobject.md)
* [RequestParams](interfaces/requestparams.md)

### Type aliases

* [Dictionary](globals.md#dictionary)
* [ParamMapItem](globals.md#parammapitem)
* [RequestPayload](globals.md#requestpayload)

### Variables

* [Clients](globals.md#const-clients)
* [Http](globals.md#const-http)
* [TESTBASE](globals.md#const-testbase)
* [btoa](globals.md#const-btoa)
* [getClassOf](globals.md#const-getclassof)
* [logger](globals.md#const-logger)
* [methodMetadataKey](globals.md#const-methodmetadatakey)
* [name](globals.md#const-name)

### Functions

* [createResult](globals.md#createresult)
* [handleAuth](globals.md#handleauth)
* [handleFiles](globals.md#handlefiles)
* [handleHeaders](globals.md#handleheaders)
* [handleParamsMap](globals.md#handleparamsmap)
* [handleProxy](globals.md#handleproxy)
* [handleQuery](globals.md#handlequery)
* [handleResult](globals.md#handleresult)
* [send](globals.md#send)
* [validateServerIsRunning](globals.md#validateserverisrunning)
* [verbBasedMethod](globals.md#verbbasedmethod)

## Type aliases

###  Dictionary

Ƭ **Dictionary**: *object*

Defined in dist/interfaces.d.ts:1

*Defined in [src/interfaces.ts:1](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/interfaces.ts#L1)*

#### Type declaration:

* \[ **key**: *string*\]: T

___

###  ParamMapItem

Ƭ **ParamMapItem**: *object*

Defined in dist/interfaces.d.ts:20

*Defined in [src/interfaces.ts:20](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/interfaces.ts#L20)*

#### Type declaration:

* **from**: *string*

* **index**: *number*

* **name**? : *undefined | string*

___

###  RequestPayload

Ƭ **RequestPayload**: *object*

Defined in dist/web-request.d.ts:4

*Defined in [src/web-request.ts:14](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/web-request.ts#L14)*

#### Type declaration:

* **auth**? : *AuthType*

* **authOptions**: *any*

* **body**: *any*

* **files**: *any*

* **headers**: *any*

* **params**: *any[]*

* **parts**: *string[]*

* **query**: *any*

* **securityContext**? : *any*

* **uri**: *string*

* **verb**: *string*

## Variables

### `Const` Clients

• **Clients**: *any* = (global as any).METHODUS_BRIDGE

Defined in dist/clients-list.d.ts:12

*Defined in [src/clients-list.ts:42](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/clients-list.ts#L42)*

___

### `Const` Http

• **Http**: *object*

Defined in dist/index.d.ts:7

#### Type declaration:

* **class**: *typeof plugin*

* **name**: *string*

___

### `Const` TESTBASE

• **TESTBASE**: *"http://jsonplaceholder.typicode.com"* = "http://jsonplaceholder.typicode.com"

*Defined in [src/tests/rest.test.ts:4](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/tests/rest.test.ts#L4)*

___

### `Const` btoa

• **btoa**: *any* = require('btoa')

*Defined in [src/encoder.ts:1](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/encoder.ts#L1)*

___

### `Const` getClassOf

• **getClassOf**: *any* = Function.prototype.call.bind(Object.prototype.toString)

*Defined in [src/method/method.ts:7](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/method/method.ts#L7)*

___

### `Const` logger

• **logger**: *Logger‹›* = new commons.Logger('transports:http')

*Defined in [src/web-request.ts:12](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/web-request.ts#L12)*

___

### `Const` methodMetadataKey

• **methodMetadataKey**: *"methodus"* = "methodus"

*Defined in [src/method/method.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/method/method.ts#L8)*

___

### `Const` name

• **name**: *string* = "Http/Rest"

Defined in dist/sender.d.ts:5

Defined in dist/index.d.ts:6

*Defined in [src/sender.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/sender.ts#L8)*

## Functions

###  createResult

▸ **createResult**(`requestResult`: any): *MethodResult‹any›*

*Defined in [src/sender.ts:27](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/sender.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`requestResult` | any |

**Returns:** *MethodResult‹any›*

___

###  handleAuth

▸ **handleAuth**(`requestOptions`: any, `payload`: [RequestPayload](globals.md#requestpayload), `that`: any): *Promise‹any›*

*Defined in [src/web-request.ts:227](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/web-request.ts#L227)*

**Parameters:**

Name | Type |
------ | ------ |
`requestOptions` | any |
`payload` | [RequestPayload](globals.md#requestpayload) |
`that` | any |

**Returns:** *Promise‹any›*

___

###  handleFiles

▸ **handleFiles**(`requestOptions`: any, `payload`: [RequestPayload](globals.md#requestpayload)): *any*

*Defined in [src/web-request.ts:263](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/web-request.ts#L263)*

**Parameters:**

Name | Type |
------ | ------ |
`requestOptions` | any |
`payload` | [RequestPayload](globals.md#requestpayload) |

**Returns:** *any*

___

###  handleHeaders

▸ **handleHeaders**(`requestOptions`: any, `payload`: [RequestPayload](globals.md#requestpayload)): *any*

*Defined in [src/web-request.ts:292](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/web-request.ts#L292)*

**Parameters:**

Name | Type |
------ | ------ |
`requestOptions` | any |
`payload` | [RequestPayload](globals.md#requestpayload) |

**Returns:** *any*

___

###  handleParamsMap

▸ **handleParamsMap**(`paramsMap`: any[], `payload`: [RequestPayload](globals.md#requestpayload)): *object*

*Defined in [src/web-request.ts:84](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/web-request.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`paramsMap` | any[] |
`payload` | [RequestPayload](globals.md#requestpayload) |

**Returns:** *object*

* **auth**? : *AuthType*

* **authOptions**: *any*

* **body**: *any*

* **files**: *any*

* **headers**: *any*

* **params**: *any[]*

* **parts**: *string[]*

* **query**: *any*

* **securityContext**? : *any*

* **uri**: *string*

* **verb**: *string*

___

###  handleProxy

▸ **handleProxy**(`requestOptions`: any, `payload`: [RequestPayload](globals.md#requestpayload)): *any*

*Defined in [src/web-request.ts:175](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/web-request.ts#L175)*

**Parameters:**

Name | Type |
------ | ------ |
`requestOptions` | any |
`payload` | [RequestPayload](globals.md#requestpayload) |

**Returns:** *any*

___

###  handleQuery

▸ **handleQuery**(`payload`: [RequestPayload](globals.md#requestpayload)): *object*

*Defined in [src/web-request.ts:142](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-rest/src/web-request.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | [RequestPayload](globals.md#requestpayload) |

**Returns:** *object*

* **auth**? : *AuthType*

* **authOptions**: *any*

* **body**: *any*

* **files**: *any*

* **headers**: *any*

* **params**: *any[]*

* **parts**: *string[]*

* **query**: *any*

* **securityContext**? : *any*

* **uri**: *string*

* **verb**: *string*

___

###  handleResult

▸ **handleResult**(`methodResult`: any): *Promise‹any›*

Defined in dist/method/method.d.ts:3

**Parameters:**

Name | Type |
------ | ------ |
`methodResult` | any |

**Returns:** *Promise‹any›*

___

###  send

▸ **send**‹**T**›(`methodus`: [MethodusObject](interfaces/methodusobject.md), `functionArgs`: any[], `paramsMap`: [ParamMapItem](globals.md#parammapitem)[], `securityContext?`: any): *Promise‹MethodResult‹T››*

Defined in dist/sender.d.ts:6

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`methodus` | [MethodusObject](interfaces/methodusobject.md) |
`functionArgs` | any[] |
`paramsMap` | [ParamMapItem](globals.md#parammapitem)[] |
`securityContext?` | any |

**Returns:** *Promise‹MethodResult‹T››*

___

###  validateServerIsRunning

▸ **validateServerIsRunning**(): *void*

Defined in dist/method/method.d.ts:4

**Returns:** *void*

___

###  verbBasedMethod

▸ **verbBasedMethod**(`target`: any, `propertyKey`: string, `descriptor`: TypedPropertyDescriptor‹any›, `verb?`: undefined | string, `route?`: undefined | string, `middlewares?`: Function[]): *TypedPropertyDescriptor‹any›*

Defined in dist/method/method.d.ts:2

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
