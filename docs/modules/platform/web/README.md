
This is a client library for the Methodus framework, but it can also be used independently.

[

Methodus Client
===============

](#methodus-client)

![Quality gate](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=alert_status "Quality gate") ![rating](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=sqale_rating "rating") ![reliability](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=reliability_rating "reliability") ![coverage](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=coverage "coverage") ![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-client&metric=vulnerabilities "coverage")

[

Usage
=====

](#usage)

The library is used to define transport related integrations using TypeScript decorators. The decorated classes will be used to invoke the transport and deliver the call using it. For example a website using Rest calls to a remote server will abstract the Rest calls to a decorated class and then use that class instead of direct Rest access code.

Decorated client contract classes can be created manually or auto generated using the [@methodus/contracts](https://github.com/nodulusteam/tools/methodus-contracts) package.

## Index

### Enumerations

* [MethodType](enums/methodtype.md)
* [Verbs](enums/verbs.md)

### Classes

* [BaseTestContract](classes/basetestcontract.md)
* [ExtendTestContract](classes/extendtestcontract.md)
* [Injector](classes/injector.md)
* [MethodDescriptor](classes/methoddescriptor.md)
* [MethodError](classes/methoderror.md)
* [MethodResult](classes/methodresult.md)
* [MethodusClass](classes/methodusclass.md)
* [P](classes/p.md)
* [ParamsMap](classes/paramsmap.md)
* [Prototyped](classes/prototyped.md)
* [Rest](classes/rest.md)
* [Socket](classes/socket.md)
* [SocketController](classes/socketcontroller.md)
* [TestContract](classes/testcontract.md)

### Variables

* [dd](#dd)
* [ee](#ee)
* [ss](#ss)

### Functions

* [Inject](#inject)
* [Injectable](#injectable)
* [Method](#method)
* [MethodConfig](#methodconfig)
* [MethodConfigBase](#methodconfigbase)
* [Singleton](#singleton)

---

## Variables

<a id="dd"></a>

### `<Const>` dd

**● dd**: *[TestContract](classes/testcontract.md)* =  new TestContract()

*Defined in [src/tests/contracts/index.ts:4](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/tests/contracts/index.ts#L4)*

___
<a id="ee"></a>

### `<Const>` ee

**● ee**: *[ExtendTestContract](classes/extendtestcontract.md)* =  new ExtendTestContract(dd)

*Defined in [src/tests/contracts/index.ts:5](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/tests/contracts/index.ts#L5)*

___
<a id="ss"></a>

### `<Const>` ss

**● ss**: *[SocketController](classes/socketcontroller.md)* =  new SocketController()

*Defined in [src/tests/contracts/index.ts:6](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/tests/contracts/index.ts#L6)*

___

## Functions

<a id="inject"></a>

###  Inject

▸ **Inject**(name?: *`string`*): `any`

*Defined in [src/lib/di/inject.ts:4](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/di/inject.ts#L4)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `string` |

**Returns:** `any`

___
<a id="injectable"></a>

###  Injectable

▸ **Injectable**(nameToken?: *`string`*): `DecoratorFactory`

*Defined in [src/lib/di/injectable.ts:4](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/di/injectable.ts#L4)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` nameToken | `string` |

**Returns:** `DecoratorFactory`

___
<a id="method"></a>

###  Method

▸ **Method**(verb: *[Verbs](enums/verbs.md)*, route: *`string`*): `(Anonymous function)`

*Defined in [src/lib/decorators/method.ts:12](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/decorators/method.ts#L12)*

the @Method decorator registers the model with the odm @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | [Verbs](enums/verbs.md) |
| route | `string` |

**Returns:** `(Anonymous function)`

___
<a id="methodconfig"></a>

###  MethodConfig

▸ **MethodConfig**(name: *`string`*, middlewares?: *`any`[]*, baseRoute?: *`string`*): `(Anonymous function)`

*Defined in [src/lib/decorators/method-config.ts:7](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/decorators/method-config.ts#L7)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` middlewares | `any`[] |
| `Optional` baseRoute | `string` |

**Returns:** `(Anonymous function)`

___
<a id="methodconfigbase"></a>

###  MethodConfigBase

▸ **MethodConfigBase**(name: *`string`*): `(Anonymous function)`

*Defined in [src/lib/decorators/method-config-base.ts:7](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/decorators/method-config-base.ts#L7)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `(Anonymous function)`

___
<a id="singleton"></a>

###  Singleton

▸ **Singleton**(): `DecoratorFactory`

*Defined in [src/lib/di/singleton.ts:4](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-web/src/lib/di/singleton.ts#L4)*

**Returns:** `DecoratorFactory`

___

