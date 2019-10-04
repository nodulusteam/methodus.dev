[A Methodus guide](../README.md) > [MethodusConfig](../classes/methodusconfig.md)

# Class: MethodusConfig

## Hierarchy

**MethodusConfig**

## Index

### Constructors

* [constructor](methodusconfig.md#constructor)

### Properties

* [classes](methodusconfig.md#classes)
* [clients](methodusconfig.md#clients)
* [plugins](methodusconfig.md#plugins)
* [port](methodusconfig.md#port)
* [servers](methodusconfig.md#servers)

### Methods

* [run](methodusconfig.md#run)
* [use](methodusconfig.md#use)
* [useClient](methodusconfig.md#useclient)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MethodusConfig**(servers?: *`ServerConfig`[]*, map?: *`Map`<`string`, `MethodusClassConfig`>*): [MethodusConfig](methodusconfig.md)

*Defined in build/config/config.d.ts:14*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` servers | `ServerConfig`[] |
| `Optional` map | `Map`<`string`, `MethodusClassConfig`> |

**Returns:** [MethodusConfig](methodusconfig.md)

___

## Properties

<a id="classes"></a>

###  classes

**● classes**: *`Map`<`string`, `MethodusClassConfig`>* =  new Map<string, MethodusClassConfig>()

*Defined in build/config/config.d.ts:10*
*Defined in [src/config/config.ts:16](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/config/config.ts#L16)*

___
<a id="clients"></a>

###  clients

**● clients**: *`Map`<`string`, `MethodusClientConfig`>* =  new Map<string, MethodusClientConfig>()

*Defined in build/config/config.d.ts:12*
*Defined in [src/config/config.ts:18](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/config/config.ts#L18)*

___
<a id="plugins"></a>

### `<Optional>` plugins

**● plugins**: *`PluginEntry`[]*

*Defined in build/config/config.d.ts:13*
*Defined in [src/config/config.ts:19](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/config/config.ts#L19)*

___
<a id="port"></a>

###  port

**● port**: *`number`* = 0

*Defined in build/config/config.d.ts:14*
*Defined in [src/config/config.ts:20](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/config/config.ts#L20)*

___
<a id="servers"></a>

### `<Optional>` servers

**● servers**: *`ServerConfig`[]*

*Defined in build/config/config.d.ts:11*
*Defined in [src/config/config.ts:17](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/config/config.ts#L17)*

___

## Methods

<a id="run"></a>

###  run

▸ **run**(serverType: *[ServerType](../enums/servertype.md)*, configuration: *`any`*): `void`

*Defined in build/config/config.d.ts:18*

**Parameters:**

| Name | Type |
| ------ | ------ |
| serverType | [ServerType](../enums/servertype.md) |
| configuration | `any` |

**Returns:** `void`

___
<a id="use"></a>

###  use

▸ **use**(classType: *`any`*, methodType: *[MethodType](../enums/methodtype.md)*, serverType: *[ServerType](../enums/servertype.md)*, resolver?: *`Promise`<`any`> \| `string` \| `any`*): `void`

*Defined in build/config/config.d.ts:17*

**Parameters:**

| Name | Type |
| ------ | ------ |
| classType | `any` |
| methodType | [MethodType](../enums/methodtype.md) |
| serverType | [ServerType](../enums/servertype.md) |
| `Optional` resolver | `Promise`<`any`> \| `string` \| `any` |

**Returns:** `void`

___
<a id="useclient"></a>

###  useClient

▸ **useClient**(classType: *`any`*, transportType: *[TransportType](../enums/transporttype.md)*, resolver?: *`Promise`<`any`> \| `string` \| `any`*): `void`

*Defined in build/config/config.d.ts:16*

**Parameters:**

| Name | Type |
| ------ | ------ |
| classType | `any` |
| transportType | [TransportType](../enums/transporttype.md) |
| `Optional` resolver | `Promise`<`any`> \| `string` \| `any` |

**Returns:** `void`

___

