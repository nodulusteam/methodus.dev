[Methodus - framework commons](../README.md) › [Globals](../globals.md) › [MethodResultStatus](modules/framework/common/methodresultstatus.md)

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

* [constructor](#constructor)

### Properties

* [headers](#headers)
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

\+ **new MethodResultStatus**(`result`: T, `statusCode`: number, `total?`: undefined | number, `page?`: undefined | number): *[MethodResultStatus](modules/framework/common/methodresultstatus.md)*

*Overrides [MethodResult](#constructor)*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:31

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

*Inherited from [MethodResult](#headers)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:7

___

###  page

• **page**: *number* = 1

*Overrides [MethodResult](#page)*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:29

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:97](#L97)*

___

###  result

• **result**: *T*

*Inherited from [MethodResult](#result)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:5

___

###  statusCode

• **statusCode**: *number*

*Overrides [MethodResult](#statuscode)*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:31

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:99](#L99)*

___

###  stream

• **stream**: *any*

*Inherited from [MethodResult](#stream)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:2

___

###  total

• **total**: *number* = 0

*Overrides [MethodResult](#total)*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:30

*Defined in [modules/framework/framework-commons/src/response/method.result.ts:98](#L98)*

## Methods

###  apply

▸ **apply**(): *this*

*Inherited from [MethodResult](#apply)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:16

**Returns:** *this*

___

### `Protected` compileLink

▸ **compileLink**(`action`: any, `data`: any, `rel`: string, `host`: string): *[RestLink](modules/framework/common/restlink.md)*

*Inherited from [MethodResult](#protected-compilelink)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:17

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

*Inherited from [MethodResult](#getlinks)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:11

**Returns:** *string[]*

___

###  linkAction

▸ **linkAction**(`propertyKey`: any, `linksSource`: any, `rel?`: undefined | string, `datasource?`: any, `host?`: undefined | string): *void*

*Overrides [MethodResult](#linkaction)*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:33

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

*Inherited from [MethodResult](#on)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`key` | any |
`value` | any |

**Returns:** *void*

___

###  pipe

▸ **pipe**(`streamToPipe`: any): *any*

*Inherited from [MethodResult](#pipe)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`streamToPipe` | any |

**Returns:** *any*

___

###  setHeader

▸ **setHeader**(`key`: any, `value`: any): *void*

*Inherited from [MethodResult](#setheader)*

*Overrides void*

Defined in modules/framework/framework-commons/dist/response/method.result.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`key` | any |
`value` | any |

**Returns:** *void*
