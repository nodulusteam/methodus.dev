[Methodus - platform/express](../README.md) › [Globals](../globals.md) › [ExpressTestServer](expresstestserver.md)

# Class: ExpressTestServer

## Hierarchy

* ConfiguredServer

* ConfiguredServer

  ↳ **ExpressTestServer**

## Index

### Constructors

* [constructor](expresstestserver.md#constructor)

### Properties

* [server](expresstestserver.md#optional-server)
* [target](expresstestserver.md#target)

### Methods

* [addListener](expresstestserver.md#addlistener)
* [emit](expresstestserver.md#emit)
* [eventNames](expresstestserver.md#eventnames)
* [getMaxListeners](expresstestserver.md#getmaxlisteners)
* [init](expresstestserver.md#init)
* [kill](expresstestserver.md#kill)
* [listenerCount](expresstestserver.md#listenercount)
* [listeners](expresstestserver.md#listeners)
* [off](expresstestserver.md#off)
* [on](expresstestserver.md#on)
* [once](expresstestserver.md#once)
* [prependListener](expresstestserver.md#prependlistener)
* [prependOnceListener](expresstestserver.md#prependoncelistener)
* [rawListeners](expresstestserver.md#rawlisteners)
* [removeAllListeners](expresstestserver.md#removealllisteners)
* [removeListener](expresstestserver.md#removelistener)
* [setMaxListeners](expresstestserver.md#setmaxlisteners)

## Constructors

###  constructor

\+ **new ExpressTestServer**(): *[ExpressTestServer](expresstestserver.md)*

*Overrides void*

Defined in platform/platform-express/dist/tests/servers/express.server.http.d.ts:2

**Returns:** *[ExpressTestServer](expresstestserver.md)*

## Properties

### `Optional` server

• **server**? : *Server*

*Inherited from void*

*Overrides void*

Defined in platform/server/dist/server.configured.d.ts:5

___

###  target

• **target**: *any*

*Inherited from void*

*Overrides void*

Defined in platform/server/dist/server.configured.d.ts:6

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:62

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

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:77

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:69

**Returns:** *number*

___

###  init

▸ **init**(): *Promise‹void›*

*Inherited from void*

*Overrides void*

Defined in platform/server/dist/server.configured.d.ts:8

**Returns:** *Promise‹void›*

___

###  kill

▸ **kill**(): *void*

*Inherited from void*

*Overrides void*

Defined in platform/server/dist/server.configured.d.ts:9

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:66

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

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:63

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

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:64

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

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:75

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

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:76

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

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:65

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

*Inherited from void*

*Overrides void*

Defined in platform/platform-express/node_modules/@types/node/events.d.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*
