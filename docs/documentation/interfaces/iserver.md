[A Methodus guide](../README.md) > [IServer](../interfaces/iserver.md)

# Interface: IServer

## Hierarchy

**IServer**

## Index

### Properties

* [classRouters](iserver.md#classrouters)
* [config](iserver.md#config)
* [sockets](iserver.md#sockets)

### Methods

* [_send](iserver.md#_send)
* [useClass](iserver.md#useclass)

---

## Properties

<a id="classrouters"></a>

###  classRouters

**● classRouters**: *`any`[]*

*Defined in lib/interfaces/index.d.ts:15*
*Defined in [src/interfaces/index.ts:19](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/interfaces/index.ts#L19)*

___
<a id="config"></a>

###  config

**● config**: *`IMethodusConfig`*

*Defined in lib/interfaces/index.d.ts:16*
*Defined in [src/interfaces/index.ts:20](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/interfaces/index.ts#L20)*

___
<a id="sockets"></a>

### `<Optional>` sockets

**● sockets**: *`any`*

*Defined in lib/interfaces/index.d.ts:17*
*Defined in [src/interfaces/index.ts:21](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/interfaces/index.ts#L21)*

___

## Methods

<a id="_send"></a>

###  _send

▸ **_send**(channel: *`any`*, functionArgs: *`any`*, message: *`any`*, paramsMap?: *`any`*): `any`

▸ **_send**(channel: *`any`*, functionArgs: *`any`*, message: *`any`*, paramsMap?: *`any`*): `any`

*Defined in lib/interfaces/index.d.ts:19*

**Parameters:**

| Name | Type |
| ------ | ------ |
| channel | `any` |
| functionArgs | `any` |
| message | `any` |
| `Optional` paramsMap | `any` |

**Returns:** `any`

*Defined in [src/interfaces/index.ts:23](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/interfaces/index.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| channel | `any` |
| functionArgs | `any` |
| message | `any` |
| `Optional` paramsMap | `any` |

**Returns:** `any`

___
<a id="useclass"></a>

###  useClass

▸ **useClass**(classType: *`any`*, methodType: *[MethodType](../enums/methodtype.md)*): `void`

▸ **useClass**(classType: *`any`*, methodType: *`MethodType`*): `void`

*Defined in lib/interfaces/index.d.ts:18*

**Parameters:**

| Name | Type |
| ------ | ------ |
| classType | `any` |
| methodType | [MethodType](../enums/methodtype.md) |

**Returns:** `void`

*Defined in [src/interfaces/index.ts:22](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/interfaces/index.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| classType | `any` |
| methodType | `MethodType` |

**Returns:** `void`

___

