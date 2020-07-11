[Web platform components](../README.md) › [Globals](../globals.md) › ["lib/transports/socket"](../modules/_lib_transports_socket_.md) › [Socket](_lib_transports_socket_.socket.md)

# Class: Socket

## Hierarchy

* **Socket**

## Index

### Constructors

* [constructor](_lib_transports_socket_.socket.md#constructor)

### Properties

* [io](_lib_transports_socket_.socket.md#io)
* [options](_lib_transports_socket_.socket.md#options)
* [socket](_lib_transports_socket_.socket.md#socket)
* [interceptor](_lib_transports_socket_.socket.md#static-interceptor)

### Methods

* [execute](_lib_transports_socket_.socket.md#execute)
* [parse](_lib_transports_socket_.socket.md#parse)
* [send](_lib_transports_socket_.socket.md#send)
* [intercept](_lib_transports_socket_.socket.md#static-intercept)

## Constructors

###  constructor

\+ **new Socket**(): *[Socket](_lib_transports_socket_.socket.md)*

*Defined in [src/lib/transports/socket.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L8)*

**Returns:** *[Socket](_lib_transports_socket_.socket.md)*

## Properties

###  io

• **io**: *any*

*Defined in [src/lib/transports/socket.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L8)*

___

###  options

• **options**: *any*

*Defined in [src/lib/transports/socket.ts:6](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L6)*

___

###  socket

• **socket**: *any*

*Defined in [src/lib/transports/socket.ts:7](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L7)*

___

### `Static` interceptor

▪ **interceptor**: *function*

*Defined in [src/lib/transports/socket.ts:5](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L5)*

#### Type declaration:

▸ (`options`: any): *object | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

## Methods

###  execute

▸ **execute**(): *Promise‹void›*

*Defined in [src/lib/transports/socket.ts:41](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L41)*

**Returns:** *Promise‹void›*

___

###  parse

▸ **parse**(`verb`: [Verbs](../enums/_lib_commons_enums_.verbs.md), `paramsMap`: [ParamsMap](_lib_commons_params_map_.paramsmap.md)[], `args`: any[]): *void*

*Defined in [src/lib/transports/socket.ts:30](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`verb` | [Verbs](../enums/_lib_commons_enums_.verbs.md) |
`paramsMap` | [ParamsMap](_lib_commons_params_map_.paramsmap.md)[] |
`args` | any[] |

**Returns:** *void*

___

###  send

▸ **send**(`messageName`: string, `parameters`: any): *Promise‹void›*

*Defined in [src/lib/transports/socket.ts:34](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`messageName` | string |
`parameters` | any |

**Returns:** *Promise‹void›*

___

### `Static` intercept

▸ **intercept**(`interceptor`: function): *void*

*Defined in [src/lib/transports/socket.ts:24](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/socket.ts#L24)*

**Parameters:**

▪ **interceptor**: *function*

▸ (`options`: any): *object*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *void*
