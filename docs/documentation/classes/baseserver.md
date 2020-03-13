[A Methodus guide](../README.md) > [BaseServer](../classes/baseserver.md)

# Class: BaseServer

## Hierarchy

**BaseServer**

## Index

### Properties

* [classRouters](baseserver.md#classrouters)
* [config](baseserver.md#config)

### Methods

* [_send](baseserver.md#_send)
* [useClass](baseserver.md#useclass)

---

## Properties

<a id="classrouters"></a>

###  classRouters

**● classRouters**: *`any`[]* =  []

*Defined in lib/servers/base.d.ts:4*
*Defined in [src/servers/base.ts:6](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/servers/base.ts#L6)*

___
<a id="config"></a>

### `<Optional>` config

**● config**: *[IMethodusConfig](../interfaces/imethodusconfig.md)*

*Defined in lib/servers/base.d.ts:3*
*Defined in [src/servers/base.ts:5](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/servers/base.ts#L5)*

___

## Methods

<a id="_send"></a>

###  _send

▸ **_send**(functionArgs: *`any`*, methodinformation: *`any`*, paramsMap: *`any`*, securityContext: *`any`*): `any`

*Defined in lib/servers/base.d.ts:6*

**Parameters:**

| Name | Type |
| ------ | ------ |
| functionArgs | `any` |
| methodinformation | `any` |
| paramsMap | `any` |
| securityContext | `any` |

**Returns:** `any`

___
<a id="useclass"></a>

###  useClass

▸ **useClass**(classType: *`any`*, methodType: *[MethodType](../enums/methodtype.md)*): `any`

*Defined in lib/servers/base.d.ts:5*

**Parameters:**

| Name | Type |
| ------ | ------ |
| classType | `any` |
| methodType | [MethodType](../enums/methodtype.md) |

**Returns:** `any`

___

