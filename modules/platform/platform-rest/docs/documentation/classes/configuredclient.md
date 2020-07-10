[A Methodus guide](../README.md) › [ConfiguredClient](configuredclient.md)

# Class: ConfiguredClient

## Hierarchy

* EventEmitter

* EventEmitter

  ↳ **ConfiguredClient**

## Index

### Constructors

* [constructor](configuredclient.md#constructor)

### Properties

* [server](configuredclient.md#optional-server)
* [target](configuredclient.md#target)
* [defaultMaxListeners](configuredclient.md#static-defaultmaxlisteners)
* [errorMonitor](configuredclient.md#static-readonly-errormonitor)

### Methods

* [addListener](configuredclient.md#addlistener)
* [emit](configuredclient.md#emit)
* [eventNames](configuredclient.md#eventnames)
* [getMaxListeners](configuredclient.md#getmaxlisteners)
* [init](configuredclient.md#init)
* [kill](configuredclient.md#kill)
* [listenerCount](configuredclient.md#listenercount)
* [listeners](configuredclient.md#listeners)
* [off](configuredclient.md#off)
* [on](configuredclient.md#on)
* [once](configuredclient.md#once)
* [prependListener](configuredclient.md#prependlistener)
* [prependOnceListener](configuredclient.md#prependoncelistener)
* [rawListeners](configuredclient.md#rawlisteners)
* [removeAllListeners](configuredclient.md#removealllisteners)
* [removeListener](configuredclient.md#removelistener)
* [setMaxListeners](configuredclient.md#setmaxlisteners)
* [listenerCount](configuredclient.md#static-listenercount)

## Constructors

###  constructor

\+ **new ConfiguredClient**(`target?`: any): *[ConfiguredClient](configuredclient.md)*

*Overrides void*

Defined in lib/client.configured.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`target?` | any |

**Returns:** *[ConfiguredClient](configuredclient.md)*

## Properties

### `Optional` server

• **server**? : *[Server](server.md)*

Defined in lib/client.configured.d.ts:5

*Defined in [src/client.configured.ts:6](https://github.com/nodulusteam/methodus.dev/blob/3bac181/modules/platform/platform-rest/src/client.configured.ts#L6)*

___

###  target

• **target**: *any*

Defined in lib/client.configured.d.ts:6

*Defined in [src/client.configured.ts:7](https://github.com/nodulusteam/methodus.dev/blob/3bac181/modules/platform/platform-rest/src/client.configured.ts#L7)*

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [ConfiguredClient](configuredclient.md).[defaultMaxListeners](configuredclient.md#static-defaultmaxlisteners)*

*Overrides [ConfiguredClient](configuredclient.md).[defaultMaxListeners](configuredclient.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:45

___

### `Static` `Readonly` errorMonitor

▪ **errorMonitor**: *keyof symbol*

*Inherited from [ConfiguredClient](configuredclient.md).[errorMonitor](configuredclient.md#static-readonly-errormonitor)*

*Overrides [ConfiguredClient](configuredclient.md).[errorMonitor](configuredclient.md#static-readonly-errormonitor)*

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

*Inherited from [ConfiguredClient](configuredclient.md).[addListener](configuredclient.md#addlistener)*

*Overrides [ConfiguredClient](configuredclient.md).[addListener](configuredclient.md#addlistener)*

Defined in node_modules/@types/node/globals.d.ts:553

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

*Inherited from [ConfiguredClient](configuredclient.md).[emit](configuredclient.md#emit)*

*Overrides [ConfiguredClient](configuredclient.md).[emit](configuredclient.md#emit)*

Defined in node_modules/@types/node/globals.d.ts:563

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [ConfiguredClient](configuredclient.md).[eventNames](configuredclient.md#eventnames)*

*Overrides [ConfiguredClient](configuredclient.md).[eventNames](configuredclient.md#eventnames)*

Defined in node_modules/@types/node/globals.d.ts:568

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [ConfiguredClient](configuredclient.md).[getMaxListeners](configuredclient.md#getmaxlisteners)*

*Overrides [ConfiguredClient](configuredclient.md).[getMaxListeners](configuredclient.md#getmaxlisteners)*

Defined in node_modules/@types/node/globals.d.ts:560

**Returns:** *number*

___

###  init

▸ **init**(): *Promise‹void›*

Defined in lib/client.configured.d.ts:8

**Returns:** *Promise‹void›*

___

###  kill

▸ **kill**(): *void*

Defined in lib/client.configured.d.ts:9

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [ConfiguredClient](configuredclient.md).[listenerCount](configuredclient.md#listenercount)*

*Overrides [ConfiguredClient](configuredclient.md).[listenerCount](configuredclient.md#listenercount)*

Defined in node_modules/@types/node/globals.d.ts:564

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [ConfiguredClient](configuredclient.md).[listeners](configuredclient.md#listeners)*

*Overrides [ConfiguredClient](configuredclient.md).[listeners](configuredclient.md#listeners)*

Defined in node_modules/@types/node/globals.d.ts:561

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredClient](configuredclient.md).[off](configuredclient.md#off)*

*Overrides [ConfiguredClient](configuredclient.md).[off](configuredclient.md#off)*

Defined in node_modules/@types/node/globals.d.ts:557

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

*Inherited from [ConfiguredClient](configuredclient.md).[on](configuredclient.md#on)*

*Overrides [ConfiguredClient](configuredclient.md).[on](configuredclient.md#on)*

Defined in node_modules/@types/node/globals.d.ts:554

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

*Inherited from [ConfiguredClient](configuredclient.md).[once](configuredclient.md#once)*

*Overrides [ConfiguredClient](configuredclient.md).[once](configuredclient.md#once)*

Defined in node_modules/@types/node/globals.d.ts:555

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

*Inherited from [ConfiguredClient](configuredclient.md).[prependListener](configuredclient.md#prependlistener)*

*Overrides [ConfiguredClient](configuredclient.md).[prependListener](configuredclient.md#prependlistener)*

Defined in node_modules/@types/node/globals.d.ts:566

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

*Inherited from [ConfiguredClient](configuredclient.md).[prependOnceListener](configuredclient.md#prependoncelistener)*

*Overrides [ConfiguredClient](configuredclient.md).[prependOnceListener](configuredclient.md#prependoncelistener)*

Defined in node_modules/@types/node/globals.d.ts:567

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

*Inherited from [ConfiguredClient](configuredclient.md).[rawListeners](configuredclient.md#rawlisteners)*

*Overrides [ConfiguredClient](configuredclient.md).[rawListeners](configuredclient.md#rawlisteners)*

Defined in node_modules/@types/node/globals.d.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [ConfiguredClient](configuredclient.md).[removeAllListeners](configuredclient.md#removealllisteners)*

*Overrides [ConfiguredClient](configuredclient.md).[removeAllListeners](configuredclient.md#removealllisteners)*

Defined in node_modules/@types/node/globals.d.ts:558

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [ConfiguredClient](configuredclient.md).[removeListener](configuredclient.md#removelistener)*

*Overrides [ConfiguredClient](configuredclient.md).[removeListener](configuredclient.md#removelistener)*

Defined in node_modules/@types/node/globals.d.ts:556

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

*Inherited from [ConfiguredClient](configuredclient.md).[setMaxListeners](configuredclient.md#setmaxlisteners)*

*Overrides [ConfiguredClient](configuredclient.md).[setMaxListeners](configuredclient.md#setmaxlisteners)*

Defined in node_modules/@types/node/globals.d.ts:559

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from [ConfiguredClient](configuredclient.md).[listenerCount](configuredclient.md#static-listenercount)*

*Overrides [ConfiguredClient](configuredclient.md).[listenerCount](configuredclient.md#static-listenercount)*

Defined in node_modules/@types/node/events.d.ts:44

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
