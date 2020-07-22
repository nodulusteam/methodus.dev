[Methodus - framework commons](../globals.md) › [IServer](iserver.md)

# Interface: IServer

## Hierarchy

* **IServer**

## Index

### Properties

* [classRouters](iserver.md#classrouters)
* [config](iserver.md#config)
* [sockets](iserver.md#optional-sockets)

### Methods

* [_send](iserver.md#_send)
* [useClass](iserver.md#useclass)

## Properties

###  classRouters

• **classRouters**: *any[]*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:40

___

###  config

• **config**: *[IMethodusConfig](imethodusconfig.md)*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:41

___

### `Optional` sockets

• **sockets**? : *any*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:42

## Methods

###  _send

▸ **_send**(`channel`: any, `functionArgs`: any, `message`: any, `paramsMap?`: any): *any*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`channel` | any |
`functionArgs` | any |
`message` | any |
`paramsMap?` | any |

**Returns:** *any*

___

###  useClass

▸ **useClass**(`classType`: any, `methodType`: [MethodType](../enums/methodtype.md)): *void*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`classType` | any |
`methodType` | [MethodType](../enums/methodtype.md) |

**Returns:** *void*
