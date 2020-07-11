[Methodus - framework commons](modules/framework/common/globals.md)

# Methodus - framework commons

## Index

### Namespaces

* [commons](modules/framework/common/modules/commons.md)

### Enumerations

* [AuthType](modules/framework/common/enums/authtype.md)
* [MethodType](modules/framework/common/enums/methodtype.md)
* [ServerType](modules/framework/common/enums/servertype.md)
* [TransportType](modules/framework/common/enums/transporttype.md)

### Classes

* [BaseServer](modules/framework/common/classes/baseserver.md)
* [Logger](modules/framework/common/classes/logger.md)
* [MethodError](modules/framework/common/classes/methoderror.md)
* [MethodResult](modules/framework/common/classes/methodresult.md)
* [MethodResultStatus](modules/framework/common/classes/methodresultstatus.md)
* [MethodusConfig](modules/framework/common/classes/methodusconfig.md)
* [RestLink](modules/framework/common/classes/restlink.md)
* [fp](modules/framework/common/classes/fp.md)

### Interfaces

* [EventDescriptor](modules/framework/common/interfaces/eventdescriptor.md)
* [IMethodusClassConfig](modules/framework/common/interfaces/imethodusclassconfig.md)
* [IMethodusConfig](modules/framework/common/interfaces/imethodusconfig.md)
* [IServer](modules/framework/common/interfaces/iserver.md)
* [IServerConfig](modules/framework/common/interfaces/iserverconfig.md)
* [ITransport](modules/framework/common/interfaces/itransport.md)
* [MethodDescriptor](modules/framework/common/interfaces/methoddescriptor.md)
* [MethodusParam](modules/framework/common/interfaces/methodusparam.md)
* [PluginEntry](modules/framework/common/interfaces/pluginentry.md)
* [Router](modules/framework/common/interfaces/router.md)
* [ServerDefinition](modules/framework/common/interfaces/serverdefinition.md)

### Type aliases

* [ClassArgs](#classargs)
* [ClassNoArgs](#classnoargs)
* [ClassRef](#classref)
* [Dictionary](#dictionary)
* [ModuleTargetClass](#moduletargetclass)

### Variables

* [Mapping](#const-mapping)
* [logger](#const-logger)
* [util](#const-util)

### Functions

* [Body](#body)
* [Cookies](#cookies)
* [Files](#files)
* [Headers](#headers)
* [Param](#param)
* [Query](#query)
* [Request](#request)
* [Response](#response)
* [SecurityContext](#securitycontext)
* [build](#build)
* [pushParams](#pushparams)
* [recurseODM](#recurseodm)
* [validate](#validate)

## Type aliases

###  ClassArgs

Ƭ **ClassArgs**: *object*

Defined in lib/interfaces/index.d.ts:16

#### Type declaration:

* **new __type**(...`args`: any[]): *any*

___

###  ClassNoArgs

Ƭ **ClassNoArgs**: *object*

Defined in lib/interfaces/index.d.ts:13

#### Type declaration:

* **new __type**(): *any*

___

###  ClassRef

Ƭ **ClassRef**: *[ClassNoArgs](#classnoargs) | [ClassArgs](globals.md

Defined in lib/interfaces/index.d.ts:19

___

###  Dictionary

Ƭ **Dictionary**: *object*

Defined in lib/interfaces/index.d.ts:10

#### Type declaration:

* \[ **key**: *string*\]: T

___

###  ModuleTargetClass

Ƭ **ModuleTargetClass**: *object*

Defined in lib/interfaces/index.d.ts:20

#### Type declaration:

* **new __type**(): *any*

* **declarations**? : *[ClassRef](#classref)[]*

* **exports**? : *[ClassRef](#classref)[]*

* **imports**? : *[ClassRef](#classref)[]*

* **providers**? : *[ClassRef](#classref)[]*

## Variables

### `Const` Mapping

• **Mapping**: *typeof _Mapping*

Defined in lib/index.d.ts:13

___

### `Const` logger

• **logger**: *Logger‹›* = new Logger('general')

Defined in lib/log/logger.d.ts:13

*Defined in [src/log/logger.ts:48](#L48)*

___

### `Const` util

• **util**: *[fp](modules/framework/common/classes/fp.md)*

Defined in lib/fp/index.d.ts:10

## Functions

###  Body

▸ **Body**(`name?`: undefined | string, `type?`: any): *function*

Defined in lib/param/params.d.ts:2

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

Defined in lib/param/params.d.ts:6

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

Defined in lib/param/params.d.ts:4

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

Defined in lib/param/params.d.ts:5

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

Defined in lib/param/params.d.ts:3

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

Defined in lib/param/params.d.ts:7

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

Defined in lib/param/params.d.ts:10

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

Defined in lib/param/params.d.ts:9

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

Defined in lib/param/params.d.ts:8

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

*Defined in [src/param/params.ts:49](#L49)*

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

*Defined in [src/param/params.ts:16](#L16)*

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

*Defined in [src/param/params.ts:4](#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`odm` | any |

**Returns:** *any*

___

###  validate

▸ **validate**(`args`: any[]): *Promise‹boolean | string | string[]›*

Defined in lib/response/validate.d.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`args` | any[] |

**Returns:** *Promise‹boolean | string | string[]›*
