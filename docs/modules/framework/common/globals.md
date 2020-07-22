[Methodus - framework commons](globals.md)

# Methodus - framework commons

## Index

### Namespaces

* [commons](modules/commons.md)

### Enumerations

* [AuthType](enums/authtype.md)
* [MethodType](enums/methodtype.md)
* [ServerType](enums/servertype.md)
* [TransportType](enums/transporttype.md)

### Classes

* [BaseServer](classes/baseserver.md)
* [Logger](classes/logger.md)
* [MethodError](classes/methoderror.md)
* [MethodResult](classes/methodresult.md)
* [MethodResultStatus](classes/methodresultstatus.md)
* [MethodusConfig](classes/methodusconfig.md)
* [RestLink](classes/restlink.md)
* [fp](classes/fp.md)

### Interfaces

* [EventDescriptor](interfaces/eventdescriptor.md)
* [IMethodusClassConfig](interfaces/imethodusclassconfig.md)
* [IMethodusConfig](interfaces/imethodusconfig.md)
* [IServer](interfaces/iserver.md)
* [IServerConfig](interfaces/iserverconfig.md)
* [ITransport](interfaces/itransport.md)
* [MethodDescriptor](interfaces/methoddescriptor.md)
* [MethodusParam](interfaces/methodusparam.md)
* [PluginEntry](interfaces/pluginentry.md)
* [Router](interfaces/router.md)
* [ServerDefinition](interfaces/serverdefinition.md)

### Type aliases

* [ClassArgs](globals.md#classargs)
* [ClassNoArgs](globals.md#classnoargs)
* [ClassRef](globals.md#classref)
* [Dictionary](globals.md#dictionary)
* [ModuleTargetClass](globals.md#moduletargetclass)

### Variables

* [Mapping](globals.md#const-mapping)
* [logger](globals.md#const-logger)
* [util](globals.md#const-util)

### Functions

* [Body](globals.md#body)
* [Cookies](globals.md#cookies)
* [Files](globals.md#files)
* [Headers](globals.md#headers)
* [Param](globals.md#param)
* [Query](globals.md#query)
* [Request](globals.md#request)
* [Response](globals.md#response)
* [SecurityContext](globals.md#securitycontext)
* [build](globals.md#build)
* [pushParams](globals.md#pushparams)
* [recurseODM](globals.md#recurseodm)
* [validate](globals.md#validate)

## Type aliases

###  ClassArgs

Ƭ **ClassArgs**: *object*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:16

#### Type declaration:

* **new __type**(...`args`: any[]): *any*

___

###  ClassNoArgs

Ƭ **ClassNoArgs**: *object*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:13

#### Type declaration:

* **new __type**(): *any*

___

###  ClassRef

Ƭ **ClassRef**: *[ClassNoArgs](globals.md#classnoargs) | [ClassArgs](globals.md#classargs)*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:19

___

###  Dictionary

Ƭ **Dictionary**: *object*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:10

#### Type declaration:

* \[ **key**: *string*\]: T

___

###  ModuleTargetClass

Ƭ **ModuleTargetClass**: *object*

Defined in modules/framework/framework-commons/lib/interfaces/index.d.ts:20

#### Type declaration:

* **new __type**(): *any*

* **declarations**? : *[ClassRef](globals.md#classref)[]*

* **exports**? : *[ClassRef](globals.md#classref)[]*

* **imports**? : *[ClassRef](globals.md#classref)[]*

* **providers**? : *[ClassRef](globals.md#classref)[]*

## Variables

### `Const` Mapping

• **Mapping**: *typeof _Mapping*

Defined in modules/framework/framework-commons/lib/index.d.ts:11

___

### `Const` logger

• **logger**: *Logger‹›* = new Logger('general')

Defined in modules/framework/framework-commons/lib/log/logger.d.ts:13

*Defined in [modules/framework/framework-commons/src/log/logger.ts:48](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/log/logger.ts#L48)*

___

### `Const` util

• **util**: *[fp](classes/fp.md)*

Defined in modules/framework/framework-commons/lib/fp/index.d.ts:10

## Functions

###  Body

▸ **Body**(`name?`: undefined | string, `type?`: any): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:2

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |
`type?` | any |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  Cookies

▸ **Cookies**(`name?`: undefined | string): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  Files

▸ **Files**(`name?`: undefined | string): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  Headers

▸ **Headers**(`name?`: undefined | string): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  Param

▸ **Param**(`name?`: undefined | string): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:3

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  Query

▸ **Query**(`name?`: undefined | string, `type?`: any, `defaultValue?`: any): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:7

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |
`type?` | any |
`defaultValue?` | any |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  Request

▸ **Request**(`name?`: undefined | string): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  Response

▸ **Response**(`name?`: undefined | string): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  SecurityContext

▸ **SecurityContext**(`name?`: undefined | string, `type?`: any): *function*

Defined in modules/framework/framework-commons/lib/param/params.d.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |
`type?` | any |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string | symbol, `parameterIndex`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`parameterIndex` | number |

___

###  build

▸ **build**(`from`: string, `name?`: undefined | string, `type?`: undefined | string, `defaultValue?`: any): *(Anonymous function)*

*Defined in [modules/framework/framework-commons/src/param/params.ts:49](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/param/params.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`name?` | undefined &#124; string |
`type?` | undefined &#124; string |
`defaultValue?` | any |

**Returns:** *(Anonymous function)*

___

###  pushParams

▸ **pushParams**(`target`: any, `propertyKey`: any, `param`: any): *void*

*Defined in [modules/framework/framework-commons/src/param/params.ts:16](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/param/params.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | any |
`param` | any |

**Returns:** *void*

___

###  recurseODM

▸ **recurseODM**(`odm`: any): *any*

*Defined in [modules/framework/framework-commons/src/param/params.ts:4](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-commons/src/param/params.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`odm` | any |

**Returns:** *any*

___

###  validate

▸ **validate**(`args`: any[]): *Promise‹boolean | string | string[]›*

Defined in modules/framework/framework-commons/lib/response/validate.d.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`args` | any[] |

**Returns:** *Promise‹boolean | string | string[]›*
