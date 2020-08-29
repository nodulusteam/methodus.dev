[Methodus - tools/contracts](modules/tools/contracts/README.md) › [Globals](globals.md)

# Methodus - tools/contracts

## Index

### Classes

* [BuildOptions]()
* [Client]()
* [Common]()
* [Installer]()
* [MethodusProject]()
* [Server]()

### Interfaces

* [BindindConfiguration]()
* [Configuration]()
* [DeclarationConfiguration]()
* [IncludeConfiguration]()
* [KeysConfiguration]()
* [ModelConfiguration]()

### Variables

* [Console]()
* [HEADER]()
* [PKGJSON]()
* [ROOTSRC]()
* [all]()
* [logger]()

### Functions

* [Builder]()
* [ContractsIndex]()
* [IncludesIndex]()
* [ModelsIndex]()
* [UseCustomTemplate]()
* [UseTemplate]()
* [build]()
* [postBuild]()
* [singleBuild]()

## Classes

###  BuildOptions

• **BuildOptions**:

*Defined in [builder-models/interfaces.ts:46](#L46)*

###  constructor

\+ **new BuildOptions**(`isClient`: any, `publish`: any, `isMocked?`: any): *BuildOptions*

*Defined in [builder-models/interfaces.ts:46](#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`isClient` | any |
`publish` | any |
`isMocked?` | any |

**Returns:** *BuildOptions*

###  isClient

• **isClient**: *boolean*

*Defined in [builder-models/interfaces.ts:52](#L52)*

### `Optional` isMocked

• **isMocked**? : *undefined | false | true*

*Defined in [builder-models/interfaces.ts:54](#L54)*

### `Optional` isProtobuf

• **isProtobuf**? : *undefined | false | true*

*Defined in [builder-models/interfaces.ts:55](#L55)*

###  publish

• **publish**: *boolean*

*Defined in [builder-models/interfaces.ts:53](#L53)*

___

###  Client

• **Client**:

*Defined in [builder-models/client.ts:8](#L8)*

###  constructor

\+ **new Client**(`configuration`: Configuration, `source`: string, `target`: string): *Client*

*Defined in [builder-models/client.ts:9](#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`configuration` | Configuration |
`source` | string |
`target` | string |

**Returns:** *Client*

###  Installer

• **Installer**: *Installer*

*Defined in [builder-models/client.ts:9](#L9)*

###  publish

▸ **publish**(`dest`: string): *void*

*Defined in [builder-models/client.ts:31](#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`dest` | string |

**Returns:** *void*

___

###  Common

• **Common**:

*Defined in [builder-models/common.ts:11](#L11)*

### `Static` newCommonFlow

▸ **newCommonFlow**(`configuration`: any, `packageName`: any, `target`: any, `source`: any, `options`: BuildOptions): *MethodusProject<>*

*Defined in [builder-models/common.ts:13](#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`configuration` | any |
`packageName` | any |
`target` | any |
`source` | any |
`options` | BuildOptions |

**Returns:** *MethodusProject<>*

___

###  Installer

• **Installer**:

*Defined in [builder-models/installer.ts:4](#L4)*

###  constructor

\+ **new Installer**(): *Installer*

*Defined in [builder-models/installer.ts:5](#L5)*

**Returns:** *Installer*

###  shell

• **shell**: *any*

*Defined in [builder-models/installer.ts:5](#L5)*

###  publish

▸ **publish**(`destFolder`: string): *void*

*Defined in [builder-models/installer.ts:10](#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`destFolder` | string |

**Returns:** *void*

___

###  MethodusProject

• **MethodusProject**:

*Defined in [ast/project.ts:9](#L9)*

###  constructor

\+ **new MethodusProject**(`projectPath`: string, `packageName`: string, `options`: BuildOptions): *MethodusProject*

*Defined in [ast/project.ts:11](#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`projectPath` | string |
`packageName` | string |
`options` | BuildOptions |

**Returns:** *MethodusProject*

###  packageName

• **packageName**: *string*

*Defined in [ast/project.ts:13](#L13)*

###  project

• **project**: *Project*

*Defined in [ast/project.ts:10](#L10)*

###  projectPath

• **projectPath**: *string*

*Defined in [ast/project.ts:13](#L13)*

###  sourceFiles

• **sourceFiles**: *any[]*

*Defined in [ast/project.ts:11](#L11)*

###  Exportify

▸ **Exportify**(`buildConfiguration`: Configuration, `target`: string, `packageName`: string, `options`: BuildOptions): *SourceFile*

*Defined in [ast/project.ts:364](#L364)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | Configuration |
`target` | string |
`packageName` | string |
`options` | BuildOptions |

**Returns:** *SourceFile*

###  HandleClientMethods

▸ **HandleClientMethods**(`method`: any, `options`: BuildOptions): *undefined | false | true*

*Defined in [ast/project.ts:112](#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | any |
`options` | BuildOptions |

**Returns:** *undefined | false | true*

###  HandleConstructor

▸ **HandleConstructor**(`constructor`: any, `options`: BuildOptions): *void*

*Defined in [ast/project.ts:43](#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`constructor` | any |
`options` | BuildOptions |

**Returns:** *void*

###  HandleIncludeFile

▸ **HandleIncludeFile**(`sourceFile`: any, `dirName`: string, `options`: BuildOptions): *void*

*Defined in [ast/project.ts:179](#L179)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceFile` | any |
`dirName` | string |
`options` | BuildOptions |

**Returns:** *void*

###  HandleMethod

▸ **HandleMethod**(`method`: MethodDeclaration, `options`: BuildOptions): *void*

*Defined in [ast/project.ts:57](#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | MethodDeclaration |
`options` | BuildOptions |

**Returns:** *void*

###  HandleMethodReturn

▸ **HandleMethodReturn**(`method`: MethodDeclaration, `options`: BuildOptions): *void*

*Defined in [ast/project.ts:138](#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | MethodDeclaration |
`options` | BuildOptions |

**Returns:** *void*

###  ProxifyFromFile

▸ **ProxifyFromFile**(`file`: any, `dirName`: string, `contractKey`: any, `options`: BuildOptions): *void*

*Defined in [ast/project.ts:201](#L201)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |
`dirName` | string |
`contractKey` | any |
`options` | BuildOptions |

**Returns:** *void*

###  ProxifyFromModel

▸ **ProxifyFromModel**(`file`: any, `dirName`: string, `modelKey`: string): *void*

*Defined in [ast/project.ts:309](#L309)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |
`dirName` | string |
`modelKey` | string |

**Returns:** *void*

___

###  Server

• **Server**:

*Defined in [builder-models/server.ts:10](#L10)*

###  constructor

\+ **new Server**(`configuration`: Configuration, `packageName`: string, `source`: string, `target`: string): *Server*

*Defined in [builder-models/server.ts:14](#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`configuration` | Configuration |
`packageName` | string |
`source` | string |
`target` | string |

**Returns:** *Server*

###  Installer

• **Installer**: *Installer*

*Defined in [builder-models/server.ts:12](#L12)*

### `Optional` source

• **source**? : *MethodusProject*

*Defined in [builder-models/server.ts:13](#L13)*

### `Optional` target

• **target**? : *MethodusProject*

*Defined in [builder-models/server.ts:14](#L14)*

###  publish

▸ **publish**(`dest`: any): *void*

*Defined in [builder-models/server.ts:43](#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`dest` | any |

**Returns:** *void*

## Interfaces

###  BindindConfiguration

• **BindindConfiguration**:

*Defined in [builder-models/interfaces.ts:17](#L17)*

###  path

• **path**: *string*

*Defined in [builder-models/interfaces.ts:19](#L19)*

###  server

• **server**: *string*

*Defined in [builder-models/interfaces.ts:18](#L18)*

___

###  Configuration

• **Configuration**:

*Defined in [builder-models/interfaces.ts:22](#L22)*

###  bindings

• **bindings**: *Map<string, BindindConfiguration>*

*Defined in [builder-models/interfaces.ts:34](#L34)*

###  buildPath

• **buildPath**: *string*

*Defined in [builder-models/interfaces.ts:23](#L23)*

###  contractNameClient

• **contractNameClient**: *string*

*Defined in [builder-models/interfaces.ts:27](#L27)*

###  contractNameServer

• **contractNameServer**: *string*

*Defined in [builder-models/interfaces.ts:26](#L26)*

###  contracts

• **contracts**: *Map<string, ModelConfiguration>*

*Defined in [builder-models/interfaces.ts:31](#L31)*

###  declarations

• **declarations**: *Map<string, DeclarationConfiguration>*

*Defined in [builder-models/interfaces.ts:33](#L33)*

###  dependencies

• **dependencies**: *Map<string, string>*

*Defined in [builder-models/interfaces.ts:35](#L35)*

###  includes

• **includes**: *Map<string, IncludeConfiguration>*

*Defined in [builder-models/interfaces.ts:32](#L32)*

###  models

• **models**: *Map<string, ModelConfiguration>*

*Defined in [builder-models/interfaces.ts:30](#L30)*

###  npmignore

• **npmignore**: *string*

*Defined in [builder-models/interfaces.ts:29](#L29)*

###  npmrc

• **npmrc**: *string*

*Defined in [builder-models/interfaces.ts:28](#L28)*

###  packageName

• **packageName**: *string*

*Defined in [builder-models/interfaces.ts:25](#L25)*

###  protobuf

• **protobuf**: *object*

*Defined in [builder-models/interfaces.ts:36](#L36)*

#### Type declaration:

* **buildPath**: *string*

###  srcFolder

• **srcFolder**: *string*

*Defined in [builder-models/interfaces.ts:24](#L24)*

___

###  DeclarationConfiguration

• **DeclarationConfiguration**:

*Defined in [builder-models/interfaces.ts:13](#L13)*

###  path

• **path**: *string*

*Defined in [builder-models/interfaces.ts:14](#L14)*

___

###  IncludeConfiguration

• **IncludeConfiguration**:

*Defined in [builder-models/interfaces.ts:9](#L9)*

###  path

• **path**: *string*

*Defined in [builder-models/interfaces.ts:10](#L10)*

___

###  KeysConfiguration

• **KeysConfiguration**:

*Defined in [builder-models/interfaces.ts:1](#L1)*

___

###  ModelConfiguration

• **ModelConfiguration**:

*Defined in [builder-models/interfaces.ts:5](#L5)*

###  path

• **path**: *string*

*Defined in [builder-models/interfaces.ts:6](#L6)*

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

▸ **Builder**(`options`: BuildOptions, `contract?`: undefined | string): *Promise<boolean>*

*Defined in [build.functions.ts:14](#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | BuildOptions |
`contract?` | undefined &#124; string |

**Returns:** *Promise<boolean>*

___

###  ContractsIndex

▸ **ContractsIndex**(`buildConfiguration`: Configuration, `source`: string, `target`: string, `packageName`: string): *void*

*Defined in [builder-models/exportify.ts:32](#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | Configuration |
`source` | string |
`target` | string |
`packageName` | string |

**Returns:** *void*

___

###  IncludesIndex

▸ **IncludesIndex**(`buildConfiguration`: Configuration, `source`: string, `target`: string, `packageName`: string): *void*

*Defined in [builder-models/exportify.ts:48](#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | Configuration |
`source` | string |
`target` | string |
`packageName` | string |

**Returns:** *void*

___

###  ModelsIndex

▸ **ModelsIndex**(`buildConfiguration`: Configuration, `source`: string, `target`: string, `packageName`: string): *void*

*Defined in [builder-models/exportify.ts:11](#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | Configuration |
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

▸ **build**(`buildConfiguration`: any, `checkList`: string[], `options`: BuildOptions): *Promise<boolean>*

*Defined in [build.functions.ts:100](#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | any |
`checkList` | string[] |
`options` | BuildOptions |

**Returns:** *Promise<boolean>*

___

###  postBuild

▸ **postBuild**(`destPath`: any, `checkList`: any, `builder`: any, `singleConfiguration`: any, `options`: BuildOptions): *Promise<void>*

*Defined in [build.functions.ts:87](#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`destPath` | any |
`checkList` | any |
`builder` | any |
`singleConfiguration` | any |
`options` | BuildOptions |

**Returns:** *Promise<void>*

___

###  singleBuild

▸ **singleBuild**(`configurationItem`: any, `destPath`: any, `checkList`: string[], `options`: BuildOptions): *Promise<any>*

*Defined in [build.functions.ts:44](#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`configurationItem` | any |
`destPath` | any |
`checkList` | string[] |
`options` | BuildOptions |

**Returns:** *Promise<any>*
