[A Methodus guide](modules/framework/decorators/README.md)

# A Methodus guide

## Index

### Namespaces

* [framework](modules/framework/decorators/modules/framework.md)

### Classes

* [MethodHandler](modules/framework/decorators/classes/methodhandler.md)
* [ModuleClass](modules/framework/decorators/classes/moduleclass.md)
* [Proxy](modules/framework/decorators/classes/proxy.md)
* [TestAll](modules/framework/decorators/classes/testall.md)
* [TestClass](modules/framework/decorators/classes/testclass.md)

### Variables

* [_default](modules/framework/decorators/README.md#const-_default)
* [methodMetadataKey](modules/framework/decorators/README.md#const-methodmetadatakey)

### Functions

* [Auth](modules/framework/decorators/README.md#auth)
* [ClientConfiguration](modules/framework/decorators/README.md#clientconfiguration)
* [Method](modules/framework/decorators/README.md#method)
* [MethodConfig](modules/framework/decorators/README.md#methodconfig)
* [MethodMock](modules/framework/decorators/README.md#methodmock)
* [MethodPipe](modules/framework/decorators/README.md#methodpipe)
* [Module](modules/framework/decorators/README.md#module)
* [ModuleConfiguration](modules/framework/decorators/README.md#moduleconfiguration)
* [PluginConfiguration](modules/framework/decorators/README.md#pluginconfiguration)
* [RouterConfiguration](modules/framework/decorators/README.md#routerconfiguration)
* [ServerConfiguration](modules/framework/decorators/README.md#serverconfiguration)

## Variables

### `Const` _default

• **_default**: *typeof decorators*

Defined in framework-decorators/lib/index.d.ts:20

___

### `Const` methodMetadataKey

• **methodMetadataKey**: *"methodus"* = "methodus"

*Defined in [framework-decorators/src/method/method.ts:3](modules/framework/decorators/https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-decorators/src/method/method.ts#L3)*

*Defined in [framework-decorators/src/method/method-pipe.ts:3](modules/framework/decorators/https://github.com/nodulusteam/methodus.dev/blob/9fa5503/modules/framework/framework-decorators/src/method/method-pipe.ts#L3)*

## Functions

###  Auth

▸ **Auth**(`type`: AuthType, `options?`: Dictionary | Function): *function*

Defined in framework-decorators/lib/auth/auth.d.ts:3

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

Defined in framework-decorators/lib/class/client.d.ts:3

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

Defined in framework-decorators/lib/method/method.d.ts:2

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

Defined in framework-decorators/lib/method/method-config.d.ts:2

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

Defined in framework-decorators/lib/method/method-mock.d.ts:3

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

Defined in framework-decorators/lib/method/method-pipe.d.ts:2

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

Defined in framework-decorators/lib/module/module.d.ts:3

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

Defined in framework-decorators/lib/module/module-config.d.ts:3

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

Defined in framework-decorators/lib/class/plugin.d.ts:3

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

Defined in framework-decorators/lib/class/router.d.ts:3

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

Defined in framework-decorators/lib/class/server.d.ts:3

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
