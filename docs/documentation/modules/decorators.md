[A Methodus guide](../README.md) > [Decorators](../modules/decorators.md)

# Module: Decorators

## Index

### Modules

* [Methods](decorators.methods.md)

### Functions

* [ClientConfiguration](decorators.md#clientconfiguration)
* [PluginConfiguration](decorators.md#pluginconfiguration)
* [RouterConfiguration](decorators.md#routerconfiguration)
* [ServerConfiguration](decorators.md#serverconfiguration)

---

## Functions

<a id="clientconfiguration"></a>

###  ClientConfiguration

▸ **ClientConfiguration**(controller: *`any`*, transportType: *`any`*, resolver?: *`any`*): `(Anonymous function)`

*Defined in [src/decorators/client.ts:8](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/decorators/client.ts#L8)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| controller | `any` |
| transportType | `any` |
| `Optional` resolver | `any` |

**Returns:** `(Anonymous function)`

___
<a id="pluginconfiguration"></a>

###  PluginConfiguration

▸ **PluginConfiguration**(name: *`string`*, options?: *`any`*): `(Anonymous function)`

*Defined in [src/decorators/plugin.ts:8](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/decorators/plugin.ts#L8)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` options | `any` |

**Returns:** `(Anonymous function)`

___
<a id="routerconfiguration"></a>

###  RouterConfiguration

▸ **RouterConfiguration**(controller: *`any`*, serverType: *`ServerType` \| `string` \| `ServerDefinition` \| `any`*): `(Anonymous function)`

*Defined in [src/decorators/router.ts:11](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/decorators/router.ts#L11)*

the RouterConfiguration decorator registers the controller as a router @param {type} controller - a controller class using the @MethodConfig decorator. @param {string} serverType - the name of the server

**Parameters:**

| Name | Type |
| ------ | ------ |
| controller | `any` |
| serverType | `ServerType` \| `string` \| `ServerDefinition` \| `any` |

**Returns:** `(Anonymous function)`

___
<a id="serverconfiguration"></a>

###  ServerConfiguration

▸ **ServerConfiguration**(serverType: *`any`*, options?: *`any`*): `(Anonymous function)`

*Defined in [src/decorators/server.ts:10](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/decorators/server.ts#L10)*

the ServerConfiguration decorator registers a server @param {string} serverType - the type for the server. @param {object} options - any options that needs to be passed to the server object

**Parameters:**

| Name | Type |
| ------ | ------ |
| serverType | `any` |
| `Optional` options | `any` |

**Returns:** `(Anonymous function)`

___

