[Web platform components](../README.md) › [Globals](../globals.md) › [MethodResult](methodresult.md)

# Class: MethodResult ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **MethodResult**

## Index

### Constructors

* [constructor](methodresult.md#constructor)

### Properties

* [page](methodresult.md#page)
* [result](methodresult.md#result)
* [statusCode](methodresult.md#optional-statuscode)
* [stream](methodresult.md#stream)
* [total](methodresult.md#optional-total)

### Methods

* [pipe](methodresult.md#pipe)

## Constructors

###  constructor

\+ **new MethodResult**(`result`: T, `total?`: number, `page?`: number): *[MethodResult](methodresult.md)*

*Defined in [modules/platform/platform-web/src/lib/response/methodResult.ts:6](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-web/src/lib/response/methodResult.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`result` | T |
`total?` | number |
`page?` | number |

**Returns:** *[MethodResult](methodresult.md)*

## Properties

###  page

• **page**: *any*

*Defined in [modules/platform/platform-web/src/lib/response/methodResult.ts:4](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-web/src/lib/response/methodResult.ts#L4)*

___

###  result

• **result**: *T*

*Defined in [modules/platform/platform-web/src/lib/response/methodResult.ts:2](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-web/src/lib/response/methodResult.ts#L2)*

___

### `Optional` statusCode

• **statusCode**? : *number*

*Defined in [modules/platform/platform-web/src/lib/response/methodResult.ts:6](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-web/src/lib/response/methodResult.ts#L6)*

___

###  stream

• **stream**: *any*

*Defined in [modules/platform/platform-web/src/lib/response/methodResult.ts:3](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-web/src/lib/response/methodResult.ts#L3)*

___

### `Optional` total

• **total**? : *number*

*Defined in [modules/platform/platform-web/src/lib/response/methodResult.ts:5](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-web/src/lib/response/methodResult.ts#L5)*

## Methods

###  pipe

▸ **pipe**(`streamToPipe`: any): *void*

*Defined in [modules/platform/platform-web/src/lib/response/methodResult.ts:16](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-web/src/lib/response/methodResult.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`streamToPipe` | any |

**Returns:** *void*
