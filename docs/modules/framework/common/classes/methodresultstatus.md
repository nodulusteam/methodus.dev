[Methodus - framework commons](../globals.md) › [MethodResultStatus](methodresultstatus.md)

# Class: MethodResultStatus ‹**T, T**›

## Type parameters

▪ **T**

▪ **T**

## Hierarchy

* [MethodResult](methodresult.md)‹T›

* MethodResult‹T›

  ↳ **MethodResultStatus**

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
* [compileLink](methodresultstatus.md#protected-compilelink)
* [getLinks](methodresultstatus.md#getlinks)
* [linkAction](methodresultstatus.md#linkaction)
* [on](methodresultstatus.md#on)
* [pipe](methodresultstatus.md#pipe)
* [setHeader](methodresultstatus.md#setheader)

## Constructors

###  constructor

\+ **new MethodResultStatus**(`result`: T, `statusCode`: number, `total?`: undefined | number, `page?`: undefined | number): *[MethodResultStatus](methodresultstatus.md)*

*Overrides [MethodResult](methodresult.md).[constructor](methodresult.md#constructor)*

Defined in lib/response/method.result.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`result` | T |
`statusCode` | number |
`total?` | undefined &#124; number |
`page?` | undefined &#124; number |

**Returns:** *[MethodResultStatus](methodresultstatus.md)*

## Properties

###  headers

• **headers**: *any*

*Inherited from [MethodResult](methodresult.md).[headers](methodresult.md#headers)*

*Overrides void*

Defined in lib/response/method.result.d.ts:7

___

###  page

• **page**: *number* = 1

*Overrides [MethodResult](methodresult.md).[page](methodresult.md#page)*

Defined in lib/response/method.result.d.ts:29

*Defined in [src/response/method.result.ts:97](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L97)*

___

###  result

• **result**: *T*

*Inherited from [MethodResult](methodresult.md).[result](methodresult.md#result)*

*Overrides void*

Defined in lib/response/method.result.d.ts:5

___

###  statusCode

• **statusCode**: *number*

*Overrides [MethodResult](methodresult.md).[statusCode](methodresult.md#statuscode)*

Defined in lib/response/method.result.d.ts:31

*Defined in [src/response/method.result.ts:99](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L99)*

___

###  stream

• **stream**: *any*

*Inherited from [MethodResult](methodresult.md).[stream](methodresult.md#stream)*

*Overrides void*

Defined in lib/response/method.result.d.ts:2

___

###  total

• **total**: *number* = 0

*Overrides [MethodResult](methodresult.md).[total](methodresult.md#total)*

Defined in lib/response/method.result.d.ts:30

*Defined in [src/response/method.result.ts:98](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L98)*

## Methods

###  apply

▸ **apply**(): *this*

*Inherited from [MethodResult](methodresult.md).[apply](methodresult.md#apply)*

*Overrides void*

Defined in lib/response/method.result.d.ts:16

**Returns:** *this*

___

### `Protected` compileLink

▸ **compileLink**(`action`: any, `data`: any, `rel`: string, `host`: string): *[RestLink](restlink.md)*

*Inherited from [MethodResult](methodresult.md).[compileLink](methodresult.md#protected-compilelink)*

*Overrides void*

Defined in lib/response/method.result.d.ts:17

**Parameters:**

Name | Type |
------ | ------ |
`action` | any |
`data` | any |
`rel` | string |
`host` | string |

**Returns:** *[RestLink](restlink.md)*

___

###  getLinks

▸ **getLinks**(): *string[]*

*Inherited from [MethodResult](methodresult.md).[getLinks](methodresult.md#getlinks)*

*Overrides void*

Defined in lib/response/method.result.d.ts:11

**Returns:** *string[]*

___

###  linkAction

▸ **linkAction**(`propertyKey`: any, `linksSource`: any, `rel?`: undefined | string, `datasource?`: any, `host?`: undefined | string): *void*

*Overrides [MethodResult](methodresult.md).[linkAction](methodresult.md#linkaction)*

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

*Inherited from [MethodResult](methodresult.md).[on](methodresult.md#on)*

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

*Inherited from [MethodResult](methodresult.md).[pipe](methodresult.md#pipe)*

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

*Inherited from [MethodResult](methodresult.md).[setHeader](methodresult.md#setheader)*

*Overrides void*

Defined in lib/response/method.result.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`key` | any |
`value` | any |

**Returns:** *void*
