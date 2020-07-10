[A Methodus guide](../README.md) › [ClientList](clientlist.md)

# Class: ClientList

## Hierarchy

* **ClientList**

## Index

### Constructors

* [constructor](clientlist.md#constructor)

### Properties

* [clients](clientlist.md#clients)
* [instances](clientlist.md#instances)
* [serversArray](clientlist.md#serversarray)

### Methods

* [addServer](clientlist.md#addserver)
* [get](clientlist.md#get)
* [reset](clientlist.md#reset)
* [set](clientlist.md#set)

## Constructors

###  constructor

\+ **new ClientList**(): *[ClientList](clientlist.md)*

Defined in lib/clients-list.d.ts:5

**Returns:** *[ClientList](clientlist.md)*

## Properties

###  clients

• **clients**: *[Dictionary](../README.md#dictionary)*

Defined in lib/clients-list.d.ts:4

*Defined in [src/clients-list.ts:7](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-rest/src/clients-list.ts#L7)*

___

###  instances

• **instances**: *[Dictionary](../README.md#dictionary)*

Defined in lib/clients-list.d.ts:3

*Defined in [src/clients-list.ts:5](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-rest/src/clients-list.ts#L5)*

___

###  serversArray

• **serversArray**: *any[]*

Defined in lib/clients-list.d.ts:5

*Defined in [src/clients-list.ts:8](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-rest/src/clients-list.ts#L8)*

## Methods

###  addServer

▸ **addServer**(`server`: ServerDefinition): *string*

Defined in lib/clients-list.d.ts:7

**Parameters:**

Name | Type |
------ | ------ |
`server` | ServerDefinition |

**Returns:** *string*

___

###  get

▸ **get**(`instanceId`: string, `serverType?`: undefined | string): *any*

Defined in lib/clients-list.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`serverType?` | undefined &#124; string |

**Returns:** *any*

___

###  reset

▸ **reset**(): *void*

Defined in lib/clients-list.d.ts:10

**Returns:** *void*

___

###  set

▸ **set**(`instanceId`: string, `serverType`: string, `instance`: any): *any*

Defined in lib/clients-list.d.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`serverType` | string |
`instance` | any |

**Returns:** *any*
