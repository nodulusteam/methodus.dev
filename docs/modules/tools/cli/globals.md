[Methodus - tools/cli](/modules/tools/cli/README.md) › [Globals](globals.md)

# Methodus - tools/cli

## Index

### Classes

* [CLI](/modules/tools/cli/classes/cli.md)

### Interfaces

* [CliOptions](/modules/tools/cli/interfaces/clioptions.md)
* [TemplateConfig](/modules/tools/cli/interfaces/templateconfig.md)
* [TemplateData](/modules/tools/cli/interfaces/templatedata.md)

### Variables

* [CHOICES](#const-choices)
* [QUESTIONS](#const-questions)
* [TEMPLATES_BASE](#const-templates_base)
* [colors](#const-colors)

### Functions

* [camelCaseToDash](#camelcasetodash)
* [createCli](#createcli)
* [createItem](#createitem)
* [findModule](#findmodule)
* [flow](#flow)
* [flowAllPaths](#flowallpaths)
* [generate](#generate)
* [getTemplateConfig](#gettemplateconfig)
* [goForQuestions](#goforquestions)
* [listModules](#listmodules)
* [listTree](#listtree)
* [patchModuleFile](#patchmodulefile)
* [render](#render)

## Variables

### `Const` CHOICES

• **CHOICES**: *string[]* = fs.readdirSync(TEMPLATES_BASE)

*Defined in [flow.ts:15](#L15)*

___

### `Const` QUESTIONS

• **QUESTIONS**: *object[]* = [
    {
        name: 'template',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES,
        when: () => !yargs.argv['template'],
    }
]

*Defined in [flow.ts:16](#L16)*

___

### `Const` TEMPLATES_BASE

• **TEMPLATES_BASE**: *string* = path.join(__dirname, '..', 'templates')

*Defined in [flow.ts:14](#L14)*

___

### `Const` colors

• **colors**: *any* = require('colors')

*Defined in [cli.ts:6](#L6)*

## Functions

###  camelCaseToDash

▸ **camelCaseToDash**(`str`: string): *string*

*Defined in [utils/template.ts:10](#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *string*

___

###  createCli

▸ **createCli**(`templateKey`: string): *[CLI](/modules/tools/cli/classes/cli.md)‹›*

*Defined in [flow.ts:183](#L183)*

**Parameters:**

Name | Type |
------ | ------ |
`templateKey` | string |

**Returns:** *[CLI](/modules/tools/cli/classes/cli.md)‹›*

___

###  createItem

▸ **createItem**(`controllerCli`: [CLI](/modules/tools/cli/classes/cli.md), `moduleFile`: string, `name`: string, `templateKey`: string): *void*

*Defined in [flow.ts:250](#L250)*

**Parameters:**

Name | Type |
------ | ------ |
`controllerCli` | [CLI](/modules/tools/cli/classes/cli.md) |
`moduleFile` | string |
`name` | string |
`templateKey` | string |

**Returns:** *void*

___

###  findModule

▸ **findModule**(`moduleName`: string, `controllerCli`: [CLI](/modules/tools/cli/classes/cli.md)): *Promise‹string›*

*Defined in [flow.ts:171](#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`moduleName` | string |
`controllerCli` | [CLI](/modules/tools/cli/classes/cli.md) |

**Returns:** *Promise‹string›*

___

###  flow

▸ **flow**(`verb`: string, `what?`: undefined | string, `name?`: undefined | string, `moduleName?`: undefined | string): *Promise‹void›*

*Defined in [flow.ts:41](#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`verb` | string |
`what?` | undefined &#124; string |
`name?` | undefined &#124; string |
`moduleName?` | undefined &#124; string |

**Returns:** *Promise‹void›*

___

###  flowAllPaths

▸ **flowAllPaths**(`verb`: string, `what?`: undefined | string, `name?`: undefined | string, `moduleName?`: undefined | string): *Promise‹void›*

*Defined in [flow.ts:27](#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`verb` | string |
`what?` | undefined &#124; string |
`name?` | undefined &#124; string |
`moduleName?` | undefined &#124; string |

**Returns:** *Promise‹void›*

___

###  generate

▸ **generate**(`templateKey`: string, `moduleFilePath`: string, `name`: string): *Promise‹void›*

*Defined in [flow.ts:160](#L160)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`templateKey` | string | - |
`moduleFilePath` | string | "" |
`name` | string | - |

**Returns:** *Promise‹void›*

___

###  getTemplateConfig

▸ **getTemplateConfig**(`templatePath`: string): *[TemplateConfig](/modules/tools/cli/interfaces/templateconfig.md)*

*Defined in [utils/template.ts:18](#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`templatePath` | string |

**Returns:** *[TemplateConfig](/modules/tools/cli/interfaces/templateconfig.md)*

___

###  goForQuestions

▸ **goForQuestions**(`answers`: any): *Promise‹void›*

*Defined in [flow.ts:117](#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`answers` | any |

**Returns:** *Promise‹void›*

___

###  listModules

▸ **listModules**(`controllerCli`: [CLI](/modules/tools/cli/classes/cli.md)): *object*

*Defined in [flow.ts:268](#L268)*

**Parameters:**

Name | Type |
------ | ------ |
`controllerCli` | [CLI](/modules/tools/cli/classes/cli.md) |

**Returns:** *object*

___

###  listTree

▸ **listTree**(): *void*

*Defined in [flow.ts:291](#L291)*

**Returns:** *void*

___

###  patchModuleFile

▸ **patchModuleFile**(`controllerCli`: [CLI](/modules/tools/cli/classes/cli.md), `moduleFilePath`: string, `name`: string, `templateKey`: string): *void*

*Defined in [flow.ts:190](#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`controllerCli` | [CLI](/modules/tools/cli/classes/cli.md) |
`moduleFilePath` | string |
`name` | string |
`templateKey` | string |

**Returns:** *void*

___

###  render

▸ **render**(`content`: string, `data`: [TemplateData](/modules/tools/cli/interfaces/templatedata.md)): *string*

*Defined in [utils/template.ts:14](#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | string |
`data` | [TemplateData](/modules/tools/cli/interfaces/templatedata.md) |

**Returns:** *string*
