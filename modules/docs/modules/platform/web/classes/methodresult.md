[Web platform components](../README.md) > [MethodResult](../classes/methodresult.md)

# Class: MethodResult

## Type parameters
#### T 
## Hierarchy

**MethodResult**

## Index

### Constructors

* [constructor](methodresult.md#constructor)

### Properties

* [page](methodresult.md#page)
* [result](methodresult.md#result)
* [statusCode](methodresult.md#statuscode)
* [stream](methodresult.md#stream)
* [total](methodresult.md#total)

### Methods

* [pipe](methodresult.md#pipe)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MethodResult**(result: *`T`*, total?: *`number`*, page?: *`number`*): [MethodResult](methodresult.md)

*Defined in [src/lib/response/methodResult.ts:6](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/response/methodResult.ts#L6)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| result | `T` |
| `Optional` total | `number` |
| `Optional` page | `number` |

**Returns:** [MethodResult](methodresult.md)

___

## Properties

<a id="page"></a>

###  page

**● page**: *`any`*

*Defined in [src/lib/response/methodResult.ts:4](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/response/methodResult.ts#L4)*

___
<a id="result"></a>

###  result

**● result**: *`T`*

*Defined in [src/lib/response/methodResult.ts:2](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/response/methodResult.ts#L2)*

___
<a id="statuscode"></a>

### `<Optional>` statusCode

**● statusCode**: *`number`*

*Defined in [src/lib/response/methodResult.ts:6](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/response/methodResult.ts#L6)*

___
<a id="stream"></a>

###  stream

**● stream**: *`any`*

*Defined in [src/lib/response/methodResult.ts:3](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/response/methodResult.ts#L3)*

___
<a id="total"></a>

### `<Optional>` total

**● total**: *`number`*

*Defined in [src/lib/response/methodResult.ts:5](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/response/methodResult.ts#L5)*

___

## Methods

<a id="pipe"></a>

###  pipe

▸ **pipe**(streamToPipe: *`any`*): `void`

*Defined in [src/lib/response/methodResult.ts:16](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/response/methodResult.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| streamToPipe | `any` |

**Returns:** `void`

___

