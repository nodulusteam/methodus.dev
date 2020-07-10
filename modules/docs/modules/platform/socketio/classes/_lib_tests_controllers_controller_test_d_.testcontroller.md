[A Methodus guide](../README.md) › ["lib/tests/controllers/controller.test.d"](../modules/_lib_tests_controllers_controller_test_d_.md) › [TestController](_lib_tests_controllers_controller_test_d_.testcontroller.md)

# Class: TestController

## Hierarchy

* **TestController**

## Index

### Methods

* [create](_lib_tests_controllers_controller_test_d_.testcontroller.md#create)
* [delete](_lib_tests_controllers_controller_test_d_.testcontroller.md#delete)
* [getByField](_lib_tests_controllers_controller_test_d_.testcontroller.md#getbyfield)
* [list](_lib_tests_controllers_controller_test_d_.testcontroller.md#list)
* [listdefaults](_lib_tests_controllers_controller_test_d_.testcontroller.md#listdefaults)
* [read](_lib_tests_controllers_controller_test_d_.testcontroller.md#read)
* [update](_lib_tests_controllers_controller_test_d_.testcontroller.md#update)

## Methods

###  create

▸ **create**(`files`: any, `cookies`: any, `name`: string): *Promise‹MethodResult‹object››*

Defined in modules/platform/platform-socketio/lib/tests/controllers/controller.test.d.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`files` | any |
`cookies` | any |
`name` | string |

**Returns:** *Promise‹MethodResult‹object››*

___

###  delete

▸ **delete**(): *MethodResult‹object›*

Defined in modules/platform/platform-socketio/lib/tests/controllers/controller.test.d.ts:11

**Returns:** *MethodResult‹object›*

___

###  getByField

▸ **getByField**(`field`: any, `value`: number): *Promise‹MethodResult‹object››*

Defined in modules/platform/platform-socketio/lib/tests/controllers/controller.test.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`field` | any |
`value` | number |

**Returns:** *Promise‹MethodResult‹object››*

___

###  list

▸ **list**(`auth?`: undefined | string, `orderBy?`: undefined | string): *Promise‹any›*

Defined in modules/platform/platform-socketio/lib/tests/controllers/controller.test.d.ts:3

**Parameters:**

Name | Type |
------ | ------ |
`auth?` | undefined &#124; string |
`orderBy?` | undefined &#124; string |

**Returns:** *Promise‹any›*

___

###  listdefaults

▸ **listdefaults**(`params`: any, `body`: any, `headers`: any, `files`: any, `cookies`: any, `query`: any, `res`: any, `req`: any, `securityContext`: any): *Promise‹any›*

Defined in modules/platform/platform-socketio/lib/tests/controllers/controller.test.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`params` | any |
`body` | any |
`headers` | any |
`files` | any |
`cookies` | any |
`query` | any |
`res` | any |
`req` | any |
`securityContext` | any |

**Returns:** *Promise‹any›*

___

###  read

▸ **read**(`playerId`: number): *Promise‹void›*

Defined in modules/platform/platform-socketio/lib/tests/controllers/controller.test.d.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`playerId` | number |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(): *Promise‹MethodResult‹object››*

Defined in modules/platform/platform-socketio/lib/tests/controllers/controller.test.d.ts:10

**Returns:** *Promise‹MethodResult‹object››*
