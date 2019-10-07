[A Methodus guide](../README.md) > [EmitterPlugin](../classes/emitterplugin.md)

# Class: EmitterPlugin

## Hierarchy

**EmitterPlugin**

## Implements

* [ITransport](../interfaces/itransport.md)
* `ITransport`

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

*Defined in build/tests/servers/emitter.plugin.d.ts:16*
*Defined in [src/tests/servers/emitter.plugin.ts:59](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/tests/servers/emitter.plugin.ts#L59)*

___

## Methods

<a id="register"></a>

###  register

▸ **register**(server: *`any`*, parentServer: *`any`*): `void`

*Implementation of [ITransport](../interfaces/itransport.md).[register](../interfaces/itransport.md#register)*

*Defined in build/tests/servers/emitter.plugin.d.ts:17*

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

*Defined in build/tests/servers/emitter.plugin.d.ts:18*

**Parameters:**

| Name | Type |
| ------ | ------ |
| methodus | `any` |
| functionArgs | `any` |
| paramsMap | `any` |
| securityContext | `any` |

**Returns:** `Promise`<`any`>

___

