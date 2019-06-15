[@methodus/server](../README.md) > [MethodResult](../classes/methodresult.md)

# Class: MethodResult

## Type parameters
#### T 
## Hierarchy

**MethodResult**

## Index

### Constructors

* [constructor](methodresult.md#constructor)

### Properties

* [_on](methodresult.md#_on)
* [headers](methodresult.md#headers)
* [page](methodresult.md#page)
* [result](methodresult.md#result)
* [statusCode](methodresult.md#statuscode)
* [stream](methodresult.md#stream)
* [total](methodresult.md#total)

### Methods

* [on](methodresult.md#on)
* [pipe](methodresult.md#pipe)
* [setHeader](methodresult.md#setheader)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MethodResult**(result: *`T`*, total?: *`undefined` \| `number`*, page?: *`undefined` \| `number`*): [MethodResult](methodresult.md)

*Defined in [response/methodResult.ts:8](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| result | `T` |
| `Optional` total | `undefined` \| `number` |
| `Optional` page | `undefined` \| `number` |

**Returns:** [MethodResult](methodresult.md)

___

## Properties

<a id="_on"></a>

### `<Private>` _on

**● _on**: *`object`*

*Defined in [response/methodResult.ts:8](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L8)*

#### Type declaration

[key: `string`]: `function`

▸(): `__type`

**Returns:** `__type`

___
<a id="headers"></a>

###  headers

**● headers**: *`any`*

*Defined in [response/methodResult.ts:7](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L7)*

___
<a id="page"></a>

###  page

**● page**: *`number`* = 1

*Defined in [response/methodResult.ts:3](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L3)*

___
<a id="result"></a>

###  result

**● result**: *`T`*

*Defined in [response/methodResult.ts:5](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L5)*

___
<a id="statuscode"></a>

###  statusCode

**● statusCode**: *`number`* = 200

*Defined in [response/methodResult.ts:6](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L6)*

___
<a id="stream"></a>

###  stream

**● stream**: *`any`*

*Defined in [response/methodResult.ts:2](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L2)*

___
<a id="total"></a>

###  total

**● total**: *`number`* = 0

*Defined in [response/methodResult.ts:4](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L4)*

___

## Methods

<a id="on"></a>

###  on

▸ **on**(key: *`any`*, value: *`any`*): `void`

*Defined in [response/methodResult.ts:25](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |
| value | `any` |

**Returns:** `void`

___
<a id="pipe"></a>

###  pipe

▸ **pipe**(streamToPipe: *`any`*): `any`

*Defined in [response/methodResult.ts:18](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| streamToPipe | `any` |

**Returns:** `any`

___
<a id="setheader"></a>

###  setHeader

▸ **setHeader**(key: *`any`*, value: *`any`*): `void`

*Defined in [response/methodResult.ts:22](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/response/methodResult.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |
| value | `any` |

**Returns:** `void`

___

