[Methodus - framework commons](../globals.md) › [MethodusConfig](methodusconfig.md)

# Class: MethodusConfig

## Hierarchy

* **MethodusConfig**

## Index

### Constructors

* [constructor](methodusconfig.md#constructor)

### Properties

* [classes](methodusconfig.md#classes)
* [clients](methodusconfig.md#clients)
* [plugins](methodusconfig.md#optional-plugins)
* [port](methodusconfig.md#port)
* [servers](methodusconfig.md#optional-servers)

### Methods

* [run](methodusconfig.md#run)
* [use](methodusconfig.md#use)
* [useClient](methodusconfig.md#useclient)

## Constructors

###  constructor

\+ **new MethodusConfig**(`servers?`: ServerConfig[], `map?`: Map‹string, MethodusClassConfig›): *[MethodusConfig](methodusconfig.md)*

Defined in modules/framework/framework-commons/lib/config/config.d.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`servers?` | ServerConfig[] |
`map?` | Map‹string, MethodusClassConfig› |

**Returns:** *[MethodusConfig](methodusconfig.md)*

## Properties

###  classes

• **classes**: *Map‹string, MethodusClassConfig›* = new Map<string, MethodusClassConfig>()

Defined in modules/framework/framework-commons/lib/config/config.d.ts:7

*Defined in [modules/framework/framework-commons/src/config/config.ts:12](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/config/config.ts#L12)*

___

###  clients

• **clients**: *Map‹string, MethodusClientConfig›* = new Map<string, MethodusClientConfig>()

Defined in modules/framework/framework-commons/lib/config/config.d.ts:9

*Defined in [modules/framework/framework-commons/src/config/config.ts:14](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/config/config.ts#L14)*

___

### `Optional` plugins

• **plugins**? : *PluginEntry[]*

Defined in modules/framework/framework-commons/lib/config/config.d.ts:10

*Defined in [modules/framework/framework-commons/src/config/config.ts:15](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/config/config.ts#L15)*

___

###  port

• **port**: *number* = 0

Defined in modules/framework/framework-commons/lib/config/config.d.ts:11

*Defined in [modules/framework/framework-commons/src/config/config.ts:16](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/config/config.ts#L16)*

___

### `Optional` servers

• **servers**? : *ServerConfig[]*

Defined in modules/framework/framework-commons/lib/config/config.d.ts:8

*Defined in [modules/framework/framework-commons/src/config/config.ts:13](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/config/config.ts#L13)*

## Methods

###  run

▸ **run**(`serverType`: [ServerDefinition](../interfaces/serverdefinition.md), `configuration`: any): *void*

Defined in modules/framework/framework-commons/lib/config/config.d.ts:15

**Parameters:**

Name | Type |
------ | ------ |
`serverType` | [ServerDefinition](../interfaces/serverdefinition.md) |
`configuration` | any |

**Returns:** *void*

___

###  use

▸ **use**(`classType`: any, `methodType`: [MethodType](../enums/methodtype.md), `serverType`: [ServerType](../enums/servertype.md), `resolver?`: Promise‹any› | string | any): *void*

Defined in modules/framework/framework-commons/lib/config/config.d.ts:14

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

Defined in modules/framework/framework-commons/lib/config/config.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`classType` | any |
`transportType` | [TransportType](../enums/transporttype.md) |
`resolver?` | Promise‹any› &#124; string &#124; any |

**Returns:** *void*
