[@methodus/server](../README.md) › [Globals](../globals.md) › ["server.configured"](../modules/_server_configured_.md) › [ConfiguredServer](_server_configured_.configuredserver.md)

# Class: ConfiguredServer

## Hierarchy

* EventEmitter

  ↳ **ConfiguredServer**

## Index

### Constructors

* [constructor](_server_configured_.configuredserver.md#constructor)

### Properties

* [server](_server_configured_.configuredserver.md#optional-server)
* [target](_server_configured_.configuredserver.md#target)
* [defaultMaxListeners](_server_configured_.configuredserver.md#static-defaultmaxlisteners)

### Methods

* [addListener](_server_configured_.configuredserver.md#addlistener)
* [emit](_server_configured_.configuredserver.md#emit)
* [eventNames](_server_configured_.configuredserver.md#eventnames)
* [getMaxListeners](_server_configured_.configuredserver.md#getmaxlisteners)
* [init](_server_configured_.configuredserver.md#init)
* [kill](_server_configured_.configuredserver.md#kill)
* [listenerCount](_server_configured_.configuredserver.md#listenercount)
* [listeners](_server_configured_.configuredserver.md#listeners)
* [off](_server_configured_.configuredserver.md#off)
* [on](_server_configured_.configuredserver.md#on)
* [once](_server_configured_.configuredserver.md#once)
* [prependListener](_server_configured_.configuredserver.md#prependlistener)
* [prependOnceListener](_server_configured_.configuredserver.md#prependoncelistener)
* [rawListeners](_server_configured_.configuredserver.md#rawlisteners)
* [removeAllListeners](_server_configured_.configuredserver.md#removealllisteners)
* [removeListener](_server_configured_.configuredserver.md#removelistener)
* [setMaxListeners](_server_configured_.configuredserver.md#setmaxlisteners)
* [listenerCount](_server_configured_.configuredserver.md#static-listenercount)

## Constructors

###  constructor

\+ **new ConfiguredServer**(`target?`: any): *[ConfiguredServer](_server_configured_.configuredserver.md)*

*Defined in [src/server.configured.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/server/src/server.configured.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`target?` | any |

**Returns:** *[ConfiguredServer](_server_configured_.configuredserver.md)*

## Properties

### `Optional` server

• **server**? : *[Server](_server_.server.md)*

*Defined in [src/server.configured.ts:7](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/server/src/server.configured.ts#L7)*

___

###  target

• **target**: *any*

*Defined in [src/server.configured.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/server/src/server.configured.ts#L8)*

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[defaultMaxListeners](_server_configured_.configuredserver.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:18

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[addListener](_server_configured_.configuredserver.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:20

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[emit](_server_configured_.configuredserver.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[eventNames](_server_configured_.configuredserver.md#eventnames)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:33

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[getMaxListeners](_server_configured_.configuredserver.md#getmaxlisteners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:29

**Returns:** *number*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [src/server.configured.ts:17](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/server/src/server.configured.ts#L17)*

**Returns:** *Promise‹void›*

___

###  kill

▸ **kill**(): *void*

*Defined in [src/server.configured.ts:56](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/server/src/server.configured.ts#L56)*

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[listenerCount](_server_configured_.configuredserver.md#static-listenercount)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[listeners](_server_configured_.configuredserver.md#listeners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:30

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[off](_server_configured_.configuredserver.md#off)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:26

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[on](_server_configured_.configuredserver.md#on)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:21

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[once](_server_configured_.configuredserver.md#once)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:22

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[prependListener](_server_configured_.configuredserver.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:23

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[prependOnceListener](_server_configured_.configuredserver.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:24

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[rawListeners](_server_configured_.configuredserver.md#rawlisteners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[removeAllListeners](_server_configured_.configuredserver.md#removealllisteners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[removeListener](_server_configured_.configuredserver.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:25

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[setMaxListeners](_server_configured_.configuredserver.md#setmaxlisteners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from [ConfiguredServer](_server_configured_.configuredserver.md).[listenerCount](_server_configured_.configuredserver.md#static-listenercount)*

Defined in node_modules/@types/node/events.d.ts:17

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
