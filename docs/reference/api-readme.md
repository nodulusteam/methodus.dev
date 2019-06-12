

### Enumerations

* [MethodType](api-enums-methodtype.md)
* [ServerType](api-enums-servertype.md)
* [TransportType](api-enums-transporttype.md)

### Classes

* [BaseServer](api-classes-baseserver.md)
* [BuiltInServers](api-classes-builtinservers.md)
* [BuiltInTransports](api-classes-builtintransports.md)
* [ClientContainer](api-classes-clientcontainer.md)
* [ConfiguredServer](api-classes-configuredserver.md)
* [EmitterPlugin](api-classes-emitterplugin.md)
* [Express](api-classes-express.md)
* [ExpressRouter](api-classes-expressrouter.md)
* [FP](api-classes-fp.md)
* [MethodError](api-classes-methoderror.md)
* [MethodResult](api-classes-methodresult.md)
* [MethodResultStatus](api-classes-methodresultstatus.md)
* [MethodusClassConfig](api-classes-methodusclassconfig.md)
* [MethodusClientConfig](api-classes-methodusclientconfig.md)
* [MethodusConfig](api-classes-methodusconfig.md)
* [Mocker](api-classes-mocker.md)
* [ParserResponse](api-classes-parserresponse.md)
* [PluginLoader](api-classes-pluginloader.md)
* [Proxy](api-classes-proxy.md)
* [Request](api-classes-request.md)
* [RestParser](api-classes-restparser.md)
* [RestResponse](api-classes-restresponse.md)
* [Server](api-classes-server.md)
* [ServerConfig](api-classes-serverconfig.md)
* [ServerContainer](api-classes-servercontainer.md)
* [Servers](api-classes-servers.md)
* [ServersList](api-classes-serverslist.md)
* [SocketIO](api-classes-socketio.md)
* [SocketIORouter](api-classes-socketiorouter.md)
* [Verbs](api-classes-verbs.md)
* [_ClassContainer](api-classes-classcontainer.md)

### Interfaces

* [EventDescriptor](api-interfaces-eventdescriptor.md)
* [IApp](api-interfaces-iapp.md)
* [IMethodusClassConfig](api-interfaces-imethodusclassconfig.md)
* [IMethodusConfig](api-interfaces-imethodusconfig.md)
* [IServer](api-interfaces-iserver.md)
* [IServerConfig](api-interfaces-iserverconfig.md)
* [ITransport](api-interfaces-itransport.md)
* [MethodDescriptor](api-interfaces-methoddescriptor.md)
* [PluginEntry](api-interfaces-pluginentry.md)
* [Router](api-interfaces-router.md)

### Variables

