[Methodus - framework commons](../globals.md) › [Logger](modules/framework/common/logger.md)

# Class: Logger

## Hierarchy

* **Logger**

## Index

### Constructors

* [constructor](modules/framework/common/logger.md#constructor)

### Properties

* [logger](modules/framework/common/logger.md#logger)

### Methods

* [debug](modules/framework/common/logger.md#debug)
* [error](modules/framework/common/logger.md#error)
* [getArgs](modules/framework/common/logger.md#getargs)
* [info](modules/framework/common/logger.md#info)
* [log](modules/framework/common/logger.md#log)
* [print](modules/framework/common/logger.md#print)
* [safeJSON](modules/framework/common/logger.md#safejson)
* [warn](modules/framework/common/logger.md#warn)

## Constructors

###  constructor

\+ **new Logger**(`name`: string): *[Logger](modules/framework/common/logger.md)*

Defined in lib/log/logger.d.ts:2

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[Logger](modules/framework/common/logger.md)*

## Properties

###  logger

• **logger**: *any*

Defined in lib/log/logger.d.ts:2

*Defined in [src/log/logger.ts:2](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/log/logger.ts#L2)*

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
