[@methodus/server](../README.md) > [Server](../classes/server.md)

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

*Defined in [server.ts:24](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L24)*

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

*Defined in [server.ts:20](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L20)*

___
<a id="_plugins"></a>

### `<Private>` _plugins

**● _plugins**: *[PluginEntry](../interfaces/pluginentry.md)[]* =  []

*Defined in [server.ts:23](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L23)*

___
<a id="app"></a>

###  app

**● app**: *`any`*

*Defined in [server.ts:16](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L16)*

___
<a id="config"></a>

### `<Optional>` config

**● config**: *[MethodusConfig](methodusconfig.md)*

*Defined in [server.ts:17](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L17)*

___
<a id="httpserver"></a>

### `<Private>` httpServer

**● httpServer**: *`any`*

*Defined in [server.ts:21](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L21)*

___
<a id="instanceid"></a>

### `<Private>` instanceId

**● instanceId**: *`string`*

*Defined in [server.ts:24](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L24)*

___
<a id="port"></a>

### `<Private>` port

**● port**: *`number`* = 0

*Defined in [server.ts:22](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L22)*

___
<a id="serverkey"></a>

###  serverKey

**● serverKey**: *`string`*

*Defined in [server.ts:18](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L18)*

___

## Methods

<a id="configure"></a>

###  configure

▸ **configure**(config: *[MethodusConfig](methodusconfig.md)*): `this`

*Defined in [server.ts:52](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [MethodusConfig](methodusconfig.md) |

**Returns:** `this`

___
<a id="kill"></a>

###  kill

▸ **kill**(): `void`

*Defined in [server.ts:193](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L193)*

**Returns:** `void`

___
<a id="makeid"></a>

###  makeid

▸ **makeid**(): `string`

*Defined in [server.ts:37](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L37)*

**Returns:** `string`

___
<a id="plugins"></a>

###  plugins

▸ **plugins**(plugins: *[PluginEntry](../interfaces/pluginentry.md)[]*): `this`

*Defined in [server.ts:47](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| plugins | [PluginEntry](../interfaces/pluginentry.md)[] |

**Returns:** `this`

___
<a id="printlogo"></a>

###  printlogo

▸ **printlogo**(): `Promise`<`void`>

*Defined in [server.ts:57](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L57)*

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`this`>

*Defined in [server.ts:91](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L91)*

**Returns:** `Promise`<`this`>

___
<a id="useclass"></a>

###  useClass

▸ **useClass**(_class: *`any`*): `void`

*Defined in [server.ts:158](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L158)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `any` |

**Returns:** `void`

___
<a id="useclient"></a>

###  useClient

▸ **useClient**(_class: *`any`*): `void`

*Defined in [server.ts:67](https://github.com/nodulusteam/methodus.dev/blob/907fca8/src/server.ts#L67)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _class | `any` |

**Returns:** `void`

___

