[Methodus - framework commons](../globals.md) › [MethodResult](modules/framework/common/methodresult.md)

# Class: MethodResult ‹**T, T**›

## Type parameters

▪ **T**

▪ **T**

## Hierarchy

* **MethodResult**

  ↳ [MethodResultStatus](modules/framework/common/methodresultstatus.md)

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_on](#private-_on)
* [headers](#headers)
* [links](#private-links)
* [page](#page)
* [result](#result)
* [statusCode](#statuscode)
* [stream](#stream)
* [total](#total)

### Methods

* [apply](#apply)
* [compileLink](#protected-compilelink)
* [getLinks](#getlinks)
* [linkAction](#linkaction)
* [on](#on)
* [pipe](#pipe)
* [setHeader](#setheader)

## Constructors

###  constructor

\+ **new MethodResult**(`result`: T, `total?`: undefined | number, `page?`: undefined | number): *[MethodResult](modules/framework/common/methodresult.md)*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`result` | T |
`total?` | undefined &#124; number |
`page?` | undefined &#124; number |

**Returns:** *[MethodResult](modules/framework/common/methodresult.md)*

## Properties

### `Private` _on

• **_on**: *object*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:8

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:11](#L11)*

#### Type declaration:

* \[ **key**: *string*\]: function

▸ (): *object*

___

###  headers

• **headers**: *any*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:7

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:10](#L10)*

___

### `Private` links

• **links**: *string[]* = []

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:9

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:12](#L12)*

___

###  page

• **page**: *number* = 1

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:3

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:6](#L6)*

___

###  result

• **result**: *T*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:5

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:8](#L8)*

___

###  statusCode

• **statusCode**: *number* = 200

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:6

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:9](#L9)*

___

###  stream

• **stream**: *any*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:2

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:5](#L5)*

___

###  total

• **total**: *number* = 0

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:4

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:7](#L7)*

## Methods

###  apply

▸ **apply**(): *this*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:16

**Returns:** *this*

___

### `Protected` compileLink

▸ **compileLink**(`action`: any, `data`: any, `rel`: string, `host`: string): *[RestLink](modules/framework/common/restlink.md)*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:17

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

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:11

**Returns:** *string[]*

___

###  linkAction

▸ **linkAction**(`propertyKey`: any, `linksSource`: any, `rel?`: undefined | string, `datasource?`: any, `host?`: undefined | string): *void*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:15

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

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`key` | any |
`value` | any |

**Returns:** *void*

___

###  pipe

▸ **pipe**(`streamToPipe`: any): *any*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`streamToPipe` | any |

**Returns:** *any*

___

###  setHeader

▸ **setHeader**(`key`: any, `value`: any): *void*

Defined in modules/framework/framework-commons/lib/response/method.result.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`key` | any |
`value` | any |

**Returns:** *void*
