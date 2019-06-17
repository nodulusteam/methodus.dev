[@methodus/server](../README.md) > [ITransport](../interfaces/itransport.md)

# Interface: ITransport

## Hierarchy

**ITransport**

## Implemented by

* [EmitterPlugin](../classes/emitterplugin.md)

## Index

### Properties

* [name](itransport.md#name)

### Methods

* [register](itransport.md#register)
* [send](itransport.md#send)

---

## Properties

<a id="name"></a>

###  name

**● name**: *`string`*

*Defined in [interfaces/methodus.ts:12](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/interfaces/methodus.ts#L12)*

___

## Methods

<a id="register"></a>

###  register

▸ **register**(server: *`any`*, parentServer: *`any`*): `void`

*Defined in [interfaces/methodus.ts:13](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/interfaces/methodus.ts#L13)*

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

*Defined in [interfaces/methodus.ts:14](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/interfaces/methodus.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| methodus | `any` |
| functionArgs | `any` |
| paramsMap | `any` |
| securityContext | `any` |

**Returns:** `Promise`<`any`>

___

