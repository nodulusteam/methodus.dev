[A Methodus guide](../README.md) > [ITransport](../interfaces/itransport.md)

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

*Defined in build/interfaces/methodus.d.ts:10*
*Defined in [src/interfaces/methodus.ts:12](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/interfaces/methodus.ts#L12)*

___

## Methods

<a id="register"></a>

###  register

▸ **register**(server: *`any`*, parentServer: *`any`*): `void`

▸ **register**(server: *`any`*, parentServer: *`any`*): `void`

*Defined in build/interfaces/methodus.d.ts:11*

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | `any` |
| parentServer | `any` |

**Returns:** `void`

*Defined in [src/interfaces/methodus.ts:13](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/interfaces/methodus.ts#L13)*

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

▸ **send**(methodus: *`any`*, functionArgs: *`any`*, paramsMap: *`any`*, securityContext: *`any`*): `Promise`<`any`>

*Defined in build/interfaces/methodus.d.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| methodus | `any` |
| functionArgs | `any` |
| paramsMap | `any` |
| securityContext | `any` |

**Returns:** `Promise`<`any`>

*Defined in [src/interfaces/methodus.ts:14](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/interfaces/methodus.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| methodus | `any` |
| functionArgs | `any` |
| paramsMap | `any` |
| securityContext | `any` |

**Returns:** `Promise`<`any`>

___

