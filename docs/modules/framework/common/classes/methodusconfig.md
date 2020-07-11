[Methodus - framework commons](../globals.md) › [MethodusConfig](modules/framework/common/methodusconfig.md)

# Class: MethodusConfig

## Hierarchy

* **MethodusConfig**

## Index

### Constructors

* [constructor](modules/framework/common/methodusconfig.md#constructor)

### Properties

* [classes](modules/framework/common/methodusconfig.md#classes)
* [clients](modules/framework/common/methodusconfig.md#clients)
* [plugins](modules/framework/common/methodusconfig.md#optional-plugins)
* [port](modules/framework/common/methodusconfig.md#port)
* [servers](modules/framework/common/methodusconfig.md#optional-servers)

### Methods

* [run](modules/framework/common/methodusconfig.md#run)
* [use](modules/framework/common/methodusconfig.md#use)
* [useClient](modules/framework/common/methodusconfig.md#useclient)

## Constructors

###  constructor

\+ **new MethodusConfig**(`servers?`: ServerConfig[], `map?`: Map‹string, MethodusClassConfig›): *[MethodusConfig](modules/framework/common/methodusconfig.md)*

Defined in lib/config/config.d.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`servers?` | ServerConfig[] |
`map?` | Map‹string, MethodusClassConfig› |

**Returns:** *[MethodusConfig](modules/framework/common/methodusconfig.md)*

## Properties

###  classes

• **classes**: *Map‹string, MethodusClassConfig›* = new Map<string, MethodusClassConfig>()

Defined in lib/config/config.d.ts:7

*Defined in [src/config/config.ts:12](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/config/config.ts#L12)*

___

###  clients

• **clients**: *Map‹string, MethodusClientConfig›* = new Map<string, MethodusClientConfig>()

Defined in lib/config/config.d.ts:9

*Defined in [src/config/config.ts:14](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/config/config.ts#L14)*

___

### `Optional` plugins

• **plugins**? : *PluginEntry[]*

Defined in lib/config/config.d.ts:10

*Defined in [src/config/config.ts:15](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/config/config.ts#L15)*

___

###  port

• **port**: *number* = 0

Defined in lib/config/config.d.ts:11

*Defined in [src/config/config.ts:16](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/config/config.ts#L16)*

___

### `Optional` servers

• **servers**? : *ServerConfig[]*

Defined in lib/config/config.d.ts:8

*Defined in [src/config/config.ts:13](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/config/config.ts#L13)*

## Methods

###  run

▸ **run**(`serverType`: [ServerDefinition](../interfaces/serverdefinition.md), `configuration`: any): *void*

Defined in lib/config/config.d.ts:15

**Parameters:**

Name | Type |
------ | ------ |
`serverType` | [ServerDefinition](../interfaces/serverdefinition.md) |
`configuration` | any |

**Returns:** *void*

___

###  use

▸ **use**(`classType`: any, `methodType`: [MethodType](../enums/methodtype.md), `serverType`: [ServerType](../enums/servertype.md), `resolver?`: Promise‹any› | string | any): *void*

Defined in lib/config/config.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`classType` | any |
`methodType` | [MethodType](../enums/methodtype.md) |
`serverType` | [ServerType](../enums/servertype.md) |
`resolver?` | Promise‹any› &#124; string &#124; any |

**Returns:** *void*

___

###  useClient

▸ **useClient**(`classType`: any, `transportType`: [TransportType](../enums/transporttype.md), `resolver?`: Promise‹any› | string | any): *void*

Defined in lib/config/config.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`classType` | any |
`transportType` | [TransportType](../enums/transporttype.md) |
`resolver?` | Promise‹any› &#124; string &#124; any |

**Returns:** *void*
