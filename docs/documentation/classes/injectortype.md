[A Methodus guide](../README.md) > [InjectorType](../classes/injectortype.md)

# Class: InjectorType

## Hierarchy

**InjectorType**

## Index

### Properties

* [records](injectortype.md#records)
* [singletons](injectortype.md#singletons)

### Methods

* [get](injectortype.md#get)
* [inject](injectortype.md#inject)
* [register](injectortype.md#register)
* [resolveAndCreate](injectortype.md#resolveandcreate)

---

## Properties

<a id="records"></a>

### `<Private>` records

**● records**: *`object`[]* =  []

*Defined in lib/di/injector.d.ts:10*
*Defined in [src/di/injector.ts:13](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/di/injector.ts#L13)*

___
<a id="singletons"></a>

### `<Private>` singletons

**● singletons**: *`any`*

*Defined in lib/di/injector.d.ts:11*
*Defined in [src/di/injector.ts:14](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/di/injector.ts#L14)*

___

## Methods

<a id="get"></a>

###  get

▸ **get**(_token: *`any`*): `any`

*Defined in lib/di/injector.d.ts:15*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _token | `any` |

**Returns:** `any`

___
<a id="inject"></a>

###  inject

▸ **inject**(registrationType: *[RegistrationTypes](../enums/registrationtypes.md)*, target: *`any`*, name?: *`undefined` \| `string`*): `void`

*Defined in lib/di/injector.d.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| registrationType | [RegistrationTypes](../enums/registrationtypes.md) |
| target | `any` |
| `Optional` name | `undefined` \| `string` |

**Returns:** `void`

___
<a id="register"></a>

###  register

▸ **register**(token: *`any`*, deps: *`any`*, registrationType: *[RegistrationTypes](../enums/registrationtypes.md)*, alias?: *`undefined` \| `string`*): `void`

*Defined in lib/di/injector.d.ts:14*

**Parameters:**

| Name | Type |
| ------ | ------ |
| token | `any` |
| deps | `any` |
| registrationType | [RegistrationTypes](../enums/registrationtypes.md) |
| `Optional` alias | `undefined` \| `string` |

**Returns:** `void`

___
<a id="resolveandcreate"></a>

###  resolveAndCreate

▸ **resolveAndCreate**(tokens: *`Array`<`any`>*): `this`

*Defined in lib/di/injector.d.ts:13*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tokens | `Array`<`any`> |

**Returns:** `this`

___

