[Methodus - framework commons](../globals.md) › [IServer](modules/framework/common/iserver.md)

# Interface: IServer

## Hierarchy

* **IServer**

## Index

### Properties

* [classRouters](#classrouters)
* [config](#config)
* [sockets](#optional-sockets)

### Methods

* [_send](#_send)
* [useClass](#useclass)

## Properties

###  classRouters

• **classRouters**: *any[]*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:40

___

###  config

• **config**: *[IMethodusConfig](modules/framework/common/imethodusconfig.md)*

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
