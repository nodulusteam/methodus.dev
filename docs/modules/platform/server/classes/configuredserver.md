[Server components](../README.md) › [Globals](../globals.md) › [ConfiguredServer](configuredserver.md)

# Class: ConfiguredServer

## Hierarchy

* EventEmitter

  ↳ **ConfiguredServer**

## Index

### Constructors

* [constructor](configuredserver.md#constructor)

### Properties

* [server](configuredserver.md#optional-server)
* [target](configuredserver.md#target)
* [defaultMaxListeners](configuredserver.md#static-defaultmaxlisteners)
* [errorMonitor](configuredserver.md#static-readonly-errormonitor)

### Methods

* [addListener](configuredserver.md#addlistener)
* [emit](configuredserver.md#emit)
* [eventNames](configuredserver.md#eventnames)
* [getMaxListeners](configuredserver.md#getmaxlisteners)
* [init](configuredserver.md#init)
* [kill](configuredserver.md#kill)
* [listenerCount](configuredserver.md#listenercount)
* [listeners](configuredserver.md#listeners)
* [off](configuredserver.md#off)
* [on](configuredserver.md#on)
* [once](configuredserver.md#once)
* [prependListener](configuredserver.md#prependlistener)
* [prependOnceListener](configuredserver.md#prependoncelistener)
* [rawListeners](configuredserver.md#rawlisteners)
* [removeAllListeners](configuredserver.md#removealllisteners)
* [removeListener](configuredserver.md#removelistener)
* [setMaxListeners](configuredserver.md#setmaxlisteners)
* [listenerCount](configuredserver.md#static-listenercount)

## Constructors

###  constructor

\+ **new ConfiguredServer**(`target?`: any): *[ConfiguredServer](configuredserver.md)*

*Overrides void*

*Defined in [src/server.configured.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.configured.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`target?` | any |

**Returns:** *[ConfiguredServer](configuredserver.md)*

## Properties

### `Optional` server

• **server**? : *[Server](server.md)*

*Defined in [src/server.configured.ts:7](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.configured.ts#L7)*

___

###  target

• **target**: *any*

*Defined in [src/server.configured.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.configured.ts#L8)*

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [ConfiguredServer](configuredserver.md).[defaultMaxListeners](configuredserver.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:45

___

### `Static` `Readonly` errorMonitor

▪ **errorMonitor**: *keyof symbol*

*Inherited from [ConfiguredServer](configuredserver.md).[errorMonitor](configuredserver.md#static-readonly-errormonitor)*

Defined in node_modules/@types/node/events.d.ts:55

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](configuredserver.md).[addListener](configuredserver.md#addlistener)*

Defined in node_modules/@types/node/events.d.ts:62

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

*Inherited from [ConfiguredServer](configuredserver.md).[emit](configuredserver.md#emit)*

Defined in node_modules/@types/node/events.d.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [ConfiguredServer](configuredserver.md).[eventNames](configuredserver.md#eventnames)*

Defined in node_modules/@types/node/events.d.ts:77

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [ConfiguredServer](configuredserver.md).[getMaxListeners](configuredserver.md#getmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:69

**Returns:** *number*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [src/server.configured.ts:17](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.configured.ts#L17)*

**Returns:** *Promise‹void›*

___

###  kill

▸ **kill**(): *void*

*Defined in [src/server.configured.ts:56](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.configured.ts#L56)*

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [ConfiguredServer](configuredserver.md).[listenerCount](configuredserver.md#listenercount)*

Defined in node_modules/@types/node/events.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [ConfiguredServer](configuredserver.md).[listeners](configuredserver.md#listeners)*

Defined in node_modules/@types/node/events.d.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](configuredserver.md).[off](configuredserver.md#off)*

Defined in node_modules/@types/node/events.d.ts:66

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

*Inherited from [ConfiguredServer](configuredserver.md).[on](configuredserver.md#on)*

Defined in node_modules/@types/node/events.d.ts:63

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

*Inherited from [ConfiguredServer](configuredserver.md).[once](configuredserver.md#once)*

Defined in node_modules/@types/node/events.d.ts:64

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

*Inherited from [ConfiguredServer](configuredserver.md).[prependListener](configuredserver.md#prependlistener)*

Defined in node_modules/@types/node/events.d.ts:75

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

*Inherited from [ConfiguredServer](configuredserver.md).[prependOnceListener](configuredserver.md#prependoncelistener)*

Defined in node_modules/@types/node/events.d.ts:76

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

*Inherited from [ConfiguredServer](configuredserver.md).[rawListeners](configuredserver.md#rawlisteners)*

Defined in node_modules/@types/node/events.d.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [ConfiguredServer](configuredserver.md).[removeAllListeners](configuredserver.md#removealllisteners)*

Defined in node_modules/@types/node/events.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredServer](configuredserver.md).[removeListener](configuredserver.md#removelistener)*

Defined in node_modules/@types/node/events.d.ts:65

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

*Inherited from [ConfiguredServer](configuredserver.md).[setMaxListeners](configuredserver.md#setmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from [ConfiguredServer](configuredserver.md).[listenerCount](configuredserver.md#static-listenercount)*

Defined in node_modules/@types/node/events.d.ts:44

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
