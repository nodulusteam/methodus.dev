[Server components](../README.md) › [Globals](../globals.md) › [EmitterPlugin](emitterplugin.md)

# Class: EmitterPlugin

## Hierarchy

* **EmitterPlugin**

## Implements

* ITransport

## Index

### Properties

* [name](emitterplugin.md#name)

### Methods

* [register](emitterplugin.md#register)
* [send](emitterplugin.md#send)

## Properties

###  name

• **name**: *string* = "Plugin"

*Defined in [src/tests/servers/emitter.plugin.ts:64](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/server/src/tests/servers/emitter.plugin.ts#L64)*

## Methods

###  register

▸ **register**(`server`: any, `parentServer`: any): *void*

*Defined in [src/tests/servers/emitter.plugin.ts:66](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/server/src/tests/servers/emitter.plugin.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`server` | any |
`parentServer` | any |

**Returns:** *void*

___

###  send

▸ **send**(`methodus`: any, `functionArgs`: any, `paramsMap`: any, `securityContext`: any): *Promise‹any›*

*Defined in [src/tests/servers/emitter.plugin.ts:72](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/server/src/tests/servers/emitter.plugin.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`methodus` | any |
`functionArgs` | any |
`paramsMap` | any |
`securityContext` | any |

**Returns:** *Promise‹any›*
