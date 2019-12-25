[A Methodus guide](../README.md) > [MethodResultStatus](../classes/methodresultstatus.md)

# Class: MethodResultStatus

## Type parameters
#### T 
#### T 
## Hierarchy

 [MethodResult](methodresult.md)<`T`>

 `MethodResult`<`T`>

**↳ MethodResultStatus**

## Index

### Constructors

* [constructor](methodresultstatus.md#constructor)

### Properties

* [headers](methodresultstatus.md#headers)
* [page](methodresultstatus.md#page)
* [result](methodresultstatus.md#result)
* [statusCode](methodresultstatus.md#statuscode)
* [stream](methodresultstatus.md#stream)
* [total](methodresultstatus.md#total)

### Methods

* [apply](methodresultstatus.md#apply)
* [compileLink](methodresultstatus.md#compilelink)
* [getLinks](methodresultstatus.md#getlinks)
* [linkAction](methodresultstatus.md#linkaction)
* [on](methodresultstatus.md#on)
* [pipe](methodresultstatus.md#pipe)
* [setHeader](methodresultstatus.md#setheader)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MethodResultStatus**(result: *`T`*, statusCode: *`number`*, total?: *`undefined` \| `number`*, page?: *`undefined` \| `number`*): [MethodResultStatus](methodresultstatus.md)

*Overrides [MethodResult](methodresult.md).[constructor](methodresult.md#constructor)*

*Defined in build/response/method.result.d.ts:31*

**Parameters:**

| Name | Type |
| ------ | ------ |
| result | `T` |
| statusCode | `number` |
| `Optional` total | `undefined` \| `number` |
| `Optional` page | `undefined` \| `number` |

**Returns:** [MethodResultStatus](methodresultstatus.md)

___

## Properties

<a id="headers"></a>

###  headers

**● headers**: *`any`*

*Inherited from [MethodResult](methodresult.md).[headers](methodresult.md#headers)*

*Overrides MethodResult.headers*

*Defined in build/response/method.result.d.ts:7*

___
<a id="page"></a>

###  page

**● page**: *`number`* = 1

*Overrides [MethodResult](methodresult.md).[page](methodresult.md#page)*

*Defined in build/response/method.result.d.ts:29*
*Defined in [src/response/method.result.ts:99](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/response/method.result.ts#L99)*

___
<a id="result"></a>

###  result

**● result**: *`T`*

*Inherited from [MethodResult](methodresult.md).[result](methodresult.md#result)*

*Overrides MethodResult.result*

*Defined in build/response/method.result.d.ts:5*

___
<a id="statuscode"></a>

###  statusCode

**● statusCode**: *`number`*

*Overrides [MethodResult](methodresult.md).[statusCode](methodresult.md#statuscode)*

*Defined in build/response/method.result.d.ts:31*
*Defined in [src/response/method.result.ts:101](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/response/method.result.ts#L101)*

___
<a id="stream"></a>

###  stream

**● stream**: *`any`*

*Inherited from [MethodResult](methodresult.md).[stream](methodresult.md#stream)*

*Overrides MethodResult.stream*

*Defined in build/response/method.result.d.ts:2*

___
<a id="total"></a>

###  total

**● total**: *`number`* = 0

*Overrides [MethodResult](methodresult.md).[total](methodresult.md#total)*

*Defined in build/response/method.result.d.ts:30*
*Defined in [src/response/method.result.ts:100](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/response/method.result.ts#L100)*

___

## Methods

<a id="apply"></a>

###  apply

▸ **apply**(): `this`

*Inherited from [MethodResult](methodresult.md).[apply](methodresult.md#apply)*

*Overrides MethodResult.apply*

*Defined in build/response/method.result.d.ts:16*

**Returns:** `this`

___
<a id="compilelink"></a>

### `<Protected>` compileLink

▸ **compileLink**(action: *`any`*, data: *`any`*, rel: *`string`*, host: *`string`*): [RestLink](restlink.md)

*Inherited from [MethodResult](methodresult.md).[compileLink](methodresult.md#compilelink)*

*Overrides MethodResult.compileLink*

*Defined in build/response/method.result.d.ts:17*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | `any` |
| data | `any` |
| rel | `string` |
| host | `string` |

**Returns:** [RestLink](restlink.md)

___
<a id="getlinks"></a>

###  getLinks

▸ **getLinks**(): `string`[]

*Inherited from [MethodResult](methodresult.md).[getLinks](methodresult.md#getlinks)*

*Overrides MethodResult.getLinks*

*Defined in build/response/method.result.d.ts:11*

**Returns:** `string`[]

___
<a id="linkaction"></a>

###  linkAction

▸ **linkAction**(propertyKey: *`any`*, linksSource: *`any`*, rel?: *`undefined` \| `string`*, datasource?: *`any`*, host?: *`undefined` \| `string`*): `void`

*Overrides [MethodResult](methodresult.md).[linkAction](methodresult.md#linkaction)*

*Defined in build/response/method.result.d.ts:33*

**Parameters:**

| Name | Type |
| ------ | ------ |
| propertyKey | `any` |
| linksSource | `any` |
| `Optional` rel | `undefined` \| `string` |
| `Optional` datasource | `any` |
| `Optional` host | `undefined` \| `string` |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(key: *`any`*, value: *`any`*): `void`

*Inherited from [MethodResult](methodresult.md).[on](methodresult.md#on)*

*Overrides MethodResult.on*

*Defined in build/response/method.result.d.ts:14*

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

*Inherited from [MethodResult](methodresult.md).[pipe](methodresult.md#pipe)*

*Overrides MethodResult.pipe*

*Defined in build/response/method.result.d.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| streamToPipe | `any` |

**Returns:** `any`

___
<a id="setheader"></a>

###  setHeader

▸ **setHeader**(key: *`any`*, value: *`any`*): `void`

*Inherited from [MethodResult](methodresult.md).[setHeader](methodresult.md#setheader)*

*Overrides MethodResult.setHeader*

*Defined in build/response/method.result.d.ts:13*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |
| value | `any` |

**Returns:** `void`

___

