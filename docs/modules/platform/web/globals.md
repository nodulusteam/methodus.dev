[Web platform components](README.md) › [Globals](globals.md)

# Web platform components

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

* [ANNOTATIONS](globals.md#const-annotations)
* [RegExInsideParentheses](globals.md#const-regexinsideparentheses)
* [RegExParenthesesAndSpaces](globals.md#const-regexparenthesesandspaces)
* [socket](globals.md#let-socket)

### Functions

* [GetArgumentNames](globals.md#const-getargumentnames)
* [Inject](globals.md#inject)
* [Injectable](globals.md#injectable)
* [Method](globals.md#method)
* [MethodConfig](globals.md#methodconfig)
* [MethodConfigBase](globals.md#methodconfigbase)
* [Singleton](globals.md#singleton)
* [build](globals.md#build)
* [getConstructorArgumentsNames](globals.md#getconstructorargumentsnames)
* [pushParams](globals.md#pushparams)

## Variables

### `Const` ANNOTATIONS

• **ANNOTATIONS**: *"__annotations__"* = "__annotations__"

*Defined in [modules/platform/platform-web/src/lib/di/injector.ts:2](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/injector.ts#L2)*

*Defined in [modules/platform/platform-web/src/lib/di/singleton.ts:2](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/singleton.ts#L2)*

___

### `Const` RegExInsideParentheses

• **RegExInsideParentheses**: *RegExp‹›* = /[(][^)]*[)]/

*Defined in [modules/platform/platform-web/src/lib/di/inject.ts:18](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/inject.ts#L18)*

___

### `Const` RegExParenthesesAndSpaces

• **RegExParenthesesAndSpaces**: *RegExp‹›* = /[()\s]/g

*Defined in [modules/platform/platform-web/src/lib/di/inject.ts:19](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/inject.ts#L19)*

___

### `Let` socket

• **socket**: *any* = null

*Defined in [modules/platform/platform-web/src/lib/transports/socket.ts:2](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/transports/socket.ts#L2)*

## Functions

### `Const` GetArgumentNames

▸ **GetArgumentNames**(`functionString`: any): *string[]*

*Defined in [modules/platform/platform-web/src/lib/di/inject.ts:20](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/inject.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`functionString` | any |

**Returns:** *string[]*

___

###  Inject

▸ **Inject**(`name?`: string): *any*

*Defined in [modules/platform/platform-web/src/lib/di/inject.ts:4](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/inject.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

**Returns:** *any*

___

###  Injectable

▸ **Injectable**(`nameToken?`: string): *DecoratorFactory*

*Defined in [modules/platform/platform-web/src/lib/di/injectable.ts:4](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/injectable.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`nameToken?` | string |

**Returns:** *DecoratorFactory*

___

###  Method

▸ **Method**(`verb`: [Verbs](enums/verbs.md), `route`: string): *(Anonymous function)*

*Defined in [modules/platform/platform-web/src/lib/decorators/method.ts:12](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/decorators/method.ts#L12)*

the @Method decorator registers the model with the odm

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`verb` | [Verbs](enums/verbs.md) | the HTTP verb for the route. |
`route` | string | express route string. |

**Returns:** *(Anonymous function)*

___

###  MethodConfig

▸ **MethodConfig**(`name`: string, `middlewares?`: any[], `baseRoute?`: string): *(Anonymous function)*

*Defined in [modules/platform/platform-web/src/lib/decorators/method-config.ts:7](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/decorators/method-config.ts#L7)*

the MethodConfig decorator registers the controller as a router

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | the identifier of the controller in the resolver. |
`middlewares?` | any[] | an array of middlewares to apply to this controller}  |
`baseRoute?` | string | - |

**Returns:** *(Anonymous function)*

___

###  MethodConfigBase

▸ **MethodConfigBase**(`name`: string): *(Anonymous function)*

*Defined in [modules/platform/platform-web/src/lib/decorators/method-config-base.ts:7](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/decorators/method-config-base.ts#L7)*

the MethodConfig decorator registers the controller as a router

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | the identifier of the controller in the resolver. |

**Returns:** *(Anonymous function)*

___

###  Singleton

▸ **Singleton**(): *DecoratorFactory*

*Defined in [modules/platform/platform-web/src/lib/di/singleton.ts:4](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/singleton.ts#L4)*

**Returns:** *DecoratorFactory*

___

###  build

▸ **build**(`from`: string, `name?`: string, `type?`: any): *(Anonymous function)*

*Defined in [modules/platform/platform-web/src/lib/decorators/params.ts:17](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/decorators/params.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`name?` | string |
`type?` | any |

**Returns:** *(Anonymous function)*

___

###  getConstructorArgumentsNames

▸ **getConstructorArgumentsNames**(`constructor`: any, `index`: number): *any*

*Defined in [modules/platform/platform-web/src/lib/di/inject.ts:12](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/di/inject.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`constructor` | any |
`index` | number |

**Returns:** *any*

___

###  pushParams

▸ **pushParams**(`target`: [MethodusClass](classes/methodusclass.md), `propertyKey`: string, `param`: [ParamsMap](classes/paramsmap.md)): *void*

*Defined in [modules/platform/platform-web/src/lib/decorators/params.ts:4](https://github.com/nodulusteam/methodus.dev/blob/8d1d711/modules/platform/platform-web/src/lib/decorators/params.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | [MethodusClass](classes/methodusclass.md) |
`propertyKey` | string |
`param` | [ParamsMap](classes/paramsmap.md) |

**Returns:** *void*
