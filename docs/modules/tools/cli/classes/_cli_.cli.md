[A Methodus guide](../README.md) › ["cli"](../modules/_cli_.md) › [CLI](_cli_.cli.md)

# Class: CLI

## Hierarchy

* **CLI**

## Index

### Constructors

* [constructor](_cli_.cli.md#constructor)

### Properties

* [CURR_DIR](_cli_.cli.md#curr_dir)
* [SKIP_FILES](_cli_.cli.md#skip_files)
* [projectName](_cli_.cli.md#projectname)
* [templateConfig](_cli_.cli.md#templateconfig)

### Methods

* [createDirectoryContents](_cli_.cli.md#createdirectorycontents)
* [createProject](_cli_.cli.md#createproject)
* [generate](_cli_.cli.md#generate)
* [isNode](_cli_.cli.md#isnode)
* [postProcess](_cli_.cli.md#postprocess)
* [postProcessNode](_cli_.cli.md#postprocessnode)
* [showMessage](_cli_.cli.md#showmessage)

## Constructors

###  constructor

\+ **new CLI**(`projectName`: string, `templateConfig`: [TemplateConfig](../interfaces/_utils_template_.templateconfig.md)): *[CLI](_cli_.cli.md)*

*Defined in [cli.ts:17](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`projectName` | string |
`templateConfig` | [TemplateConfig](../interfaces/_utils_template_.templateconfig.md) |

**Returns:** *[CLI](_cli_.cli.md)*

## Properties

###  CURR_DIR

• **CURR_DIR**: *string*

*Defined in [cli.ts:16](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L16)*

___

###  SKIP_FILES

• **SKIP_FILES**: *string[]* = ['node_modules', '.template.js']

*Defined in [cli.ts:17](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L17)*

___

###  projectName

• **projectName**: *string*

*Defined in [cli.ts:22](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L22)*

___

###  templateConfig

• **templateConfig**: *[TemplateConfig](../interfaces/_utils_template_.templateconfig.md)*

*Defined in [cli.ts:23](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L23)*

## Methods

###  createDirectoryContents

▸ **createDirectoryContents**(`outputPath`: string, `templatePath`: string, `projectName`: string, `config`: [TemplateConfig](../interfaces/_utils_template_.templateconfig.md)): *void*

*Defined in [cli.ts:123](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`outputPath` | string |
`templatePath` | string |
`projectName` | string |
`config` | [TemplateConfig](../interfaces/_utils_template_.templateconfig.md) |

**Returns:** *void*

___

###  createProject

▸ **createProject**(`projectPath`: string): *boolean*

*Defined in [cli.ts:76](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`projectPath` | string |

**Returns:** *boolean*

___

###  generate

▸ **generate**(`projectChoice`: string, `templatePath`: string, `moduleFilePath?`: undefined | string): *void*

*Defined in [cli.ts:27](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`projectChoice` | string |
`templatePath` | string |
`moduleFilePath?` | undefined &#124; string |

**Returns:** *void*

___

###  isNode

▸ **isNode**(`options`: [CliOptions](../interfaces/_utils_template_.clioptions.md)): *boolean*

*Defined in [cli.ts:119](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CliOptions](../interfaces/_utils_template_.clioptions.md) |

**Returns:** *boolean*

___

###  postProcess

▸ **postProcess**(`options`: [CliOptions](../interfaces/_utils_template_.clioptions.md)): *boolean*

*Defined in [cli.ts:88](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CliOptions](../interfaces/_utils_template_.clioptions.md) |

**Returns:** *boolean*

___

###  postProcessNode

▸ **postProcessNode**(`options`: [CliOptions](../interfaces/_utils_template_.clioptions.md)): *boolean*

*Defined in [cli.ts:95](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CliOptions](../interfaces/_utils_template_.clioptions.md) |

**Returns:** *boolean*

___

###  showMessage

▸ **showMessage**(`options`: [CliOptions](../interfaces/_utils_template_.clioptions.md)): *void*

*Defined in [cli.ts:59](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/tools/methodus-cli/src/cli.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [CliOptions](../interfaces/_utils_template_.clioptions.md) |

**Returns:** *void*
