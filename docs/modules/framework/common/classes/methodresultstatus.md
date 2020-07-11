[Methodus - framework commons](../globals.md) › [MethodResultStatus](modules/framework/common/methodresultstatus.md)

# Class: MethodResultStatus ‹**T, T**›

## Type parameters

▪ **T**

▪ **T**

## Hierarchy

* [MethodResult](modules/framework/common/methodresult.md)‹T›

* MethodResult‹T›

  ↳ **MethodResultStatus**

## Index

### Constructors

* [constructor](modules/framework/common/methodresultstatus.md#constructor)

### Properties

* [headers](modules/framework/common/methodresultstatus.md#headers)
* [page](modules/framework/common/methodresultstatus.md#page)
* [result](modules/framework/common/methodresultstatus.md#result)
* [statusCode](modules/framework/common/methodresultstatus.md#statuscode)
* [stream](modules/framework/common/methodresultstatus.md#stream)
* [total](modules/framework/common/methodresultstatus.md#total)

### Methods

* [apply](modules/framework/common/methodresultstatus.md#apply)
* [compileLink](modules/framework/common/methodresultstatus.md#protected-compilelink)
* [getLinks](modules/framework/common/methodresultstatus.md#getlinks)
* [linkAction](modules/framework/common/methodresultstatus.md#linkaction)
* [on](modules/framework/common/methodresultstatus.md#on)
* [pipe](modules/framework/common/methodresultstatus.md#pipe)
* [setHeader](modules/framework/common/methodresultstatus.md#setheader)

## Constructors

###  constructor

\+ **new MethodResultStatus**(`result`: T, `statusCode`: number, `total?`: undefined | number, `page?`: undefined | number): *[MethodResultStatus](modules/framework/common/methodresultstatus.md)*

*Overrides [MethodResult](modules/framework/common/methodresult.md).[constructor](methodresult.md#constructor)*

Defined in lib/response/method.result.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`result` | T |
`statusCode` | number |
`total?` | undefined &#124; number |
`page?` | undefined &#124; number |

**Returns:** *[MethodResultStatus](modules/framework/common/methodresultstatus.md)*

## Properties

###  headers

• **headers**: *any*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[headers](methodresult.md#headers)*

*Overrides void*

Defined in lib/response/method.result.d.ts:7

___

###  page

• **page**: *number* = 1

*Overrides [MethodResult](modules/framework/common/methodresult.md).[page](methodresult.md#page)*

Defined in lib/response/method.result.d.ts:29

*Defined in [src/response/method.result.ts:97](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/response/method.result.ts#L97)*

___

###  result

• **result**: *T*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[result](methodresult.md#result)*

*Overrides void*

Defined in lib/response/method.result.d.ts:5

___

###  statusCode

• **statusCode**: *number*

*Overrides [MethodResult](modules/framework/common/methodresult.md).[statusCode](methodresult.md#statuscode)*

Defined in lib/response/method.result.d.ts:31

*Defined in [src/response/method.result.ts:99](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/response/method.result.ts#L99)*

___

###  stream

• **stream**: *any*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[stream](methodresult.md#stream)*

*Overrides void*

Defined in lib/response/method.result.d.ts:2

___

###  total

• **total**: *number* = 0

*Overrides [MethodResult](modules/framework/common/methodresult.md).[total](methodresult.md#total)*

Defined in lib/response/method.result.d.ts:30

*Defined in [src/response/method.result.ts:98](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/response/method.result.ts#L98)*

## Methods

###  apply

▸ **apply**(): *this*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[apply](methodresult.md#apply)*

*Overrides void*

Defined in lib/response/method.result.d.ts:16

**Returns:** *this*

___

### `Protected` compileLink

▸ **compileLink**(`action`: any, `data`: any, `rel`: string, `host`: string): *[RestLink](modules/framework/common/restlink.md)*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[compileLink](methodresult.md#protected-compilelink)*

*Overrides void*

Defined in lib/response/method.result.d.ts:17

**Parameters:**

Name | Type |
------ | ------ |
`action` | any |
`data` | any |
`rel` | string |
`host` | string |

**Returns:** *[RestLink](modules/framework/common/restlink.md)*

___

###  getLinks

▸ **getLinks**(): *string[]*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[getLinks](methodresult.md#getlinks)*

*Overrides void*

Defined in lib/response/method.result.d.ts:11

**Returns:** *string[]*

___

###  linkAction

▸ **linkAction**(`propertyKey`: any, `linksSource`: any, `rel?`: undefined | string, `datasource?`: any, `host?`: undefined | string): *void*

*Overrides [MethodResult](modules/framework/common/methodresult.md).[linkAction](methodresult.md#linkaction)*

Defined in lib/response/method.result.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`propertyKey` | any |
`linksSource` | any |
`rel?` | undefined &#124; string |
`datasource?` | any |
`host?` | undefined &#124; string |

**Returns:** *void*

___

###  on

▸ **on**(`key`: any, `value`: any): *void*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[on](methodresult.md#on)*

*Overrides void*

Defined in lib/response/method.result.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`key` | any |
`value` | any |

**Returns:** *void*

___

###  pipe

▸ **pipe**(`streamToPipe`: any): *any*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[pipe](methodresult.md#pipe)*

*Overrides void*

Defined in lib/response/method.result.d.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`streamToPipe` | any |

**Returns:** *any*

___

###  setHeader

▸ **setHeader**(`key`: any, `value`: any): *void*

*Inherited from [MethodResult](modules/framework/common/methodresult.md).[setHeader](methodresult.md#setheader)*

*Overrides void*

Defined in lib/response/method.result.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`key` | any |
`value` | any |

**Returns:** *void*
