[Web platform components](../README.md) › [Globals](../globals.md) › [Socket](socket.md)

# Class: Socket

## Hierarchy

* **Socket**

## Index

### Constructors

* [constructor](socket.md#constructor)

### Properties

* [io](socket.md#io)
* [options](socket.md#options)
* [socket](socket.md#socket)
* [interceptor](socket.md#static-interceptor)

### Methods

* [execute](socket.md#execute)
* [parse](socket.md#parse)
* [send](socket.md#send)
* [intercept](socket.md#static-intercept)

## Constructors

###  constructor

\+ **new Socket**(): *[Socket](socket.md)*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:8](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L8)*

**Returns:** *[Socket](socket.md)*

## Properties

###  io

• **io**: *any*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:8](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L8)*

___

###  options

• **options**: *any*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:6](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L6)*

___

###  socket

• **socket**: *any*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:7](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L7)*

___

### `Static` interceptor

▪ **interceptor**: *function*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:5](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L5)*

#### Type declaration:

▸ (`options`: any): *object | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

## Methods

###  execute

▸ **execute**(): *Promise‹void›*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:41](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L41)*

**Returns:** *Promise‹void›*

___

###  parse

▸ **parse**(`verb`: [Verbs](../enums/verbs.md), `paramsMap`: [ParamsMap](paramsmap.md)[], `args`: any[]): *void*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:30](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`verb` | [Verbs](../enums/verbs.md) |
`paramsMap` | [ParamsMap](paramsmap.md)[] |
`args` | any[] |

**Returns:** *void*

___

###  send

▸ **send**(`messageName`: string, `parameters`: any): *Promise‹void›*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:34](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`messageName` | string |
`parameters` | any |

**Returns:** *Promise‹void›*

___

### `Static` intercept

▸ **intercept**(`interceptor`: function): *void*

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:24](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/transports/socket.ts#L24)*

**Parameters:**

▪ **interceptor**: *function*

▸ (`options`: any): *object*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *void*
