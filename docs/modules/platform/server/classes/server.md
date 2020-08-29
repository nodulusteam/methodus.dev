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
* [httpServer](server.md#private-httpserver)
* [httpsServer](server.md#private-httpsserver)
* [instanceId](server.md#private-instanceid)
* [port](server.md#private-port)
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

*Defined in [src/server.ts:27](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L27)*

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

*Defined in [src/server.ts:22](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L22)*

___

### `Private` _plugins

• **_plugins**: *PluginEntry[]* = []

*Defined in [src/server.ts:26](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L26)*

___

###  app

• **app**: *any*

*Defined in [src/server.ts:18](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L18)*

___

### `Optional` config

• **config**? : *MethodusConfig*

*Defined in [src/server.ts:19](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L19)*

___

### `Private` httpServer

• **httpServer**: *any*

*Defined in [src/server.ts:23](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L23)*

___

### `Private` httpsServer

• **httpsServer**: *any*

*Defined in [src/server.ts:24](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L24)*

___

### `Private` instanceId

• **instanceId**: *string*

*Defined in [src/server.ts:27](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L27)*

___

### `Private` port

• **port**: *number* = 0

*Defined in [src/server.ts:25](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L25)*

___

###  serverKey

• **serverKey**: *string*

*Defined in [src/server.ts:20](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L20)*

## Methods

###  configure

▸ **configure**(`config`: MethodusConfig): *this*

*Defined in [src/server.ts:54](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | MethodusConfig |

**Returns:** *this*

___

###  kill

▸ **kill**(): *void*

*Defined in [src/server.ts:195](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L195)*

**Returns:** *void*

___

###  makeid

▸ **makeid**(): *string*

*Defined in [src/server.ts:45](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L45)*

**Returns:** *string*

___

###  plugins

▸ **plugins**(`plugins`: PluginEntry[]): *this*

*Defined in [src/server.ts:49](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`plugins` | PluginEntry[] |

**Returns:** *this*

___

###  start

▸ **start**(): *Promise‹this›*

*Defined in [src/server.ts:85](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L85)*

**Returns:** *Promise‹this›*

___

###  useClass

▸ **useClass**(`_class`: any): *void*

*Defined in [src/server.ts:159](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`_class` | any |

**Returns:** *void*

___

###  useClient

▸ **useClient**(`_class`: any): *void*

*Defined in [src/server.ts:61](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/server/src/server.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`_class` | any |

**Returns:** *void*
