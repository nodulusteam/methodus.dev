[Server components](../README.md) › [Globals](../globals.md) › [Server](server.md)

# Class: Server

## Hierarchy

* **Server**

## Index

### Constructors

* [constructor](server.md#constructor)

### Properties

* [_app](server.md#_app)
* [_plugins](server.md#private-_plugins)
* [app](server.md#app)
* [config](server.md#optional-config)
* [httpServer](server.md#httpserver)
* [httpsServer](server.md#httpsserver)
* [instanceId](server.md#instanceid)
* [methodHandler](server.md#optional-methodhandler)
* [methodPipeHandler](server.md#optional-methodpipehandler)
* [port](server.md#port)
* [serverKey](server.md#serverkey)

### Methods

* [configure](server.md#configure)
* [kill](server.md#kill)
* [makeid](server.md#makeid)
* [plugins](server.md#plugins)
* [start](server.md#start)
* [useClass](server.md#useclass)
* [useClient](server.md#useclient)

## Constructors

###  constructor

\+ **new Server**(`port?`: number | string, `app?`: any, `httpServer?`: any): *[Server](server.md)*

*Defined in [src/server.ts:30](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`port?` | number &#124; string |
`app?` | any |
`httpServer?` | any |

**Returns:** *[Server](server.md)*

## Properties

###  _app

• **_app**: *any*

*Defined in [src/server.ts:22](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L22)*

___

### `Private` _plugins

• **_plugins**: *PluginEntry[]* = []

*Defined in [src/server.ts:26](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L26)*

___

###  app

• **app**: *any*

*Defined in [src/server.ts:18](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L18)*

___

### `Optional` config

• **config**? : *MethodusConfig*

*Defined in [src/server.ts:19](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L19)*

___

###  httpServer

• **httpServer**: *any*

*Defined in [src/server.ts:23](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L23)*

___

###  httpsServer

• **httpsServer**: *any*

*Defined in [src/server.ts:24](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L24)*

___

###  instanceId

• **instanceId**: *string*

*Defined in [src/server.ts:27](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L27)*

___

### `Optional` methodHandler

• **methodHandler**? : *[MethodHandler](methodhandler.md) | null*

*Defined in [src/server.ts:29](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L29)*

___

### `Optional` methodPipeHandler

• **methodPipeHandler**? : *[MethodPipeHandler](methodpipehandler.md) | null*

*Defined in [src/server.ts:30](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L30)*

___

###  port

• **port**: *number* = 0

*Defined in [src/server.ts:25](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L25)*

___

###  serverKey

• **serverKey**: *string*

*Defined in [src/server.ts:20](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L20)*

## Methods

###  configure

▸ **configure**(`config`: MethodusConfig): *this*

*Defined in [src/server.ts:55](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | MethodusConfig |

**Returns:** *this*

___

###  kill

▸ **kill**(): *void*

*Defined in [src/server.ts:196](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L196)*

**Returns:** *void*

___

###  makeid

▸ **makeid**(): *string*

*Defined in [src/server.ts:46](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L46)*

**Returns:** *string*

___

###  plugins

▸ **plugins**(`plugins`: PluginEntry[]): *this*

*Defined in [src/server.ts:50](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`plugins` | PluginEntry[] |

**Returns:** *this*

___

###  start

▸ **start**(): *Promise‹this›*

*Defined in [src/server.ts:86](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L86)*

**Returns:** *Promise‹this›*

___

###  useClass

▸ **useClass**(`_class`: any): *void*

*Defined in [src/server.ts:160](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`_class` | any |

**Returns:** *void*

___

###  useClient

▸ **useClient**(`_class`: any): *void*

*Defined in [src/server.ts:62](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/server/src/server.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`_class` | any |

**Returns:** *void*
