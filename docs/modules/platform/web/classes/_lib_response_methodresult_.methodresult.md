[Web platform components](../README.md) › [Globals](../globals.md) › ["lib/response/methodResult"](../modules/_lib_response_methodresult_.md) › [MethodResult](_lib_response_methodresult_.methodresult.md)

# Class: MethodResult ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **MethodResult**

## Index

### Constructors

* [constructor](_lib_response_methodresult_.methodresult.md#constructor)

### Properties

* [page](_lib_response_methodresult_.methodresult.md#page)
* [result](_lib_response_methodresult_.methodresult.md#result)
* [statusCode](_lib_response_methodresult_.methodresult.md#optional-statuscode)
* [stream](_lib_response_methodresult_.methodresult.md#stream)
* [total](_lib_response_methodresult_.methodresult.md#optional-total)

### Methods

* [pipe](_lib_response_methodresult_.methodresult.md#pipe)

## Constructors

###  constructor

\+ **new MethodResult**(`result`: T, `total?`: number, `page?`: number): *[MethodResult](_lib_response_methodresult_.methodresult.md)*

*Defined in [src/lib/response/methodResult.ts:6](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/response/methodResult.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`result` | T |
`total?` | number |
`page?` | number |

**Returns:** *[MethodResult](_lib_response_methodresult_.methodresult.md)*

## Properties

###  page

• **page**: *any*

*Defined in [src/lib/response/methodResult.ts:4](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/response/methodResult.ts#L4)*

___

###  result

• **result**: *T*

*Defined in [src/lib/response/methodResult.ts:2](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/response/methodResult.ts#L2)*

___

### `Optional` statusCode

• **statusCode**? : *number*

*Defined in [src/lib/response/methodResult.ts:6](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/response/methodResult.ts#L6)*

___

###  stream

• **stream**: *any*

*Defined in [src/lib/response/methodResult.ts:3](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/response/methodResult.ts#L3)*

___

### `Optional` total

• **total**? : *number*

*Defined in [src/lib/response/methodResult.ts:5](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/response/methodResult.ts#L5)*

## Methods

###  pipe

▸ **pipe**(`streamToPipe`: any): *void*

*Defined in [src/lib/response/methodResult.ts:16](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/response/methodResult.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`streamToPipe` | any |

**Returns:** *void*
