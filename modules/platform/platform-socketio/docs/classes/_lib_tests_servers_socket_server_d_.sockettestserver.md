[A Methodus guide](../README.md) › ["lib/tests/servers/socket.server.d"](../modules/_lib_tests_servers_socket_server_d_.md) › [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md)

# Class: SocketTestServer

## Hierarchy

* ConfiguredServer

  ↳ **SocketTestServer**

## Index

### Constructors

* [constructor](_lib_tests_servers_socket_server_d_.sockettestserver.md#constructor)

### Properties

* [server](_lib_tests_servers_socket_server_d_.sockettestserver.md#optional-server)
* [target](_lib_tests_servers_socket_server_d_.sockettestserver.md#target)

### Methods

* [addListener](_lib_tests_servers_socket_server_d_.sockettestserver.md#addlistener)
* [emit](_lib_tests_servers_socket_server_d_.sockettestserver.md#emit)
* [eventNames](_lib_tests_servers_socket_server_d_.sockettestserver.md#eventnames)
* [getMaxListeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#getmaxlisteners)
* [init](_lib_tests_servers_socket_server_d_.sockettestserver.md#init)
* [kill](_lib_tests_servers_socket_server_d_.sockettestserver.md#kill)
* [listenerCount](_lib_tests_servers_socket_server_d_.sockettestserver.md#listenercount)
* [listeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#listeners)
* [off](_lib_tests_servers_socket_server_d_.sockettestserver.md#off)
* [on](_lib_tests_servers_socket_server_d_.sockettestserver.md#on)
* [once](_lib_tests_servers_socket_server_d_.sockettestserver.md#once)
* [prependListener](_lib_tests_servers_socket_server_d_.sockettestserver.md#prependlistener)
* [prependOnceListener](_lib_tests_servers_socket_server_d_.sockettestserver.md#prependoncelistener)
* [rawListeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#rawlisteners)
* [removeAllListeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#removealllisteners)
* [removeListener](_lib_tests_servers_socket_server_d_.sockettestserver.md#removelistener)
* [setMaxListeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#setmaxlisteners)

## Constructors

###  constructor

\+ **new SocketTestServer**(): *[SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md)*

*Overrides void*

Defined in modules/platform/platform-socketio/lib/tests/servers/socket.server.d.ts:2

**Returns:** *[SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md)*

## Properties

### `Optional` server

• **server**? : *Server*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[server](_lib_tests_servers_socket_server_d_.sockettestserver.md#optional-server)*

Defined in modules/platform/server/lib/server.configured.d.ts:5

___

###  target

• **target**: *any*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[target](_lib_tests_servers_socket_server_d_.sockettestserver.md#target)*

Defined in modules/platform/server/lib/server.configured.d.ts:6

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[addListener](_lib_tests_servers_socket_server_d_.sockettestserver.md#addlistener)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:553

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

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[emit](_lib_tests_servers_socket_server_d_.sockettestserver.md#emit)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:563

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[eventNames](_lib_tests_servers_socket_server_d_.sockettestserver.md#eventnames)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:568

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[getMaxListeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#getmaxlisteners)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:560

**Returns:** *number*

___

###  init

▸ **init**(): *Promise‹void›*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[init](_lib_tests_servers_socket_server_d_.sockettestserver.md#init)*

Defined in modules/platform/server/lib/server.configured.d.ts:8

**Returns:** *Promise‹void›*

___

###  kill

▸ **kill**(): *void*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[kill](_lib_tests_servers_socket_server_d_.sockettestserver.md#kill)*

Defined in modules/platform/server/lib/server.configured.d.ts:9

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[listenerCount](_lib_tests_servers_socket_server_d_.sockettestserver.md#listenercount)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:564

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[listeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#listeners)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:561

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[off](_lib_tests_servers_socket_server_d_.sockettestserver.md#off)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:557

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

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[on](_lib_tests_servers_socket_server_d_.sockettestserver.md#on)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:554

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

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[once](_lib_tests_servers_socket_server_d_.sockettestserver.md#once)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:555

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

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[prependListener](_lib_tests_servers_socket_server_d_.sockettestserver.md#prependlistener)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:566

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

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[prependOnceListener](_lib_tests_servers_socket_server_d_.sockettestserver.md#prependoncelistener)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:567

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

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[rawListeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#rawlisteners)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[removeAllListeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#removealllisteners)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:558

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[removeListener](_lib_tests_servers_socket_server_d_.sockettestserver.md#removelistener)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:556

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

*Inherited from [SocketTestServer](_lib_tests_servers_socket_server_d_.sockettestserver.md).[setMaxListeners](_lib_tests_servers_socket_server_d_.sockettestserver.md#setmaxlisteners)*

Defined in modules/platform/platform-socketio/node_modules/@types/node/globals.d.ts:559

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*
