[Methodus - framework commons](../globals.md) › [ITransport](modules/framework/common/itransport.md)

# Interface: ITransport

## Hierarchy

* **ITransport**

## Index

### Properties

* [name](modules/framework/common/itransport.md#name)

### Methods

* [register](modules/framework/common/itransport.md#register)
* [send](modules/framework/common/itransport.md#send)

## Properties

###  name

• **name**: *string*

Defined in lib/interfaces/index.d.ts:35

## Methods

###  register

▸ **register**(`server`: any, `parentServer`: any): *void*

Defined in lib/interfaces/index.d.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`server` | any |
`parentServer` | any |

**Returns:** *void*

___

###  send

▸ **send**(`methodus`: any, `functionArgs`: any, `paramsMap`: any, `securityContext`: any): *Promise‹any›*

Defined in lib/interfaces/index.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`methodus` | any |
`functionArgs` | any |
`paramsMap` | any |
`securityContext` | any |

**Returns:** *Promise‹any›*
