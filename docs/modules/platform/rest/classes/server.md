[Methodus - platform rest](../README.md) › [Globals](../globals.md) › [Server](server.md)

# Class: Server

## Hierarchy

* **Server**

## Index

### Constructors

* [constructor](server.md#constructor)

### Properties

* [_app](server.md#_app)
* [app](server.md#app)
* [config](server.md#optional-config)
* [instanceId](server.md#private-instanceid)
* [serverKey](server.md#serverkey)

### Methods

* [configure](server.md#configure)
* [kill](server.md#kill)
* [makeid](server.md#makeid)
* [plugins](server.md#plugins)
* [start](server.md#start)
* [useClient](server.md#useclient)

## Constructors

###  constructor

\+ **new Server**(): *[Server](server.md)*

Defined in dist/server.d.ts:11

**Returns:** *[Server](server.md)*

## Properties

###  _app

• **_app**: *any*

Defined in dist/server.d.ts:10

*Defined in [src/server.ts:19](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-rest/src/server.ts#L19)*

___

###  app

• **app**: *any*

Defined in dist/server.d.ts:7

*Defined in [src/server.ts:16](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-rest/src/server.ts#L16)*

___

### `Optional` config

• **config**? : *MethodusConfig*

Defined in dist/server.d.ts:8

*Defined in [src/server.ts:17](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-rest/src/server.ts#L17)*

___

### `Private` instanceId

• **instanceId**: *string*

Defined in dist/server.d.ts:11

*Defined in [src/server.ts:20](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-rest/src/server.ts#L20)*

___

###  serverKey

• **serverKey**: *string*

Defined in dist/server.d.ts:9

*Defined in [src/server.ts:18](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-rest/src/server.ts#L18)*

## Methods

###  configure

▸ **configure**(`config`: MethodusConfig): *this*

Defined in dist/server.d.ts:15

**Parameters:**

Name | Type |
------ | ------ |
`config` | MethodusConfig |

**Returns:** *this*

___

###  kill

▸ **kill**(): *void*

Defined in dist/server.d.ts:18

**Returns:** *void*

___

###  makeid

▸ **makeid**(): *string*

Defined in dist/server.d.ts:13

**Returns:** *string*

___

###  plugins

▸ **plugins**(`plugins`: PluginEntry[]): *this*

Defined in dist/server.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`plugins` | PluginEntry[] |

**Returns:** *this*

___

###  start

▸ **start**(): *Promise‹this›*

Defined in dist/server.d.ts:17

**Returns:** *Promise‹this›*

___

###  useClient

▸ **useClient**(`_class`: any): *void*

Defined in dist/server.d.ts:16

**Parameters:**

Name | Type |
------ | ------ |
`_class` | any |

**Returns:** *void*
