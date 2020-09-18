[Methodus - framework commons](modules/framework/common/README.md) › [Globals](globals.md)

# Methodus - framework commons

## Index

### Namespaces

* [Mapping](modules/framework/common/modules/mapping.md)
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

* [logger](#const-logger)

### Functions

* [validate](#validate)

## Type aliases

###  ClassArgs

Ƭ **ClassArgs**: *object*

Defined in modules/framework/framework-commons/dist/interfaces/index.d.ts:16

#### Type declaration:

* **new __type**(...`args`: any[]): *any*

___

###  ClassNoArgs

Ƭ **ClassNoArgs**: *object*

Defined in modules/framework/framework-commons/dist/interfaces/index.d.ts:13

#### Type declaration:

* **new __type**(): *any*

___

###  ClassRef

Ƭ **ClassRef**: *[ClassNoArgs](#classnoargs) | [ClassArgs](globals.md

Defined in modules/framework/framework-commons/dist/interfaces/index.d.ts:19

___

###  Dictionary

Ƭ **Dictionary**: *object*

Defined in modules/framework/framework-commons/dist/interfaces/index.d.ts:10

#### Type declaration:

* \[ **key**: *string*\]: T

___

###  ModuleTargetClass

Ƭ **ModuleTargetClass**: *object*

Defined in modules/framework/framework-commons/dist/interfaces/index.d.ts:20

#### Type declaration:

* **new __type**(): *any*

* **declarations**? : *[ClassRef](#classref)[]*

* **exports**? : *[ClassRef](#classref)[]*

* **imports**? : *[ClassRef](#classref)[]*

* **providers**? : *[ClassRef](#classref)[]*

## Variables

### `Const` logger

• **logger**: *Logger‹›* = new Logger('general')

Defined in modules/framework/framework-commons/dist/log/logger.d.ts:13

*Defined in [modules/framework/framework-commons/src/log/logger.ts:48](#L48)*

## Functions

###  validate

▸ **validate**(`args`: any[]): *Promise‹boolean | string | string[]›*

Defined in modules/framework/framework-commons/dist/response/validate.d.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`args` | any[] |

**Returns:** *Promise‹boolean | string | string[]›*
