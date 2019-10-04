[A Methodus guide](../README.md) > [Injector](../classes/injector.md)

# Class: Injector

## Hierarchy

**Injector**

## Index

### Properties

* [records](injector.md#records)
* [singletons](injector.md#singletons)

### Methods

* [get](injector.md#get)
* [inject](injector.md#inject)
* [register](injector.md#register)
* [resolveAndCreate](injector.md#resolveandcreate)

---

## Properties

<a id="records"></a>

### `<Static>``<Private>` records

**● records**: *`any`*

*Defined in build/di/decorators/injector.d.ts:3*

___
<a id="singletons"></a>

### `<Static>``<Private>` singletons

**● singletons**: *`any`*

*Defined in build/di/decorators/injector.d.ts:4*

___

## Methods

<a id="get"></a>

### `<Static>` get

▸ **get**(_token: *`any`*): `any`

*Defined in build/di/decorators/injector.d.ts:8*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `any` |

**Returns:** `any`

___
<a id="inject"></a>

### `<Static>` inject

▸ **inject**(target: *`any`*, name?: *`undefined` \| `string`*): `void`

*Defined in build/di/decorators/injector.d.ts:5*

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `any` |
| `Optional` name | `undefined` \| `string` |

**Returns:** `void`

___
<a id="register"></a>

### `<Static>` register

▸ **register**(token: *`any`*, deps?: *`any`*, alias?: *`undefined` \| `string`*): `void`

*Defined in build/di/decorators/injector.d.ts:7*

**Parameters:**

| Name | Type |
| ------ | ------ |
| token | `any` |
| `Optional` deps | `any` |
| `Optional` alias | `undefined` \| `string` |

**Returns:** `void`

___
<a id="resolveandcreate"></a>

### `<Static>` resolveAndCreate

▸ **resolveAndCreate**(tokens: *`Array`<`any`>*): [Injector](injector.md)

*Defined in build/di/decorators/injector.d.ts:6*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tokens | `Array`<`any`> |

**Returns:** [Injector](injector.md)

___

