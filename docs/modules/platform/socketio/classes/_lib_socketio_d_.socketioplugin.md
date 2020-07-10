[A Methodus guide](../README.md) › ["lib/socketio.d"](../modules/_lib_socketio_d_.md) › [SocketIOPlugin](_lib_socketio_d_.socketioplugin.md)

# Class: SocketIOPlugin

## Hierarchy

* BaseServer

  ↳ **SocketIOPlugin**

## Index

### Constructors

* [constructor](_lib_socketio_d_.socketioplugin.md#constructor)

### Properties

* [_app](_lib_socketio_d_.socketioplugin.md#_app)
* [classRouters](_lib_socketio_d_.socketioplugin.md#classrouters)
* [config](_lib_socketio_d_.socketioplugin.md#optional-config)

### Methods

* [_send](_lib_socketio_d_.socketioplugin.md#_send)
* [close](_lib_socketio_d_.socketioplugin.md#close)
* [socketHandler](_lib_socketio_d_.socketioplugin.md#sockethandler)
* [useClass](_lib_socketio_d_.socketioplugin.md#useclass)
* [register](_lib_socketio_d_.socketioplugin.md#static-register)

## Constructors

###  constructor

\+ **new SocketIOPlugin**(`options`: any, `httpServer`: any): *[SocketIOPlugin](_lib_socketio_d_.socketioplugin.md)*

Defined in modules/platform/platform-socketio/lib/socketio.d.ts:3

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |
`httpServer` | any |

**Returns:** *[SocketIOPlugin](_lib_socketio_d_.socketioplugin.md)*

## Properties

###  _app

• **_app**: *any*

Defined in modules/platform/platform-socketio/lib/socketio.d.ts:3

___

###  classRouters

• **classRouters**: *ClassRef[]*

*Inherited from [SocketIOPlugin](_lib_socketio_d_.socketioplugin.md).[classRouters](_lib_socketio_d_.socketioplugin.md#classrouters)*

Defined in modules/framework/framework-commons/lib/config/base.d.ts:4

___

### `Optional` config

• **config**? : *IMethodusConfig*

*Inherited from [SocketIOPlugin](_lib_socketio_d_.socketioplugin.md).[config](_lib_socketio_d_.socketioplugin.md#optional-config)*

Defined in modules/framework/framework-commons/lib/config/base.d.ts:3

## Methods

###  _send

▸ **_send**(`functionArgs`: any[], `methodinformation`: any, `paramsMap`: Dictionary, `securityContext?`: Dictionary): *any*

*Inherited from [SocketIOPlugin](_lib_socketio_d_.socketioplugin.md).[_send](_lib_socketio_d_.socketioplugin.md#_send)*

Defined in modules/framework/framework-commons/lib/config/base.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`functionArgs` | any[] |
`methodinformation` | any |
`paramsMap` | Dictionary |
`securityContext?` | Dictionary |

**Returns:** *any*

___

###  close

▸ **close**(): *void*

Defined in modules/platform/platform-socketio/lib/socketio.d.ts:5

**Returns:** *void*

___

###  socketHandler

▸ **socketHandler**(`socket`: any): *void*

Defined in modules/platform/platform-socketio/lib/socketio.d.ts:7

**Parameters:**

Name | Type |
------ | ------ |
`socket` | any |

**Returns:** *void*

___

###  useClass

▸ **useClass**(`classType`: any): *void*

*Overrides void*

Defined in modules/platform/platform-socketio/lib/socketio.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`classType` | any |

**Returns:** *void*

___

### `Static` register

▸ **register**(`server`: any, `parentServer`: any): *void*

Defined in modules/platform/platform-socketio/lib/socketio.d.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`server` | any |
`parentServer` | any |

**Returns:** *void*
