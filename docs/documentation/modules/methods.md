[A Methodus guide](../README.md) > [Methods](../modules/methods.md)

# Module: Methods

## Index

### Functions

* [Method](methods.md#method)
* [MethodConfig](methods.md#methodconfig)
* [MethodConfigBase](methods.md#methodconfigbase)
* [MethodConfigExtend](methods.md#methodconfigextend)
* [MethodMock](methods.md#methodmock)
* [MethodPipe](methods.md#methodpipe)

---

## Functions

<a id="method"></a>

###  Method

▸ **Method**(verb: *`Verbs`*, route: *`string`*, middlewares?: *`any`[]*): `(Anonymous function)`

*Defined in [src/method/method.ts:24](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/method/method.ts#L24)*

the @Method decorator registers the model with the odm @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | `Verbs` |
| route | `string` |
| `Optional` middlewares | `any`[] |

**Returns:** `(Anonymous function)`

___
<a id="methodconfig"></a>

###  MethodConfig

▸ **MethodConfig**(name: *`string`*, middlewares?: *`any`[]*, repository?: *`any`*): `(Anonymous function)`

*Defined in [src/method/method-config.ts:12](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/method/method-config.ts#L12)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` middlewares | `any`[] |
| `Optional` repository | `any` |

**Returns:** `(Anonymous function)`

___
<a id="methodconfigbase"></a>

###  MethodConfigBase

▸ **MethodConfigBase**(name: *`string`*, middlewares?: *`any`[]*, repository?: *`any`*): `(Anonymous function)`

*Defined in [src/method/method-config-base.ts:14](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/method/method-config-base.ts#L14)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` middlewares | `any`[] |
| `Optional` repository | `any` |

**Returns:** `(Anonymous function)`

___
<a id="methodconfigextend"></a>

###  MethodConfigExtend

▸ **MethodConfigExtend**(extendTarget: *`any`*, name?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [src/method/method-config-extend.ts:12](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/method/method-config-extend.ts#L12)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| extendTarget | `any` |
| `Optional` name | `undefined` \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="methodmock"></a>

###  MethodMock

▸ **MethodMock**(mockedResult: *`any`*): `(Anonymous function)`

*Defined in [src/method/method-mock.ts:12](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/method/method-mock.ts#L12)*

the @MethodMock decorator registers the model with the odm @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| mockedResult | `any` |

**Returns:** `(Anonymous function)`

___
<a id="methodpipe"></a>

###  MethodPipe

▸ **MethodPipe**(verb: *`Verbs`*, route: *`string`*, middlewares?: *`any`[]*): `(Anonymous function)`

*Defined in [src/method/method-pipe.ts:21](https://github.com/nodulusteam/methodus.dev/blob/c7705c6/src/method/method-pipe.ts#L21)*

the @Method decorator registers the model with the odm @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | `Verbs` |
| route | `string` |
| `Optional` middlewares | `any`[] |

**Returns:** `(Anonymous function)`

___

