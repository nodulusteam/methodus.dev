[Methodus - framework commons](../globals.md) › [MethodResult](methodresult.md)

# Class: MethodResult ‹**T, T**›

## Type parameters

▪ **T**

▪ **T**

## Hierarchy

* **MethodResult**

  ↳ [MethodResultStatus](methodresultstatus.md)

## Index

### Constructors

* [constructor](methodresult.md#constructor)

### Properties

* [_on](methodresult.md#private-_on)
* [headers](methodresult.md#headers)
* [links](methodresult.md#private-links)
* [page](methodresult.md#page)
* [result](methodresult.md#result)
* [statusCode](methodresult.md#statuscode)
* [stream](methodresult.md#stream)
* [total](methodresult.md#total)

### Methods

* [apply](methodresult.md#apply)
* [compileLink](methodresult.md#protected-compilelink)
* [getLinks](methodresult.md#getlinks)
* [linkAction](methodresult.md#linkaction)
* [on](methodresult.md#on)
* [pipe](methodresult.md#pipe)
* [setHeader](methodresult.md#setheader)

## Constructors

###  constructor

\+ **new MethodResult**(`result`: T, `total?`: undefined | number, `page?`: undefined | number): *[MethodResult](methodresult.md)*

Defined in lib/response/method.result.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`result` | T |
`total?` | undefined &#124; number |
`page?` | undefined &#124; number |

**Returns:** *[MethodResult](methodresult.md)*

## Properties

### `Private` _on

• **_on**: *object*

Defined in lib/response/method.result.d.ts:8

*Defined in [src/response/method.result.ts:11](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L11)*

#### Type declaration:

* \[ **key**: *string*\]: function

▸ (): *object*

___

###  headers

• **headers**: *any*

Defined in lib/response/method.result.d.ts:7

*Defined in [src/response/method.result.ts:10](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L10)*

___

### `Private` links

• **links**: *string[]* = []

Defined in lib/response/method.result.d.ts:9

*Defined in [src/response/method.result.ts:12](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L12)*

___

###  page

• **page**: *number* = 1

Defined in lib/response/method.result.d.ts:3

*Defined in [src/response/method.result.ts:6](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L6)*

___

###  result

• **result**: *T*

Defined in lib/response/method.result.d.ts:5

*Defined in [src/response/method.result.ts:8](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L8)*

___

###  statusCode

• **statusCode**: *number* = 200

Defined in lib/response/method.result.d.ts:6

*Defined in [src/response/method.result.ts:9](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L9)*

___

###  stream

• **stream**: *any*

Defined in lib/response/method.result.d.ts:2

*Defined in [src/response/method.result.ts:5](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L5)*

___

###  total

• **total**: *number* = 0

Defined in lib/response/method.result.d.ts:4

*Defined in [src/response/method.result.ts:7](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/response/method.result.ts#L7)*

## Methods

###  apply

▸ **apply**(): *this*

Defined in lib/response/method.result.d.ts:16

**Returns:** *this*

___

### `Protected` compileLink

▸ **compileLink**(`action`: any, `data`: any, `rel`: string, `host`: string): *[RestLink](restlink.md)*

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

Defined in lib/response/method.result.d.ts:11

**Returns:** *string[]*

___

###  linkAction

▸ **linkAction**(`propertyKey`: any, `linksSource`: any, `rel?`: undefined | string, `datasource?`: any, `host?`: undefined | string): *void*

Defined in lib/response/method.result.d.ts:15

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

Defined in lib/response/method.result.d.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`streamToPipe` | any |

**Returns:** *any*

___

###  setHeader

▸ **setHeader**(`key`: any, `value`: any): *void*

Defined in lib/response/method.result.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`key` | any |
`value` | any |

**Returns:** *void*