* [ClassContainer](#classcontainer)
* [logger](#logger)
* [name](#name)
* [resultEmitter](#resultemitter)

### Functions

* [Body](#body)
* [ClientConfiguration](#clientconfiguration)
* [Cookies](#cookies)
* [Files](#files)
* [Headers](#headers)
* [Method](#method)
* [MethodConfig](#methodconfig)
* [MethodConfigBase](#methodconfigbase)
* [MethodConfigExtend](#methodconfigextend)
* [MethodMock](#methodmock)
* [MethodPipe](#methodpipe)
* [Param](#param)
* [PluginConfiguration](#pluginconfiguration)
* [Query](#query)
* [Response](#response)
* [RouterConfiguration](#routerconfiguration)
* [SecurityContext](#securitycontext)
* [ServerConfiguration](#serverconfiguration)
* [generateUuid](#generateuuid)
* [register](#register)
* [send](#send)

---

# Variables

<a id="classcontainer"></a>

## `<Const>` ClassContainer

**● ClassContainer**: *`any`* =  (global as any).METHODUS_CONTAINER

*Defined in [class-container.ts:21](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/class-container.ts#L21)*

___
<a id="logger"></a>

## `<Const>` logger

**● logger**: *`Logger`* =  new Logger('methodus.log', 'methodus')

*Defined in [log/index.ts:4](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/log/index.ts#L4)*

___
<a id="name"></a>

## `<Const>` name

**● name**: *`string`* = "Http/Rest"

*Defined in [transports/rest/index.ts:4](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/transports/rest/index.ts#L4)*

___
<a id="resultemitter"></a>

## `<Const>` resultEmitter

**● resultEmitter**: *`EventEmitter`* =  new EventEmitter()

*Defined in [tests/servers/emitter.plugin.ts:12](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/tests/servers/emitter.plugin.ts#L12)*

___

# Functions

<a id="body"></a>

##  Body

▸ **Body**(name?: *`undefined` \| `string`*, type?: *`any`*): `(Anonymous function)`

*Defined in [params.ts:32](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/params.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |
| `Optional` type | `any` |

**Returns:** `(Anonymous function)`

___
<a id="clientconfiguration"></a>

##  ClientConfiguration

▸ **ClientConfiguration**(controller: *`any`*, transportType: *`any`*, resolver?: *`any`*): `(Anonymous function)`

*Defined in [decorators/client.ts:7](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/decorators/client.ts#L7)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| controller | `any` |
| transportType | `any` |
| `Optional` resolver | `any` |

**Returns:** `(Anonymous function)`

___
<a id="cookies"></a>

##  Cookies

▸ **Cookies**(name?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [params.ts:48](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/params.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="files"></a>

##  Files

▸ **Files**(name?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [params.ts:40](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/params.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="headers"></a>

##  Headers

▸ **Headers**(name?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [params.ts:44](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/params.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="method"></a>

##  Method

▸ **Method**(verb: *`Verbs`*, route: *`string`*, middlewares?: *`any`[]*): `(Anonymous function)`

*Defined in [method/method.ts:16](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/method/method.ts#L16)*

the @Method decorator registers the model with the odm @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | `Verbs` |
| route | `string` |
| `Optional` middlewares | `any`[] |

**Returns:** `(Anonymous function)`

___
<a id="methodconfig"></a>

##  MethodConfig

▸ **MethodConfig**(name: *`string`*, middlewares?: *`any`[]*, repository?: *`any`*): `(Anonymous function)`

*Defined in [method/method-config.ts:8](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/method/method-config.ts#L8)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` middlewares | `any`[] |
| `Optional` repository | `any` |

**Returns:** `(Anonymous function)`

___
<a id="methodconfigbase"></a>

##  MethodConfigBase

▸ **MethodConfigBase**(name: *`string`*, middlewares?: *`any`[]*, repository?: *`any`*): `(Anonymous function)`

*Defined in [method/method-config-base.ts:10](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/method/method-config-base.ts#L10)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` middlewares | `any`[] |
| `Optional` repository | `any` |

**Returns:** `(Anonymous function)`

___
<a id="methodconfigextend"></a>

##  MethodConfigExtend

▸ **MethodConfigExtend**(extendTarget: *`any`*, name?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [method/method-config-extend.ts:8](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/method/method-config-extend.ts#L8)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| extendTarget | `any` |
| `Optional` name | `undefined` \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="methodmock"></a>

##  MethodMock

▸ **MethodMock**(mockedResult: *`any`*): `(Anonymous function)`

*Defined in [method/method-mock.ts:9](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/method/method-mock.ts#L9)*

the @MethodMock decorator registers the model with the odm @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| mockedResult | `any` |

**Returns:** `(Anonymous function)`

___
<a id="methodpipe"></a>

##  MethodPipe

▸ **MethodPipe**(verb: *`Verbs`*, route: *`string`*, middlewares?: *`any`[]*): `(Anonymous function)`

*Defined in [method/method-pipe.ts:15](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/method/method-pipe.ts#L15)*

the @Method decorator registers the model with the odm @param {Verbs} verb - the HTTP verb for the route. @param {string} route - express route string. @param {Function\[\]} middlewares - an array of middlewares to apply to this function}

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | `Verbs` |
| route | `string` |
| `Optional` middlewares | `any`[] |

**Returns:** `(Anonymous function)`

___
<a id="param"></a>

##  Param

▸ **Param**(name?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [params.ts:36](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/params.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="pluginconfiguration"></a>

##  PluginConfiguration

▸ **PluginConfiguration**(name: *`string`*, options?: *`any`*): `(Anonymous function)`

*Defined in [decorators/plugin.ts:7](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/decorators/plugin.ts#L7)*

the MethodConfig decorator registers the controller as a router @param {string} name - the identifier of the controller in the resolver. @param {Function\[\]} middlewares - an array of middlewares to apply to this controller}

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` options | `any` |

**Returns:** `(Anonymous function)`

___
<a id="query"></a>

##  Query

▸ **Query**(name?: *`undefined` \| `string`*, type?: *`any`*, defaultValue?: *`any`*): `(Anonymous function)`

*Defined in [params.ts:52](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/params.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |
| `Optional` type | `any` |
| `Optional` defaultValue | `any` |

**Returns:** `(Anonymous function)`

___
<a id="response"></a>

##  Response

▸ **Response**(name?: *`undefined` \| `string`*): `(Anonymous function)`

*Defined in [params.ts:60](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/params.ts#L60)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="routerconfiguration"></a>

##  RouterConfiguration

▸ **RouterConfiguration**(controller: *`any`*, serverType: *[ServerType](api-enums-servertype.md) \| `string`*): `(Anonymous function)`

*Defined in [decorators/router.ts:8](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/decorators/router.ts#L8)*

the RouterConfiguration decorator registers the controller as a router @param {type} controller - a controller class using the @MethodConfig decorator. @param {string} serverType - the name of the server

**Parameters:**

| Name | Type |
| ------ | ------ |
| controller | `any` |
| serverType | [ServerType](api-enums-servertype.md) \| `string` |

**Returns:** `(Anonymous function)`

___
<a id="securitycontext"></a>

##  SecurityContext

▸ **SecurityContext**(name?: *`undefined` \| `string`*, type?: *`any`*): `(Anonymous function)`

*Defined in [params.ts:56](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/params.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` \| `string` |
| `Optional` type | `any` |

**Returns:** `(Anonymous function)`

___
<a id="serverconfiguration"></a>

##  ServerConfiguration

▸ **ServerConfiguration**(serverType: *`any`*, options?: *`any`*): `(Anonymous function)`

*Defined in [decorators/server.ts:8](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/decorators/server.ts#L8)*

the ServerConfiguration decorator registers a server @param {string} serverType - the type for the server. @param {object} options - any options that needs to be passed to the server object

**Parameters:**

| Name | Type |
| ------ | ------ |
| serverType | `any` |
| `Optional` options | `any` |

**Returns:** `(Anonymous function)`

___
<a id="generateuuid"></a>

##  generateUuid

▸ **generateUuid**(): `string`

*Defined in [response/index.ts:4](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/response/index.ts#L4)*

**Returns:** `string`

___
<a id="register"></a>

##  register

▸ **register**(server: *`any`*, parentServer: *`any`*): `void`

*Defined in [servers/express/index.ts:12](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/servers/express/index.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| server | `any` |
| parentServer | `any` |

**Returns:** `void`

___
<a id="send"></a>

##  send

▸ **send**(methodus: *`any`*, functionArgs: *`any`*, paramsMap: *`any`*, securityContext: *`any`*): `Promise`<`any`>

*Defined in [transports/rest/index.ts:5](https://github.com/nodulusteam/methodus.dev/blob/c73cdac/src/transports/rest/index.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| methodus | `any` |
| functionArgs | `any` |
| paramsMap | `any` |
| securityContext | `any` |

**Returns:** `Promise`<`any`>

___

