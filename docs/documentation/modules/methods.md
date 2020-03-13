[A Methodus guide](../README.md) > [Methods](../modules/methods.md)

# Module: Methods

## Index

### Functions

* [Method](methods.md#method)
* [MethodConfig](methods.md#methodconfig)
* [MethodConfigBase](methods.md#methodconfigbase)
* [MethodPipe](methods.md#methodpipe)

---

## Functions

<a id="method"></a>

###  Method

▸ **Method**(verb?: *`undefined` \| `string`*, route?: *`undefined` \| `string`*, middlewares?: *`any`[]*): `(Anonymous function)`

*Defined in [src/method/method.ts:25](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/method/method.ts#L25)*

the @Method decorator registers route listeners @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` verb | `undefined` \| `string` |
| `Optional` route | `undefined` \| `string` |
| `Optional` middlewares | `any`[] |

**Returns:** `(Anonymous function)`

___
<a id="methodconfig"></a>

###  MethodConfig

▸ **MethodConfig**(name: *`string`*, middlewares?: *`any`[]*, prefix?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [src/method/method-config.ts:14](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/method/method-config.ts#L14)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` middlewares | `any`[] |
| `Optional` prefix | `undefined` \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="methodconfigbase"></a>

###  MethodConfigBase

▸ **MethodConfigBase**(name: *`string`*, middlewares?: *`any`[]*, repository?: *`any`*): `(Anonymous function)`

*Defined in [src/method/method-config-base.ts:14](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/method/method-config-base.ts#L14)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` middlewares | `any`[] |
| `Optional` repository | `any` |

**Returns:** `(Anonymous function)`

___
<a id="methodpipe"></a>

###  MethodPipe

▸ **MethodPipe**(verb: *`string`*, route: *`string`*, middlewares?: *`any`[]*): `(Anonymous function)`

*Defined in [src/method/method-pipe.ts:21](https://github.com/nodulusteam/methodus.dev/blob/3c34c71/src/method/method-pipe.ts#L21)*

the @Method decorator registers route listeners @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | `string` |
| route | `string` |
| `Optional` middlewares | `any`[] |

**Returns:** `(Anonymous function)`

___

