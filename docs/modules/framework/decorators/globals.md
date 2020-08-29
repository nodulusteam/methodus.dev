[Methodus - framework decorators](modules/framework/decorators/README.md) › [Globals](globals.md)

# Methodus - framework decorators

## Index

### Namespaces

* [framework](modules/framework/decorators/modules/framework.md)

### Classes

* [MethodHandler](modules/framework/decorators/classes/methodhandler.md)
* [ModuleClass](modules/framework/decorators/classes/moduleclass.md)
* [Proxy](modules/framework/decorators/classes/proxy.md)
* [TestClass](modules/framework/decorators/classes/testclass.md)

### Variables

* [_default](#const-_default)
* [methodMetadataKey](#const-methodmetadatakey)

### Functions

* [Auth](#auth)
* [ClientConfiguration](#clientconfiguration)
* [Method](#method)
* [MethodConfig](#methodconfig)
* [MethodMock](#methodmock)
* [MethodPipe](#methodpipe)
* [Module](#module)
* [ModuleConfiguration](#moduleconfiguration)
* [PluginConfiguration](#pluginconfiguration)
* [RouterConfiguration](#routerconfiguration)
* [ServerConfiguration](#serverconfiguration)

## Variables

### `Const` _default

• **_default**: *typeof decorators*

Defined in dist/index.d.ts:20

___

### `Const` methodMetadataKey

• **methodMetadataKey**: *"methodus"* = "methodus"

*Defined in [src/method/method.ts:3](#L3)*

*Defined in [src/method/method-pipe.ts:3](#L3)*

## Functions

###  Auth

▸ **Auth**(`type`: AuthType, `options?`: Dictionary | Function): *function*

Defined in dist/auth/auth.d.ts:3

the AuthConfig decorator registers the controller as a router

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | AuthType | the type of authentication to apply. |
`options?` | Dictionary &#124; Function | the auth options  |

**Returns:** *function*

▸ (`target`: ClassRef): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | ClassRef |

___

###  ClientConfiguration

▸ **ClientConfiguration**(`controller`: ClassRef, `transportType`: any, `resolver?`: Function | string): *function*

Defined in dist/class/client.d.ts:3

the MethodConfig decorator registers the controller as a router

**Parameters:**

Name | Type |
------ | ------ |
`controller` | ClassRef |
`transportType` | any |
`resolver?` | Function &#124; string |

**Returns:** *function*

▸ (`target`: ClassRef): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | ClassRef |

___

###  Method

▸ **Method**(`verb?`: undefined | string, `route?`: undefined | string, `middlewares?`: Function[]): *function*

Defined in dist/method/method.d.ts:2

the @Method decorator registers route listeners

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`verb?` | undefined &#124; string | the HTTP verb for the route. |
`route?` | undefined &#124; string | express route string. |
`middlewares?` | Function[] | an array of middlewares to apply to this function}  |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string, `descriptor`: TypedPropertyDescriptor‹any›): *any*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string |
`descriptor` | TypedPropertyDescriptor‹any› |

___

###  MethodConfig

▸ **MethodConfig**(`name`: string, `middlewares?`: any[], `prefix?`: undefined | string): *function*

Defined in dist/method/method-config.d.ts:2

the MethodConfig decorator registers the controller as a router

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | the identifier of the controller in the resolver. |
`middlewares?` | any[] | an array of middlewares to apply to this controller}  |
`prefix?` | undefined &#124; string | - |

**Returns:** *function*

▸ (`target`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |

___

###  MethodMock

▸ **MethodMock**(`mockedResult`: any): *function*

Defined in dist/method/method-mock.d.ts:3

the @MethodMock decorator

**Parameters:**

Name | Type |
------ | ------ |
`mockedResult` | any |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string, `descriptor`: TypedPropertyDescriptor‹any›): *TypedPropertyDescriptor‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string |
`descriptor` | TypedPropertyDescriptor‹any› |

___

###  MethodPipe

▸ **MethodPipe**(`verb?`: undefined | string, `route?`: undefined | string, `middlewares?`: Function[]): *function*

Defined in dist/method/method-pipe.d.ts:2

the @Method decorator registers route listeners

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`verb?` | undefined &#124; string | the HTTP verb for the route. |
`route?` | undefined &#124; string | express route string. |
`middlewares?` | Function[] | an array of middlewares to apply to this function}  |

**Returns:** *function*

▸ (`target`: any, `propertyKey`: string, `descriptor`: TypedPropertyDescriptor‹any›): *any*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string |
`descriptor` | TypedPropertyDescriptor‹any› |

___

###  Module

▸ **Module**(`name?`: undefined | string): *function*

Defined in dist/module/module.d.ts:3

the Module decorator registers a module

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`target`: ModuleTargetClass): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | ModuleTargetClass |

___

###  ModuleConfiguration

▸ **ModuleConfiguration**(`moduleClass`: ClassRef): *function*

Defined in dist/module/module-config.d.ts:3

the ModuleConfiguration decorator registers a module to the main server instance

**Parameters:**

Name | Type |
------ | ------ |
`moduleClass` | ClassRef |

**Returns:** *function*

▸ (`target`: ClassRef): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | ClassRef |

___

###  PluginConfiguration

▸ **PluginConfiguration**(`name`: string, `options?`: Dictionary): *function*

Defined in dist/class/plugin.d.ts:3

the MethodConfig decorator registers the controller as a router

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | the identifier of the controller in the resolver. |
`options?` | Dictionary | - |

**Returns:** *function*

▸ (`target`: ClassRef): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | ClassRef |

___

###  RouterConfiguration

▸ **RouterConfiguration**(`controller`: ClassRef | null, `serverType`: ServerType | string | ServerDefinition | any): *function*

Defined in dist/class/router.d.ts:3

the RouterConfiguration decorator registers the controller as a router

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`controller` | ClassRef &#124; null | a controller class using the @MethodConfig decorator. |
`serverType` | ServerType &#124; string &#124; ServerDefinition &#124; any | the name of the server  |

**Returns:** *function*

▸ (`target`: ClassRef): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | ClassRef |

___

###  ServerConfiguration

▸ **ServerConfiguration**(`serverType`: ServerType | string | ServerDefinition | any, `options?`: Dictionary): *function*

Defined in dist/class/server.d.ts:3

the ServerConfiguration decorator registers a server

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serverType` | ServerType &#124; string &#124; ServerDefinition &#124; any | the type for the server. |
`options?` | Dictionary | any options that needs to be passed to the server object  |

**Returns:** *function*

▸ (`target`: ClassRef): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | ClassRef |
