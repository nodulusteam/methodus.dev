[Web platform components](../README.md) › [Globals](../globals.md) › [Injector](injector.md)

# Class: Injector

## Hierarchy

* **Injector**

## Index

### Properties

* [records](injector.md#static-private-records)
* [singletons](injector.md#static-private-singletons)

### Methods

* [get](injector.md#static-get)
* [inject](injector.md#static-inject)
* [register](injector.md#static-register)
* [resolveAndCreate](injector.md#static-resolveandcreate)

## Properties

### `Static` `Private` records

▪ **records**: *object[]* = []

*Defined in [modules/platform/platform-web/src/lib/di/injector.ts:5](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/di/injector.ts#L5)*

___

### `Static` `Private` singletons

▪ **singletons**: *any*

*Defined in [modules/platform/platform-web/src/lib/di/injector.ts:6](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/di/injector.ts#L6)*

## Methods

### `Static` get

▸ **get**‹**T**›(`_token`: any): *T*

*Defined in [modules/platform/platform-web/src/lib/di/injector.ts:46](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/di/injector.ts#L46)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`_token` | any |

**Returns:** *T*

___

### `Static` inject

▸ **inject**(`target`: any, `name?`: string): *void*

*Defined in [modules/platform/platform-web/src/lib/di/injector.ts:8](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/di/injector.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`name?` | string |

**Returns:** *void*

___

### `Static` register

▸ **register**(`name`: string, `target`: any, `deps`: any): *void*

*Defined in [modules/platform/platform-web/src/lib/di/injector.ts:38](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/di/injector.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`target` | any | - |
`deps` | any | [] |

**Returns:** *void*

___

### `Static` resolveAndCreate

▸ **resolveAndCreate**(`tokens`: Array‹any›): *[Injector](injector.md)*

*Defined in [modules/platform/platform-web/src/lib/di/injector.ts:25](https://github.com/nodulusteam/methodus.dev/blob/58b1bce/modules/platform/platform-web/src/lib/di/injector.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`tokens` | Array‹any› |

**Returns:** *[Injector](injector.md)*
