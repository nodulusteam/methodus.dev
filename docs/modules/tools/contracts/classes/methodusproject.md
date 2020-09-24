[Methodus - tools/contracts](../README.md) › [Globals](../globals.md) › [MethodusProject](modules/tools/contracts/methodusproject.md)

# Class: MethodusProject

## Hierarchy

* **MethodusProject**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [packageName](#packagename)
* [project](#project)
* [projectPath](#projectpath)
* [sourceFiles](#sourcefiles)

### Methods

* [Exportify](#exportify)
* [HandleClientMethods](#handleclientmethods)
* [HandleConstructor](#handleconstructor)
* [HandleIncludeFile](#handleincludefile)
* [HandleMethod](#handlemethod)
* [HandleMethodReturn](#handlemethodreturn)
* [ProxifyFromFile](#proxifyfromfile)
* [ProxifyFromModel](#proxifyfrommodel)

## Constructors

###  constructor

\+ **new MethodusProject**(`projectPath`: string, `packageName`: string, `options`: [BuildOptions](modules/tools/contracts/buildoptions.md)): *[MethodusProject](methodusproject.md)*

*Defined in [ast/project.ts:13](#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`projectPath` | string |
`packageName` | string |
`options` | [BuildOptions](modules/tools/contracts/buildoptions.md) |

**Returns:** *[MethodusProject](modules/tools/contracts/methodusproject.md)*

## Properties

###  packageName

• **packageName**: *string*

*Defined in [ast/project.ts:15](#L15)*

___

###  project

• **project**: *Project*

*Defined in [ast/project.ts:12](#L12)*

___

###  projectPath

• **projectPath**: *string*

*Defined in [ast/project.ts:15](#L15)*

___

###  sourceFiles

• **sourceFiles**: *any[]*

*Defined in [ast/project.ts:13](#L13)*

## Methods

###  Exportify

▸ **Exportify**(`buildConfiguration`: [Configuration](../interfaces/configuration.md), `target`: string, `packageName`: string, `options`: [BuildOptions](modules/tools/contracts/buildoptions.md)): *SourceFile*

*Defined in [ast/project.ts:367](#L367)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | [Configuration](../interfaces/configuration.md) |
`target` | string |
`packageName` | string |
`options` | [BuildOptions](modules/tools/contracts/buildoptions.md) |

**Returns:** *SourceFile*

___

###  HandleClientMethods

▸ **HandleClientMethods**(`method`: any, `options`: [BuildOptions](modules/tools/contracts/buildoptions.md)): *undefined | false | true*

*Defined in [ast/project.ts:122](#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | any |
`options` | [BuildOptions](modules/tools/contracts/buildoptions.md) |

**Returns:** *undefined | false | true*

___

###  HandleConstructor

▸ **HandleConstructor**(`constructor`: any, `options`: [BuildOptions](modules/tools/contracts/buildoptions.md)): *void*

*Defined in [ast/project.ts:47](#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`constructor` | any |
`options` | [BuildOptions](modules/tools/contracts/buildoptions.md) |

**Returns:** *void*

___

###  HandleIncludeFile

▸ **HandleIncludeFile**(`sourceFile`: any, `dirName`: string, `options`: [BuildOptions](modules/tools/contracts/buildoptions.md)): *void*

*Defined in [ast/project.ts:189](#L189)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceFile` | any |
`dirName` | string |
`options` | [BuildOptions](modules/tools/contracts/buildoptions.md) |

**Returns:** *void*

___

###  HandleMethod

▸ **HandleMethod**(`method`: MethodDeclaration, `options`: [BuildOptions](modules/tools/contracts/buildoptions.md)): *void*

*Defined in [ast/project.ts:61](#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | MethodDeclaration |
`options` | [BuildOptions](modules/tools/contracts/buildoptions.md) |

**Returns:** *void*

___

###  HandleMethodReturn

▸ **HandleMethodReturn**(`method`: MethodDeclaration, `options`: [BuildOptions](modules/tools/contracts/buildoptions.md)): *void*

*Defined in [ast/project.ts:148](#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | MethodDeclaration |
`options` | [BuildOptions](modules/tools/contracts/buildoptions.md) |

**Returns:** *void*

___

###  ProxifyFromFile

▸ **ProxifyFromFile**(`file`: any, `dirName`: string, `contractKey`: any, `options`: [BuildOptions](modules/tools/contracts/buildoptions.md)): *void*

*Defined in [ast/project.ts:211](#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |
`dirName` | string |
`contractKey` | any |
`options` | [BuildOptions](modules/tools/contracts/buildoptions.md) |

**Returns:** *void*

___

###  ProxifyFromModel

▸ **ProxifyFromModel**(`file`: any, `dirName`: string, `modelKey`: string): *void*

*Defined in [ast/project.ts:311](#L311)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |
`dirName` | string |
`modelKey` | string |

**Returns:** *void*
