[Web platform components](../README.md) > [Injector](../classes/injector.md)

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

**● records**: *`object`[]* =  []

*Defined in [src/lib/di/injector.ts:5](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/di/injector.ts#L5)*

___
<a id="singletons"></a>

### `<Static>``<Private>` singletons

**● singletons**: *`any`*

*Defined in [src/lib/di/injector.ts:6](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/di/injector.ts#L6)*

___

## Methods

<a id="get"></a>

### `<Static>` get

▸ **get**<`T`>(_token: *`any`*): `T`

*Defined in [src/lib/di/injector.ts:46](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/di/injector.ts#L46)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `any` |

**Returns:** `T`

___
<a id="inject"></a>

### `<Static>` inject

▸ **inject**(target: *`any`*, name?: *`string`*): `void`

*Defined in [src/lib/di/injector.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/di/injector.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `any` |
| `Optional` name | `string` |

**Returns:** `void`

___
<a id="register"></a>

### `<Static>` register

▸ **register**(name: *`string`*, target: *`any`*, deps?: *`any`*): `void`

*Defined in [src/lib/di/injector.ts:38](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/di/injector.ts#L38)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| name | `string` | - |
| target | `any` | - |
| `Default value` deps | `any` |  [] |

**Returns:** `void`

___
<a id="resolveandcreate"></a>

### `<Static>` resolveAndCreate

▸ **resolveAndCreate**(tokens: *`Array`<`any`>*): [Injector](injector.md)

*Defined in [src/lib/di/injector.ts:25](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/di/injector.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tokens | `Array`<`any`> |

**Returns:** [Injector](injector.md)

___

