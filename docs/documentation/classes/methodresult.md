[A Methodus guide](../README.md) > [MethodResult](../classes/methodresult.md)

# Class: MethodResult

## Type parameters
#### T 
#### T 
## Hierarchy

**MethodResult**

↳  [MethodResultStatus](methodresultstatus.md)

## Index

### Constructors

* [constructor](methodresult.md#constructor)

### Properties

* [_on](methodresult.md#_on)
* [headers](methodresult.md#headers)
* [links](methodresult.md#links)
* [page](methodresult.md#page)
* [result](methodresult.md#result)
* [statusCode](methodresult.md#statuscode)
* [stream](methodresult.md#stream)
* [total](methodresult.md#total)

### Methods

* [apply](methodresult.md#apply)
* [compileLink](methodresult.md#compilelink)
* [getLinks](methodresult.md#getlinks)
* [linkAction](methodresult.md#linkaction)
* [on](methodresult.md#on)
* [pipe](methodresult.md#pipe)
* [setHeader](methodresult.md#setheader)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MethodResult**(result: *`T`*, total?: *`undefined` \| `number`*, page?: *`undefined` \| `number`*): [MethodResult](methodresult.md)

*Defined in build/response/methodResult.d.ts:9*

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

*Defined in build/response/methodResult.d.ts:8*
*Defined in [src/response/methodResult.ts:8](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/response/methodResult.ts#L8)*

#### Type declaration

[key: `string`]: `function`

▸(): `__type`

**Returns:** `__type`

___
<a id="headers"></a>

###  headers

**● headers**: *`any`*

*Defined in build/response/methodResult.d.ts:7*
*Defined in [src/response/methodResult.ts:7](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/response/methodResult.ts#L7)*

___
<a id="links"></a>

### `<Private>` links

**● links**: *`string`[]* =  []

*Defined in build/response/methodResult.d.ts:9*
*Defined in [src/response/methodResult.ts:9](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/response/methodResult.ts#L9)*

___
<a id="page"></a>

###  page

**● page**: *`number`* = 1

*Defined in build/response/methodResult.d.ts:3*
*Defined in [src/response/methodResult.ts:3](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/response/methodResult.ts#L3)*

___
<a id="result"></a>

###  result

**● result**: *`T`*

*Defined in build/response/methodResult.d.ts:5*
*Defined in [src/response/methodResult.ts:5](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/response/methodResult.ts#L5)*

___
<a id="statuscode"></a>

###  statusCode

**● statusCode**: *`number`* = 200

*Defined in build/response/methodResult.d.ts:6*
*Defined in [src/response/methodResult.ts:6](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/response/methodResult.ts#L6)*

___
<a id="stream"></a>

###  stream

**● stream**: *`any`*

*Defined in build/response/methodResult.d.ts:2*
*Defined in [src/response/methodResult.ts:2](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/response/methodResult.ts#L2)*

___
<a id="total"></a>

###  total

**● total**: *`number`* = 0

*Defined in build/response/methodResult.d.ts:4*
*Defined in [src/response/methodResult.ts:4](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/response/methodResult.ts#L4)*

___

## Methods

<a id="apply"></a>

###  apply

▸ **apply**(): `this`

*Defined in build/response/methodResult.d.ts:16*

**Returns:** `this`

___
<a id="compilelink"></a>

### `<Protected>` compileLink

▸ **compileLink**(action: *`any`*, data: *`any`*, rel: *`string`*, host: *`string`*): [RestLink](restlink.md)

*Defined in build/response/methodResult.d.ts:17*

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

*Defined in build/response/methodResult.d.ts:11*

**Returns:** `string`[]

___
<a id="linkaction"></a>

###  linkAction

▸ **linkAction**(propertyKey: *`any`*, linksSource: *`any`*, rel?: *`undefined` \| `string`*, datasource?: *`any`*, host?: *`undefined` \| `string`*): `void`

*Defined in build/response/methodResult.d.ts:15*

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

*Defined in build/response/methodResult.d.ts:14*

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

*Defined in build/response/methodResult.d.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| streamToPipe | `any` |

**Returns:** `any`

___
<a id="setheader"></a>

###  setHeader

▸ **setHeader**(key: *`any`*, value: *`any`*): `void`

*Defined in build/response/methodResult.d.ts:13*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `any` |
| value | `any` |

**Returns:** `void`

___

