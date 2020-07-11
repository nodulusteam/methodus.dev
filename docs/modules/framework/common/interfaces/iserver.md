[Methodus - framework commons](../globals.md) › [IServer](modules/framework/common/iserver.md)

# Interface: IServer

## Hierarchy

* **IServer**

## Index

### Properties

* [classRouters](modules/framework/common/iserver.md#classrouters)
* [config](modules/framework/common/iserver.md#config)
* [sockets](modules/framework/common/iserver.md#optional-sockets)

### Methods

* [_send](modules/framework/common/iserver.md#_send)
* [useClass](modules/framework/common/iserver.md#useclass)

## Properties

###  classRouters

• **classRouters**: *any[]*

Defined in lib/interfaces/index.d.ts:40

___

###  config

• **config**: *[IMethodusConfig](modules/framework/common/imethodusconfig.md)*

Defined in lib/interfaces/index.d.ts:41

___

### `Optional` sockets

• **sockets**? : *any*

Defined in lib/interfaces/index.d.ts:42

## Methods

###  _send

▸ **_send**(`channel`: any, `functionArgs`: any, `message`: any, `paramsMap?`: any): *any*

Defined in lib/interfaces/index.d.ts:44

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

Defined in lib/interfaces/index.d.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`classType` | any |
`methodType` | [MethodType](../enums/methodtype.md) |

**Returns:** *void*
