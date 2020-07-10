[Methodus - framework commons](../globals.md) › [Logger](logger.md)

# Class: Logger

## Hierarchy

* **Logger**

## Index

### Constructors

* [constructor](logger.md#constructor)

### Properties

* [logger](logger.md#logger)

### Methods

* [debug](logger.md#debug)
* [error](logger.md#error)
* [getArgs](logger.md#getargs)
* [info](logger.md#info)
* [log](logger.md#log)
* [print](logger.md#print)
* [safeJSON](logger.md#safejson)
* [warn](logger.md#warn)

## Constructors

###  constructor

\+ **new Logger**(`name`: string): *[Logger](logger.md)*

Defined in lib/log/logger.d.ts:2

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[Logger](logger.md)*

## Properties

###  logger

• **logger**: *any*

Defined in lib/log/logger.d.ts:2

*Defined in [src/log/logger.ts:2](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/framework/framework-commons/src/log/logger.ts#L2)*

## Methods

###  debug

▸ **debug**(...`args`: any[]): *void*

Defined in lib/log/logger.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  error

▸ **error**(...`args`: any[]): *void*

Defined in lib/log/logger.d.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  getArgs

▸ **getArgs**(...`args`: any[]): *string*

Defined in lib/log/logger.d.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *string*

___

###  info

▸ **info**(...`args`: any[]): *void*

Defined in lib/log/logger.d.ts:7

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  log

▸ **log**(...`args`: any[]): *void*

Defined in lib/log/logger.d.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*

___

###  print

▸ **print**(`verb`: string, `args`: any[]): *void*

Defined in lib/log/logger.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`verb` | string |
`args` | any[] |

**Returns:** *void*

___

###  safeJSON

▸ **safeJSON**(`item`: any): *any*

Defined in lib/log/logger.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`item` | any |

**Returns:** *any*

___

###  warn

▸ **warn**(...`args`: any[]): *void*

Defined in lib/log/logger.d.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *void*
