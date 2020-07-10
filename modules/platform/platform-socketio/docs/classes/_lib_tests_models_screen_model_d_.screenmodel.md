[A Methodus guide](../README.md) › ["lib/tests/models/screen.model.d"](../modules/_lib_tests_models_screen_model_d_.md) › [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md)

# Class: ScreenModel

## Hierarchy

* Repo‹[ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md)›

  ↳ **ScreenModel**

## Index

### Constructors

* [constructor](_lib_tests_models_screen_model_d_.screenmodel.md#constructor)

### Properties

* [Date](_lib_tests_models_screen_model_d_.screenmodel.md#optional-date)
* [Name](_lib_tests_models_screen_model_d_.screenmodel.md#optional-name)
* [Type](_lib_tests_models_screen_model_d_.screenmodel.md#optional-type)

### Methods

* [find](_lib_tests_models_screen_model_d_.screenmodel.md#find)
* [insert](_lib_tests_models_screen_model_d_.screenmodel.md#insert)
* [save](_lib_tests_models_screen_model_d_.screenmodel.md#save)
* [createCollection](_lib_tests_models_screen_model_d_.screenmodel.md#static-createcollection)
* [delete](_lib_tests_models_screen_model_d_.screenmodel.md#static-delete)
* [find](_lib_tests_models_screen_model_d_.screenmodel.md#static-find)
* [get](_lib_tests_models_screen_model_d_.screenmodel.md#static-get)
* [insert](_lib_tests_models_screen_model_d_.screenmodel.md#static-insert)
* [query](_lib_tests_models_screen_model_d_.screenmodel.md#static-query)
* [save](_lib_tests_models_screen_model_d_.screenmodel.md#static-save)
* [update](_lib_tests_models_screen_model_d_.screenmodel.md#static-update)
* [updateMany](_lib_tests_models_screen_model_d_.screenmodel.md#static-updatemany)

## Constructors

###  constructor

\+ **new ScreenModel**(): *[ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md)*

*Overrides void*

Defined in modules/platform/platform-socketio/lib/tests/models/screen.model.d.ts:5

**Returns:** *[ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md)*

## Properties

### `Optional` Date

• **Date**? : *[Date](_lib_tests_models_screen_model_d_.screenmodel.md#optional-date)*

Defined in modules/platform/platform-socketio/lib/tests/models/screen.model.d.ts:5

___

### `Optional` Name

• **Name**? : *undefined | string*

Defined in modules/platform/platform-socketio/lib/tests/models/screen.model.d.ts:3

___

### `Optional` Type

• **Type**? : *undefined | string*

Defined in modules/platform/platform-socketio/lib/tests/models/screen.model.d.ts:4

## Methods

###  find

▸ **find**(`filter?`: any, `returnType?`: ReturnType): *Promise‹any›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[find](_lib_tests_models_screen_model_d_.screenmodel.md#find)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | any |
`returnType?` | ReturnType |

**Returns:** *Promise‹any›*

___

###  insert

▸ **insert**(): *Promise‹[ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md)›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[insert](_lib_tests_models_screen_model_d_.screenmodel.md#static-insert)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:32

**Returns:** *Promise‹[ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md)›*

___

###  save

▸ **save**(): *Promise‹[ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md)›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[save](_lib_tests_models_screen_model_d_.screenmodel.md#static-save)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:26

**Returns:** *Promise‹[ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md)›*

___

### `Static` createCollection

▸ **createCollection**(`db`: any, `collName`: string, `validator`: any): *Promise‹void›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[createCollection](_lib_tests_models_screen_model_d_.screenmodel.md#static-createcollection)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:45

**Parameters:**

Name | Type |
------ | ------ |
`db` | any |
`collName` | string |
`validator` | any |

**Returns:** *Promise‹void›*

___

### `Static` delete

▸ **delete**‹**T**›(`filter`: any, `model?`: T, `justOne?`: undefined | false | true): *Promise‹any›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[delete](_lib_tests_models_screen_model_d_.screenmodel.md#static-delete)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:40

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`model?` | T |
`justOne?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹any›*

___

### `Static` find

▸ **find**(`filter?`: any, `returnType?`: ReturnType): *Promise‹any›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[find](_lib_tests_models_screen_model_d_.screenmodel.md#find)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | any |
`returnType?` | ReturnType |

**Returns:** *Promise‹any›*

___

### `Static` get

▸ **get**‹**T**›(`objectIdentifier`: string): *Promise‹T›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[get](_lib_tests_models_screen_model_d_.screenmodel.md#static-get)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:37

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`objectIdentifier` | string |

**Returns:** *Promise‹T›*

___

### `Static` insert

▸ **insert**‹**T**›(`data`: T | T[]): *Promise‹T›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[insert](_lib_tests_models_screen_model_d_.screenmodel.md#static-insert)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:31

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | T &#124; T[] | data to insert to database  |

**Returns:** *Promise‹T›*

___

### `Static` query

▸ **query**(`query`: Query, `returnType?`: ReturnType): *Promise‹any›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[query](_lib_tests_models_screen_model_d_.screenmodel.md#static-query)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`query` | Query |
`returnType?` | ReturnType |

**Returns:** *Promise‹any›*

___

### `Static` save

▸ **save**‹**T**›(`data`: object): *Promise‹T›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[save](_lib_tests_models_screen_model_d_.screenmodel.md#static-save)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:25

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | object | data to insert to database,  |

**Returns:** *Promise‹T›*

___

### `Static` update

▸ **update**‹**T**›(`filter`: any, `dataToUpdate`: T, `upsert?`: undefined | false | true, `replace?`: undefined | false | true): *Promise‹T›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[update](_lib_tests_models_screen_model_d_.screenmodel.md#static-update)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:38

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`dataToUpdate` | T |
`upsert?` | undefined &#124; false &#124; true |
`replace?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹T›*

___

### `Static` updateMany

▸ **updateMany**‹**T**›(`filter`: any, `updateData`: T, `upsert?`: undefined | false | true): *Promise‹UpdateWriteOpResult›*

*Inherited from [ScreenModel](_lib_tests_models_screen_model_d_.screenmodel.md).[updateMany](_lib_tests_models_screen_model_d_.screenmodel.md#static-updatemany)*

Defined in node_modules/@methodus/data/build/repo/repo.d.ts:39

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`updateData` | T |
`upsert?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹UpdateWriteOpResult›*
