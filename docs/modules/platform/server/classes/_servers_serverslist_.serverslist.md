[@methodus/server](../README.md) › [Globals](../globals.md) › ["servers/serversList"](../modules/_servers_serverslist_.md) › [ServersList](_servers_serverslist_.serverslist.md)

# Class: ServersList

## Hierarchy

* **ServersList**

## Index

### Constructors

* [constructor](_servers_serverslist_.serverslist.md#constructor)

### Properties

* [classes](_servers_serverslist_.serverslist.md#classes)
* [clients](_servers_serverslist_.serverslist.md#clients)
* [instances](_servers_serverslist_.serverslist.md#instances)
* [serversArray](_servers_serverslist_.serverslist.md#serversarray)

### Methods

* [addServer](_servers_serverslist_.serverslist.md#addserver)
* [get](_servers_serverslist_.serverslist.md#get)
* [reset](_servers_serverslist_.serverslist.md#reset)
* [set](_servers_serverslist_.serverslist.md#set)

## Constructors

###  constructor

\+ **new ServersList**(): *[ServersList](_servers_serverslist_.serverslist.md)*

*Defined in [src/servers/serversList.ts:8](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L8)*

**Returns:** *[ServersList](_servers_serverslist_.serverslist.md)*

## Properties

###  classes

• **classes**: *Dictionary*

*Defined in [src/servers/serversList.ts:6](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L6)*

___

###  clients

• **clients**: *Dictionary*

*Defined in [src/servers/serversList.ts:7](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L7)*

___

###  instances

• **instances**: *Dictionary*

*Defined in [src/servers/serversList.ts:5](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L5)*

___

###  serversArray

• **serversArray**: *any[]*

*Defined in [src/servers/serversList.ts:8](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L8)*

## Methods

###  addServer

▸ **addServer**(`server`: ServerDefinition): *string*

*Defined in [src/servers/serversList.ts:15](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`server` | ServerDefinition |

**Returns:** *string*

___

###  get

▸ **get**(`instanceId`: string, `serverType?`: undefined | string): *any*

*Defined in [src/servers/serversList.ts:25](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`serverType?` | undefined &#124; string |

**Returns:** *any*

___

###  reset

▸ **reset**(): *void*

*Defined in [src/servers/serversList.ts:32](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L32)*

**Returns:** *void*

___

###  set

▸ **set**(`instanceId`: string, `serverType`: string, `instance`: any): *any*

*Defined in [src/servers/serversList.ts:20](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/servers/serversList.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`serverType` | string |
`instance` | any |

**Returns:** *any*
