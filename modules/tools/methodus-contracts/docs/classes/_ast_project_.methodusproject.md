[@methodus/contracts](../README.md) › [Globals](../globals.md) › ["ast/project"](../modules/_ast_project_.md) › [MethodusProject](_ast_project_.methodusproject.md)

# Class: MethodusProject

## Hierarchy

* **MethodusProject**

## Index

### Constructors

* [constructor](_ast_project_.methodusproject.md#constructor)

### Properties

* [packageName](_ast_project_.methodusproject.md#packagename)
* [project](_ast_project_.methodusproject.md#project)
* [projectPath](_ast_project_.methodusproject.md#projectpath)
* [sourceFiles](_ast_project_.methodusproject.md#sourcefiles)

### Methods

* [Exportify](_ast_project_.methodusproject.md#exportify)
* [HandleClientMethods](_ast_project_.methodusproject.md#handleclientmethods)
* [HandleConstructor](_ast_project_.methodusproject.md#handleconstructor)
* [HandleIncludeFile](_ast_project_.methodusproject.md#handleincludefile)
* [HandleMethod](_ast_project_.methodusproject.md#handlemethod)
* [HandleMethodReturn](_ast_project_.methodusproject.md#handlemethodreturn)
* [ProxifyFromFile](_ast_project_.methodusproject.md#proxifyfromfile)
* [ProxifyFromModel](_ast_project_.methodusproject.md#proxifyfrommodel)

## Constructors

###  constructor

\+ **new MethodusProject**(`projectPath`: string, `packageName`: string, `options`: [BuildOptions](_builder_models_interfaces_.buildoptions.md)): *[MethodusProject](_ast_project_.methodusproject.md)*

*Defined in [ast/project.ts:11](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`projectPath` | string |
`packageName` | string |
`options` | [BuildOptions](_builder_models_interfaces_.buildoptions.md) |

**Returns:** *[MethodusProject](_ast_project_.methodusproject.md)*

## Properties

###  packageName

• **packageName**: *string*

*Defined in [ast/project.ts:13](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L13)*

___

###  project

• **project**: *Project*

*Defined in [ast/project.ts:10](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L10)*

___

###  projectPath

• **projectPath**: *string*

*Defined in [ast/project.ts:13](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L13)*

___

###  sourceFiles

• **sourceFiles**: *any[]*

*Defined in [ast/project.ts:11](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L11)*

## Methods

###  Exportify

▸ **Exportify**(`buildConfiguration`: [Configuration](../interfaces/_builder_models_interfaces_.configuration.md), `target`: string, `packageName`: string, `options`: [BuildOptions](_builder_models_interfaces_.buildoptions.md)): *SourceFile*

*Defined in [ast/project.ts:364](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L364)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | [Configuration](../interfaces/_builder_models_interfaces_.configuration.md) |
`target` | string |
`packageName` | string |
`options` | [BuildOptions](_builder_models_interfaces_.buildoptions.md) |

**Returns:** *SourceFile*

___

###  HandleClientMethods

▸ **HandleClientMethods**(`method`: any, `options`: [BuildOptions](_builder_models_interfaces_.buildoptions.md)): *undefined | false | true*

*Defined in [ast/project.ts:112](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | any |
`options` | [BuildOptions](_builder_models_interfaces_.buildoptions.md) |

**Returns:** *undefined | false | true*

___

###  HandleConstructor

▸ **HandleConstructor**(`constructor`: any, `options`: [BuildOptions](_builder_models_interfaces_.buildoptions.md)): *void*

*Defined in [ast/project.ts:43](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`constructor` | any |
`options` | [BuildOptions](_builder_models_interfaces_.buildoptions.md) |

**Returns:** *void*

___

###  HandleIncludeFile

▸ **HandleIncludeFile**(`sourceFile`: any, `dirName`: string, `options`: [BuildOptions](_builder_models_interfaces_.buildoptions.md)): *void*

*Defined in [ast/project.ts:179](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L179)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceFile` | any |
`dirName` | string |
`options` | [BuildOptions](_builder_models_interfaces_.buildoptions.md) |

**Returns:** *void*

___

###  HandleMethod

▸ **HandleMethod**(`method`: MethodDeclaration, `options`: [BuildOptions](_builder_models_interfaces_.buildoptions.md)): *void*

*Defined in [ast/project.ts:57](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | MethodDeclaration |
`options` | [BuildOptions](_builder_models_interfaces_.buildoptions.md) |

**Returns:** *void*

___

###  HandleMethodReturn

▸ **HandleMethodReturn**(`method`: MethodDeclaration, `options`: [BuildOptions](_builder_models_interfaces_.buildoptions.md)): *void*

*Defined in [ast/project.ts:138](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | MethodDeclaration |
`options` | [BuildOptions](_builder_models_interfaces_.buildoptions.md) |

**Returns:** *void*

___

###  ProxifyFromFile

▸ **ProxifyFromFile**(`file`: any, `dirName`: string, `contractKey`: any, `options`: [BuildOptions](_builder_models_interfaces_.buildoptions.md)): *void*

*Defined in [ast/project.ts:201](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L201)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |
`dirName` | string |
`contractKey` | any |
`options` | [BuildOptions](_builder_models_interfaces_.buildoptions.md) |

**Returns:** *void*

___

###  ProxifyFromModel

▸ **ProxifyFromModel**(`file`: any, `dirName`: string, `modelKey`: string): *void*

*Defined in [ast/project.ts:309](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/ast/project.ts#L309)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |
`dirName` | string |
`modelKey` | string |

**Returns:** *void*
