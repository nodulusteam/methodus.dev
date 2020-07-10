[Methodus client library](../README.md) > [Socket](../classes/socket.md)

# Class: Socket

## Hierarchy

**Socket**

## Index

### Constructors

* [constructor](socket.md#constructor)

### Properties

* [io](socket.md#io)
* [options](socket.md#options)
* [socket](socket.md#socket-1)
* [interceptor](socket.md#interceptor)

### Methods

* [execute](socket.md#execute)
* [parse](socket.md#parse)
* [send](socket.md#send)
* [intercept](socket.md#intercept)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Socket**(): [Socket](socket.md)

*Defined in [src/lib/transports/socket.ts:8](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L8)*

**Returns:** [Socket](socket.md)

___

## Properties

<a id="io"></a>

###  io

**● io**: *`any`*

*Defined in [src/lib/transports/socket.ts:8](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L8)*

___
<a id="options"></a>

###  options

**● options**: *`any`*

*Defined in [src/lib/transports/socket.ts:6](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L6)*

___
<a id="socket-1"></a>

###  socket

**● socket**: *`any`*

*Defined in [src/lib/transports/socket.ts:7](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L7)*

___
<a id="interceptor"></a>

### `<Static>` interceptor

**● interceptor**: *`function`*

*Defined in [src/lib/transports/socket.ts:5](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L5)*

#### Type declaration
▸(options: *`any`*): `__type` \| `undefined`

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `any` |

**Returns:** `__type` \| `undefined`

___

## Methods

<a id="execute"></a>

###  execute

▸ **execute**(): `Promise`<`void`>

*Defined in [src/lib/transports/socket.ts:41](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L41)*

**Returns:** `Promise`<`void`>

___
<a id="parse"></a>

###  parse

▸ **parse**(verb: *[Verbs](../enums/verbs.md)*, paramsMap: *[ParamsMap](paramsmap.md)[]*, args: *`any`[]*): `void`

*Defined in [src/lib/transports/socket.ts:30](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | [Verbs](../enums/verbs.md) |
| paramsMap | [ParamsMap](paramsmap.md)[] |
| args | `any`[] |

**Returns:** `void`

___
<a id="send"></a>

###  send

▸ **send**(messageName: *`string`*, parameters: *`any`*): `Promise`<`void`>

*Defined in [src/lib/transports/socket.ts:34](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| messageName | `string` |
| parameters | `any` |

**Returns:** `Promise`<`void`>

___
<a id="intercept"></a>

### `<Static>` intercept

▸ **intercept**(interceptor: *`function`*): `void`

*Defined in [src/lib/transports/socket.ts:24](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/socket.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| interceptor | `function` |

**Returns:** `void`

___

