[A Methodus guide](../README.md) › [InjectorType](injectortype.md)

# Class: InjectorType

## Hierarchy

* **InjectorType**

## Index

### Properties

* [records](injectortype.md#private-records)
* [singletons](injectortype.md#private-singletons)

### Methods

* [get](injectortype.md#get)
* [inject](injectortype.md#inject)
* [register](injectortype.md#register)
* [resolveAndCreate](injectortype.md#resolveandcreate)

## Properties

### `Private` records

• **records**: *object[]* = []

Defined in lib/injector/index.d.ts:10

*Defined in [src/injector/index.ts:13](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/injector/index.ts#L13)*

___

### `Private` singletons

• **singletons**: *any*

Defined in lib/injector/index.d.ts:11

*Defined in [src/injector/index.ts:19](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/injector/index.ts#L19)*

## Methods

###  get

▸ **get**‹**T**›(`_token`: any): *T*

Defined in lib/injector/index.d.ts:15

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`_token` | any |

**Returns:** *T*

___

###  inject

▸ **inject**(`registrationType`: [RegistrationTypes](../enums/registrationtypes.md), `target`: any, `name?`: undefined | string): *void*

Defined in lib/injector/index.d.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`registrationType` | [RegistrationTypes](../enums/registrationtypes.md) |
`target` | any |
`name?` | undefined &#124; string |

**Returns:** *void*

___

###  register

▸ **register**(`token`: any, `deps`: any, `registrationType`: [RegistrationTypes](../enums/registrationtypes.md), `alias?`: undefined | string): *void*

Defined in lib/injector/index.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`token` | any |
`deps` | any |
`registrationType` | [RegistrationTypes](../enums/registrationtypes.md) |
`alias?` | undefined &#124; string |

**Returns:** *void*

___

###  resolveAndCreate

▸ **resolveAndCreate**(`tokens`: Array‹any›): *this*

Defined in lib/injector/index.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`tokens` | Array‹any› |

**Returns:** *this*
