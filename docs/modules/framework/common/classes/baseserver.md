[Methodus - framework commons](../globals.md) › [BaseServer](modules/framework/common/baseserver.md)

# Class: BaseServer

## Hierarchy

* **BaseServer**

## Index

### Properties

* [classRouters](#classrouters)
* [config](#optional-config)

### Methods

* [_send](#_send)
* [useClass](#useclass)

## Properties

###  classRouters

• **classRouters**: *[ClassRef](../globals.md#classref)[]* = []

Defined in lib/config/base.d.ts:4

*Defined in [src/config/base.ts:6](#L6)*

___

### `Optional` config

• **config**? : *[IMethodusConfig](../interfaces/imethodusconfig.md)*

Defined in lib/config/base.d.ts:3

*Defined in [src/config/base.ts:5](#L5)*

## Methods

###  _send

▸ **_send**(`functionArgs`: any[], `methodinformation`: any, `paramsMap`: [Dictionary](../globals.md#dictionary), `securityContext?`: [Dictionary](../globals.md#dictionary)): *any*

Defined in lib/config/base.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`functionArgs` | any[] |
`methodinformation` | any |
`paramsMap` | [Dictionary](../globals.md#dictionary) |
`securityContext?` | [Dictionary](../globals.md#dictionary) |

**Returns:** *any*

___

###  useClass

▸ **useClass**(`classType`: any, `methodType`: [MethodType](../enums/methodtype.md)): *any*

Defined in lib/config/base.d.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`classType` | any |
`methodType` | [MethodType](../enums/methodtype.md) |

**Returns:** *any*
