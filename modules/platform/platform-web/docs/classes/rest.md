[Methodus client library](../README.md) > [Rest](../classes/rest.md)

# Class: Rest

## Hierarchy

**Rest**

## Index

### Constructors

* [constructor](rest.md#constructor)

### Properties

* [options](rest.md#options)
* [request](rest.md#request)
* [interceptor](rest.md#interceptor)

### Methods

* [parse](rest.md#parse)
* [send](rest.md#send)
* [intercept](rest.md#intercept)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Rest**(uri: *`string`*, verb: *[Verbs](../enums/verbs.md)*, paramsMap: *[ParamsMap](paramsmap.md)[]*, args: *`any`[]*): [Rest](rest.md)

*Defined in [src/lib/transports/rest.ts:8](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/rest.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| uri | `string` |
| verb | [Verbs](../enums/verbs.md) |
| paramsMap | [ParamsMap](paramsmap.md)[] |
| args | `any`[] |

**Returns:** [Rest](rest.md)

___

## Properties

<a id="options"></a>

###  options

**● options**: *`any`*

*Defined in [src/lib/transports/rest.ts:7](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/rest.ts#L7)*

___
<a id="request"></a>

###  request

**● request**: *`any`*

*Defined in [src/lib/transports/rest.ts:8](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/rest.ts#L8)*

___
<a id="interceptor"></a>

### `<Static>` interceptor

**● interceptor**: *`function`*

*Defined in [src/lib/transports/rest.ts:6](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/rest.ts#L6)*

#### Type declaration
▸(options: *`any`*): `__type` \| `undefined`

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `any` |

**Returns:** `__type` \| `undefined`

___

## Methods

<a id="parse"></a>

###  parse

▸ **parse**(verb: *[Verbs](../enums/verbs.md)*, paramsMap: *[ParamsMap](paramsmap.md)[]*, args: *`any`[]*): `any`

*Defined in [src/lib/transports/rest.ts:25](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/rest.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | [Verbs](../enums/verbs.md) |
| paramsMap | [ParamsMap](paramsmap.md)[] |
| args | `any`[] |

**Returns:** `any`

___
<a id="send"></a>

###  send

▸ **send**(): `Promise`<`any`>

*Defined in [src/lib/transports/rest.ts:123](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/rest.ts#L123)*

**Returns:** `Promise`<`any`>

___
<a id="intercept"></a>

### `<Static>` intercept

▸ **intercept**(interceptor: *`function`*): `void`

*Defined in [src/lib/transports/rest.ts:19](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/platform/platform-web/src/lib/transports/rest.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| interceptor | `function` |

**Returns:** `void`

___

