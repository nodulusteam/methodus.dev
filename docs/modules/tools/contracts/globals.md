[Methodus - tools/contracts](modules/tools/contracts/README.md) › [Globals](globals.md)

# Methodus - tools/contracts

## Index

### Classes

* [BuildOptions](modules/tools/contracts/classes/buildoptions.md)
* [Client](modules/tools/contracts/classes/client.md)
* [Common](modules/tools/contracts/classes/common.md)
* [Installer](modules/tools/contracts/classes/installer.md)
* [MethodusProject](modules/tools/contracts/classes/methodusproject.md)
* [Server](modules/tools/contracts/classes/server.md)

### Interfaces

* [BindindConfiguration](modules/tools/contracts/interfaces/bindindconfiguration.md)
* [Configuration](modules/tools/contracts/interfaces/configuration.md)
* [DeclarationConfiguration](modules/tools/contracts/interfaces/declarationconfiguration.md)
* [IncludeConfiguration](modules/tools/contracts/interfaces/includeconfiguration.md)
* [KeysConfiguration](modules/tools/contracts/interfaces/keysconfiguration.md)
* [ModelConfiguration](modules/tools/contracts/interfaces/modelconfiguration.md)

### Variables

* [Console](#const-console)
* [HEADER](#const-header)
* [PKGJSON](#const-pkgjson)
* [ROOTSRC](#const-rootsrc)
* [all](#const-all)
* [logger](#const-logger)

### Functions

* [Builder](#builder)
* [ContractsIndex](#contractsindex)
* [IncludesIndex](#includesindex)
* [ModelsIndex](#modelsindex)
* [UseCustomTemplate](#usecustomtemplate)
* [UseTemplate](#usetemplate)
* [build](#build)
* [postBuild](#postbuild)
* [singleBuild](#singlebuild)

## Variables

### `Const` Console

• **Console**: *Console* = console

*Defined in [builder-models/exportify.ts:9](#L9)*

*Defined in [build.functions.ts:9](#L9)*

___

### `Const` HEADER

• **HEADER**: *string* = `
// Methodus contract.
// Generated at: ${new Date()}
`

*Defined in [builder-models/interfaces.ts:41](#L41)*

___

### `Const` PKGJSON

• **PKGJSON**: *"package.json"* = "package.json"

*Defined in [builder-models/client.ts:7](#L7)*

*Defined in [builder-models/server.ts:8](#L8)*

___

### `Const` ROOTSRC

• **ROOTSRC**: *"src"* = "src"

*Defined in [builder-models/exportify.ts:8](#L8)*

*Defined in [builder-models/common.ts:8](#L8)*

___

### `Const` all

• **all**: *string[]* = ['grpc']

*Defined in [tests/build.test.ts:6](#L6)*

___

### `Const` logger

• **logger**: *Console* = console

*Defined in [build.ts:4](#L4)*

## Functions

###  Builder

▸ **Builder**(`options`: [BuildOptions](modules/tools/contracts/classes/buildoptions.md), `contract?`: undefined | string): *Promise‹boolean›*

*Defined in [build.functions.ts:14](#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BuildOptions](modules/tools/contracts/classes/buildoptions.md) |
`contract?` | undefined &#124; string |

**Returns:** *Promise‹boolean›*

___

###  ContractsIndex

▸ **ContractsIndex**(`buildConfiguration`: [Configuration](modules/tools/contracts/interfaces/configuration.md), `source`: string, `target`: string, `packageName`: string): *void*

*Defined in [builder-models/exportify.ts:32](#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | [Configuration](modules/tools/contracts/interfaces/configuration.md) |
`source` | string |
`target` | string |
`packageName` | string |

**Returns:** *void*

___

###  IncludesIndex

▸ **IncludesIndex**(`buildConfiguration`: [Configuration](modules/tools/contracts/interfaces/configuration.md), `source`: string, `target`: string, `packageName`: string): *void*

*Defined in [builder-models/exportify.ts:48](#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | [Configuration](modules/tools/contracts/interfaces/configuration.md) |
`source` | string |
`target` | string |
`packageName` | string |

**Returns:** *void*

___

###  ModelsIndex

▸ **ModelsIndex**(`buildConfiguration`: [Configuration](modules/tools/contracts/interfaces/configuration.md), `source`: string, `target`: string, `packageName`: string): *void*

*Defined in [builder-models/exportify.ts:11](#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | [Configuration](modules/tools/contracts/interfaces/configuration.md) |
`source` | string |
`target` | string |
`packageName` | string |

**Returns:** *void*

___

###  UseCustomTemplate

▸ **UseCustomTemplate**(`fileName`: any, `targetFileName`: any, `destFolder`: any, `replacement?`: any): *void*

*Defined in [builder-models/exportify.ts:74](#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`fileName` | any |
`targetFileName` | any |
`destFolder` | any |
`replacement?` | any |

**Returns:** *void*

___

###  UseTemplate

▸ **UseTemplate**(`fileName`: any, `targetFileName`: any, `destFolder`: any, `replacement?`: any): *void*

*Defined in [builder-models/exportify.ts:65](#L65)*

**Parameters:**

Name | Type |
------ | ------ |
`fileName` | any |
`targetFileName` | any |
`destFolder` | any |
`replacement?` | any |

**Returns:** *void*

___

###  build

▸ **build**(`buildConfiguration`: any, `checkList`: string[], `options`: [BuildOptions](modules/tools/contracts/classes/buildoptions.md)): *Promise‹boolean›*

*Defined in [build.functions.ts:100](#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | any |
`checkList` | string[] |
`options` | [BuildOptions](modules/tools/contracts/classes/buildoptions.md) |

**Returns:** *Promise‹boolean›*

___

###  postBuild

▸ **postBuild**(`destPath`: any, `checkList`: any, `builder`: any, `singleConfiguration`: any, `options`: [BuildOptions](modules/tools/contracts/classes/buildoptions.md)): *Promise‹void›*

*Defined in [build.functions.ts:87](#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`destPath` | any |
`checkList` | any |
`builder` | any |
`singleConfiguration` | any |
`options` | [BuildOptions](modules/tools/contracts/classes/buildoptions.md) |

**Returns:** *Promise‹void›*

___

###  singleBuild

▸ **singleBuild**(`configurationItem`: any, `destPath`: any, `checkList`: string[], `options`: [BuildOptions](modules/tools/contracts/classes/buildoptions.md)): *Promise‹any›*

*Defined in [build.functions.ts:44](#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`configurationItem` | any |
`destPath` | any |
`checkList` | string[] |
`options` | [BuildOptions](modules/tools/contracts/classes/buildoptions.md) |

**Returns:** *Promise‹any›*
