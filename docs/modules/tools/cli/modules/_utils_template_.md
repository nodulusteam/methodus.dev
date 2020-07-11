[A Methodus guide](../README.md) › ["utils/template"](_utils_template_.md)

# Module: "utils/template"

## Index

### Interfaces

* [CliOptions](../interfaces/_utils_template_.clioptions.md)
* [TemplateConfig](../interfaces/_utils_template_.templateconfig.md)
* [TemplateData](../interfaces/_utils_template_.templatedata.md)

### Functions

* [camelCaseToDash](_utils_template_.md#camelcasetodash)
* [getTemplateConfig](_utils_template_.md#gettemplateconfig)
* [render](_utils_template_.md#render)

## Functions

###  camelCaseToDash

▸ **camelCaseToDash**(`str`: string): *string*

*Defined in [utils/template.ts:10](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/tools/methodus-cli/src/utils/template.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *string*

___

###  getTemplateConfig

▸ **getTemplateConfig**(`templatePath`: string): *[TemplateConfig](../interfaces/_utils_template_.templateconfig.md)*

*Defined in [utils/template.ts:18](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/tools/methodus-cli/src/utils/template.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`templatePath` | string |

**Returns:** *[TemplateConfig](../interfaces/_utils_template_.templateconfig.md)*

___

###  render

▸ **render**(`content`: string, `data`: [TemplateData](../interfaces/_utils_template_.templatedata.md)): *string*

*Defined in [utils/template.ts:14](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/tools/methodus-cli/src/utils/template.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | string |
`data` | [TemplateData](../interfaces/_utils_template_.templatedata.md) |

**Returns:** *string*
