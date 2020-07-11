[Web platform components](../README.md) › [Globals](../globals.md) › ["lib/transports/rest"](../modules/_lib_transports_rest_.md) › [Rest](_lib_transports_rest_.rest.md)

# Class: Rest

## Hierarchy

* **Rest**

## Index

### Constructors

* [constructor](_lib_transports_rest_.rest.md#constructor)

### Properties

* [options](_lib_transports_rest_.rest.md#options)
* [request](_lib_transports_rest_.rest.md#request)
* [interceptor](_lib_transports_rest_.rest.md#static-interceptor)

### Methods

* [parse](_lib_transports_rest_.rest.md#parse)
* [send](_lib_transports_rest_.rest.md#send)
* [intercept](_lib_transports_rest_.rest.md#static-intercept)

## Constructors

###  constructor

\+ **new Rest**(`uri`: string, `verb`: [Verbs](../enums/_lib_commons_enums_.verbs.md), `paramsMap`: [ParamsMap](_lib_commons_params_map_.paramsmap.md)[], `args`: any[]): *[Rest](_lib_transports_rest_.rest.md)*

*Defined in [src/lib/transports/rest.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/rest.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`uri` | string |
`verb` | [Verbs](../enums/_lib_commons_enums_.verbs.md) |
`paramsMap` | [ParamsMap](_lib_commons_params_map_.paramsmap.md)[] |
`args` | any[] |

**Returns:** *[Rest](_lib_transports_rest_.rest.md)*

## Properties

###  options

• **options**: *any*

*Defined in [src/lib/transports/rest.ts:7](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/rest.ts#L7)*

___

###  request

• **request**: *any*

*Defined in [src/lib/transports/rest.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/rest.ts#L8)*

___

### `Static` interceptor

▪ **interceptor**: *function*

*Defined in [src/lib/transports/rest.ts:6](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/rest.ts#L6)*

#### Type declaration:

▸ (`options`: any): *object | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

## Methods

###  parse

▸ **parse**(`verb`: [Verbs](../enums/_lib_commons_enums_.verbs.md), `paramsMap`: [ParamsMap](_lib_commons_params_map_.paramsmap.md)[], `args`: any[]): *any*

*Defined in [src/lib/transports/rest.ts:25](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/rest.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`verb` | [Verbs](../enums/_lib_commons_enums_.verbs.md) |
`paramsMap` | [ParamsMap](_lib_commons_params_map_.paramsmap.md)[] |
`args` | any[] |

**Returns:** *any*

___

###  send

▸ **send**(): *Promise‹any›*

*Defined in [src/lib/transports/rest.ts:123](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/rest.ts#L123)*

**Returns:** *Promise‹any›*

___

### `Static` intercept

▸ **intercept**(`interceptor`: function): *void*

*Defined in [src/lib/transports/rest.ts:19](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/platform-web/src/lib/transports/rest.ts#L19)*

**Parameters:**

▪ **interceptor**: *function*

▸ (`options`: any): *object*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *void*
