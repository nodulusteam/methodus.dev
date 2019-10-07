[A Methodus guide](../README.md) > [Server](../classes/server.md)

# Class: Server

## Hierarchy

**Server**

## Index

### Constructors

* [constructor](server.md#constructor)

### Properties

* [_app](server.md#_app)
* [_plugins](server.md#_plugins)
* [app](server.md#app)
* [config](server.md#config)
* [httpServer](server.md#httpserver)
* [instanceId](server.md#instanceid)
* [port](server.md#port)
* [serverKey](server.md#serverkey)

### Methods

* [configure](server.md#configure)
* [kill](server.md#kill)
* [makeid](server.md#makeid)
* [plugins](server.md#plugins)
* [printlogo](server.md#printlogo)
* [start](server.md#start)
* [useClass](server.md#useclass)
* [useClient](server.md#useclient)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Server**(port?: *`number` \| `string`*, app?: *`any`*, httpServer?: *`any`*): [Server](server.md)

*Defined in build/server.d.ts:14*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` port | `number` \| `string` |
| `Optional` app | `any` |
| `Optional` httpServer | `any` |

**Returns:** [Server](server.md)

___

## Properties

<a id="_app"></a>

###  _app

**● _app**: *`any`*

*Defined in build/server.d.ts:10*
*Defined in [src/server.ts:19](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/server.ts#L19)*

___
<a id="_plugins"></a>

### `<Private>` _plugins

**● _plugins**: *`PluginEntry`[]* =  []

*Defined in build/server.d.ts:13*
*Defined in [src/server.ts:22](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/server.ts#L22)*

___
<a id="app"></a>

###  app

**● app**: *`any`*

*Defined in build/server.d.ts:7*
*Defined in [src/server.ts:15](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/server.ts#L15)*

___
<a id="config"></a>

### `<Optional>` config

**● config**: *[MethodusConfig](methodusconfig.md)*

*Defined in build/server.d.ts:8*
*Defined in [src/server.ts:16](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/server.ts#L16)*

___
<a id="httpserver"></a>

### `<Private>` httpServer

**● httpServer**: *`any`*

*Defined in build/server.d.ts:11*
*Defined in [src/server.ts:20](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/server.ts#L20)*

___
<a id="instanceid"></a>

### `<Private>` instanceId

**● instanceId**: *`string`*

*Defined in build/server.d.ts:14*
*Defined in [src/server.ts:23](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/server.ts#L23)*

___
<a id="port"></a>

### `<Private>` port

**● port**: *`number`* = 0

*Defined in build/server.d.ts:12*
*Defined in [src/server.ts:21](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/server.ts#L21)*

___
<a id="serverkey"></a>

###  serverKey

**● serverKey**: *`string`*

*Defined in build/server.d.ts:9*
*Defined in [src/server.ts:17](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/server.ts#L17)*

___

## Methods

<a id="configure"></a>

###  configure

▸ **configure**(config: *[MethodusConfig](methodusconfig.md)*): `this`

*Defined in build/server.d.ts:18*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [MethodusConfig](methodusconfig.md) |

**Returns:** `this`

___
<a id="kill"></a>

###  kill

▸ **kill**(): `void`

*Defined in build/server.d.ts:23*

**Returns:** `void`

___
<a id="makeid"></a>

###  makeid

▸ **makeid**(): `string`

*Defined in build/server.d.ts:16*

**Returns:** `string`

___
<a id="plugins"></a>

###  plugins

▸ **plugins**(plugins: *[PluginEntry](../interfaces/pluginentry.md)[]*): `this`

*Defined in build/server.d.ts:17*

**Parameters:**

| Name | Type |
| ------ | ------ |
| plugins | [PluginEntry](../interfaces/pluginentry.md)[] |

**Returns:** `this`

___
<a id="printlogo"></a>

###  printlogo

▸ **printlogo**(): `Promise`<`void`>

*Defined in build/server.d.ts:19*

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`this`>

*Defined in build/server.d.ts:21*

**Returns:** `Promise`<`this`>

___
<a id="useclass"></a>

###  useClass

▸ **useClass**(_class: *`any`*): `void`

*Defined in build/server.d.ts:22*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `any` |

**Returns:** `void`

___
<a id="useclient"></a>

###  useClient

▸ **useClient**(_class: *`any`*): `void`

*Defined in build/server.d.ts:20*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `any` |

**Returns:** `void`

___

