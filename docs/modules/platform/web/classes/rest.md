[Web platform components](../README.md) › [Globals](../globals.md) › [Rest](rest.md)

# Class: Rest

## Hierarchy

* **Rest**

## Index

### Constructors

* [constructor](rest.md#constructor)

### Properties

* [options](rest.md#options)
* [request](rest.md#request)
* [interceptor](rest.md#static-interceptor)

### Methods

* [parse](rest.md#parse)
* [send](rest.md#send)
* [intercept](rest.md#static-intercept)

## Constructors

###  constructor

\+ **new Rest**(`uri`: string, `verb`: [Verbs](../enums/verbs.md), `paramsMap`: [ParamsMap](paramsmap.md)[], `args`: any[]): *[Rest](rest.md)*

*Defined in [modules/platform/platform-web/src/lib/transports/rest.ts:8](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/transports/rest.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`uri` | string |
`verb` | [Verbs](../enums/verbs.md) |
`paramsMap` | [ParamsMap](paramsmap.md)[] |
`args` | any[] |

**Returns:** *[Rest](rest.md)*

## Properties

###  options

• **options**: *any*

*Defined in [modules/platform/platform-web/src/lib/transports/rest.ts:7](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/transports/rest.ts#L7)*

___

###  request

• **request**: *any*

*Defined in [modules/platform/platform-web/src/lib/transports/rest.ts:8](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/transports/rest.ts#L8)*

___

### `Static` interceptor

▪ **interceptor**: *function*

*Defined in [modules/platform/platform-web/src/lib/transports/rest.ts:6](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/transports/rest.ts#L6)*

#### Type declaration:

▸ (`options`: any): *object | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

## Methods

###  parse

▸ **parse**(`verb`: [Verbs](../enums/verbs.md), `paramsMap`: [ParamsMap](paramsmap.md)[], `args`: any[]): *any*

*Defined in [modules/platform/platform-web/src/lib/transports/rest.ts:25](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/transports/rest.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`verb` | [Verbs](../enums/verbs.md) |
`paramsMap` | [ParamsMap](paramsmap.md)[] |
`args` | any[] |

**Returns:** *any*

___

###  send

▸ **send**(): *Promise‹any›*

*Defined in [modules/platform/platform-web/src/lib/transports/rest.ts:123](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/transports/rest.ts#L123)*

**Returns:** *Promise‹any›*

___

### `Static` intercept

▸ **intercept**(`interceptor`: function): *void*

*Defined in [modules/platform/platform-web/src/lib/transports/rest.ts:19](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/transports/rest.ts#L19)*

**Parameters:**

▪ **interceptor**: *function*

▸ (`options`: any): *object*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *void*
