[@methodus/server](../README.md) › [Globals](../globals.md) › ["method/method-pipe"](_method_method_pipe_.md)

# Module: "method/method-pipe"

## Index

### Functions

* [verbBasedMethod](_method_method_pipe_.md#verbbasedmethod)

## Functions

###  verbBasedMethod

▸ **verbBasedMethod**(`target`: any, `propertyKey`: string, `descriptor`: TypedPropertyDescriptor‹any›, `verb?`: undefined | string, `route?`: undefined | string, `middlewares?`: Function[]): *TypedPropertyDescriptor‹any›*

*Defined in [src/method/method-pipe.ts:14](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/platform/server/src/method/method-pipe.ts#L14)*

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
