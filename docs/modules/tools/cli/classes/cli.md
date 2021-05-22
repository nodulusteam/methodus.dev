[Methodus - tools/cli](../README.md) › [Globals](/modules/tools/cli/globals.md) › [CLI](/modules/tools/cli/cli.md)

# Class: CLI

## Hierarchy

* **CLI**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [CURR_DIR](#curr_dir)
* [SKIP_FILES](#skip_files)
* [projectName](#projectname)
* [templateConfig](#templateconfig)

### Methods

* [createDirectoryContents](#createdirectorycontents)
* [createProject](#createproject)
* [generate](#generate)
* [isNode](#isnode)
* [postProcess](#postprocess)
* [postProcessNode](#postprocessnode)
* [showMessage](#showmessage)

## Constructors

###  constructor

\+ **new CLI**(`projectName`: string, `templateConfig`: [TemplateConfig](../interfaces/templateconfig.md)): *[CLI](/modules/tools/cli/cli.md)*

*Defined in [cli.ts:17](#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`projectName` | string |
`templateConfig` | [TemplateConfig](../interfaces/templateconfig.md) |

**Returns:** *[CLI](/modules/tools/cli/cli.md)*

## Properties

###  CURR_DIR

• **CURR_DIR**: *string*

*Defined in [cli.ts:16](#L16)*

___

###  SKIP_FILES

• **SKIP_FILES**: *string[]* = ['node_modules', '.template.js']

*Defined in [cli.ts:17](#L17)*

___

###  projectName

• **projectName**: *string*

*Defined in [cli.ts:22](#L22)*

___

###  templateConfig

• **templateConfig**: *[TemplateConfig](../interfaces/templateconfig.md)*

*Defined in [cli.ts:23](#L23)*

## Methods

###  createDirectoryContents

▸ **createDirectoryContents**(`outputPath`: string, `templatePath`: string, `projectName`: string, `config`: [TemplateConfig](../interfaces/templateconfig.md)): *void*

*Defined in [cli.ts:122](#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`outputPath` | string |
`templatePath` | string |
`projectName` | string |
`config` | [TemplateConfig](../interfaces/templateconfig.md) |

**Returns:** *void*

___

###  createProject

▸ **createProject**(`projectPath`: string): *boolean*

*Defined in [cli.ts:75](#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`projectPath` | string |

**Returns:** *boolean*

___

###  generate

▸ **generate**(`projectChoice`: string, `templatePath`: string, `moduleFilePath?`: undefined | string): *void*

*Defined in [cli.ts:27](#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`projectChoice` | string |
`templatePath` | string |
`moduleFilePath?` | undefined &#124; string |

**Returns:** *void*

___

###  isNode

▸ **isNode**(`options`: [CliOptions](../interfaces/clioptions.md)): *boolean*

*Defined in [cli.ts:118](#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CliOptions](../interfaces/clioptions.md) |

**Returns:** *boolean*

___

###  postProcess

▸ **postProcess**(`options`: [CliOptions](../interfaces/clioptions.md)): *boolean*

*Defined in [cli.ts:87](#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CliOptions](../interfaces/clioptions.md) |

**Returns:** *boolean*

___

###  postProcessNode

▸ **postProcessNode**(`options`: [CliOptions](../interfaces/clioptions.md)): *boolean*

*Defined in [cli.ts:94](#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CliOptions](../interfaces/clioptions.md) |

**Returns:** *boolean*

___

###  showMessage

▸ **showMessage**(`options`: [CliOptions](../interfaces/clioptions.md)): *void*

*Defined in [cli.ts:58](#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CliOptions](../interfaces/clioptions.md) |

**Returns:** *void*
