[@methodus/contracts](../README.md) › [Globals](../globals.md) › ["build.functions"](_build_functions_.md)

# Module: "build.functions"

## Index

### Variables

* [Console](_build_functions_.md#const-console)

### Functions

* [Builder](_build_functions_.md#builder)
* [build](_build_functions_.md#build)
* [postBuild](_build_functions_.md#postbuild)
* [singleBuild](_build_functions_.md#singlebuild)

## Variables

### `Const` Console

• **Console**: *[Console](_builder_models_exportify_.md#const-console)* = console

*Defined in [build.functions.ts:9](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/build.functions.ts#L9)*

## Functions

###  Builder

▸ **Builder**(`options`: [BuildOptions](../classes/_builder_models_interfaces_.buildoptions.md), `contract?`: undefined | string): *Promise‹boolean›*

*Defined in [build.functions.ts:14](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/build.functions.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [BuildOptions](../classes/_builder_models_interfaces_.buildoptions.md) |
`contract?` | undefined &#124; string |

**Returns:** *Promise‹boolean›*

___

###  build

▸ **build**(`buildConfiguration`: any, `checkList`: string[], `options`: [BuildOptions](../classes/_builder_models_interfaces_.buildoptions.md)): *Promise‹boolean›*

*Defined in [build.functions.ts:100](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/build.functions.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`buildConfiguration` | any |
`checkList` | string[] |
`options` | [BuildOptions](../classes/_builder_models_interfaces_.buildoptions.md) |

**Returns:** *Promise‹boolean›*

___

###  postBuild

▸ **postBuild**(`destPath`: any, `checkList`: any, `builder`: any, `singleConfiguration`: any, `options`: [BuildOptions](../classes/_builder_models_interfaces_.buildoptions.md)): *Promise‹void›*

*Defined in [build.functions.ts:87](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/build.functions.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`destPath` | any |
`checkList` | any |
`builder` | any |
`singleConfiguration` | any |
`options` | [BuildOptions](../classes/_builder_models_interfaces_.buildoptions.md) |

**Returns:** *Promise‹void›*

___

###  singleBuild

▸ **singleBuild**(`configurationItem`: any, `destPath`: any, `checkList`: string[], `options`: [BuildOptions](../classes/_builder_models_interfaces_.buildoptions.md)): *Promise‹any›*

*Defined in [build.functions.ts:44](https://github.com/nodulusteam/methodus.dev/blob/4276858/modules/tools/methodus-contracts/src/build.functions.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`configurationItem` | any |
`destPath` | any |
`checkList` | string[] |
`options` | [BuildOptions](../classes/_builder_models_interfaces_.buildoptions.md) |

**Returns:** *Promise‹any›*
