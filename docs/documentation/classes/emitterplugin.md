[@methodus/server](../README.md) > [EmitterPlugin](../classes/emitterplugin.md)

# Class: EmitterPlugin

## Hierarchy

**EmitterPlugin**

## Implements

* [ITransport](../interfaces/itransport.md)

## Index

### Properties

* [name](emitterplugin.md#name)

### Methods

* [register](emitterplugin.md#register)
* [send](emitterplugin.md#send)

---

## Properties

<a id="name"></a>

###  name

**● name**: *`string`* = "Plugin"

*Implementation of [ITransport](../interfaces/itransport.md).[name](../interfaces/itransport.md#name)*

*Defined in [tests/servers/emitter.plugin.ts:60](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/tests/servers/emitter.plugin.ts#L60)*

___

## Methods

<a id="register"></a>

###  register

▸ **register**(server: *`any`*, parentServer: *`any`*): `void`

*Implementation of [ITransport](../interfaces/itransport.md).[register](../interfaces/itransport.md#register)*

*Defined in [tests/servers/emitter.plugin.ts:62](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/tests/servers/emitter.plugin.ts#L62)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | `any` |
| parentServer | `any` |

**Returns:** `void`

___
<a id="send"></a>

###  send

▸ **send**(methodus: *`any`*, functionArgs: *`any`*, paramsMap: *`any`*, securityContext: *`any`*): `Promise`<`any`>

*Implementation of [ITransport](../interfaces/itransport.md).[send](../interfaces/itransport.md#send)*

*Defined in [tests/servers/emitter.plugin.ts:68](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/tests/servers/emitter.plugin.ts#L68)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| methodus | `any` |
| functionArgs | `any` |
| paramsMap | `any` |
| securityContext | `any` |

**Returns:** `Promise`<`any`>

___

