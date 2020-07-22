[@methodus/server](../README.md) › [Globals](../globals.md) › ["method/method"](_method_method_.md)

# Module: "method/method"

## Index

### Functions

* [handleResult](_method_method_.md#handleresult)
* [validateServerIsRunning](_method_method_.md#validateserverisrunning)
* [verbBasedMethod](_method_method_.md#verbbasedmethod)

## Functions

###  handleResult

▸ **handleResult**(`methodResult`: any): *Promise‹any›*

*Defined in [src/method/method.ts:210](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/method/method.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`methodResult` | any |

**Returns:** *Promise‹any›*

___

###  validateServerIsRunning

▸ **validateServerIsRunning**(): *void*

*Defined in [src/method/method.ts:251](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/method/method.ts#L251)*

**Returns:** *void*

___

###  verbBasedMethod

▸ **verbBasedMethod**(`target`: any, `propertyKey`: string, `descriptor`: TypedPropertyDescriptor‹any›, `verb?`: undefined | string, `route?`: undefined | string, `middlewares?`: Function[]): *TypedPropertyDescriptor‹any›*

*Defined in [src/method/method.ts:23](https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/platform/server/src/method/method.ts#L23)*

the @Method decorator registers route listeners

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | any | - |
`propertyKey` | string | - |
`descriptor` | TypedPropertyDescriptor‹any› | - |
`verb?` | undefined &#124; string | the HTTP verb for the route. |
`route?` | undefined &#124; string | express route string. |
`middlewares?` | Function[] | an array of middlewares to apply to this function}  |

**Returns:** *TypedPropertyDescriptor‹any›*
