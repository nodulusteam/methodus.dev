[A Methodus guide](README.md)

# A Methodus guide

## Index

### Classes

* [ExpressRouter](classes/expressrouter.md)
* [ExtressTestModule](classes/extresstestmodule.md)
* [ParserResponse](classes/parserresponse.md)
* [Verbs](classes/verbs.md)

### Interfaces

* [ExpressOptions](interfaces/expressoptions.md)

### Functions

* [AuthMiddleware](README.md#authmiddleware)
* [MethodMiddleware](README.md#methodmiddleware)

### Object literals

* [Express](README.md#const-express)
* [options](README.md#const-options)

## Functions

###  AuthMiddleware

▸ **AuthMiddleware**(`req`: any, `res`: any, `next`: any): *any*

Defined in platform/platform-express/lib/tests/middlewares/auth.middleware.d.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |
`next` | any |

**Returns:** *any*

___

###  MethodMiddleware

▸ **MethodMiddleware**(`req`: any, `res`: any, `next`: any): *any*

Defined in platform/platform-express/lib/tests/middlewares/method.middleware.d.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |
`next` | any |

**Returns:** *any*

## Object literals

### `Const` Express

### ▪ **Express**: *object*

Defined in platform/platform-express/lib/index.d.ts:3

*Defined in [platform/platform-express/src/index.ts:7](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/index.ts#L7)*

###  module

• **module**: *ExpressPlugin* = ExpressPlugin

*Defined in [platform/platform-express/src/index.ts:9](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/index.ts#L9)*

###  name

• **name**: *string* = "express"

*Defined in [platform/platform-express/src/index.ts:8](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/index.ts#L8)*

###  parser

• **parser**: *RestParser* = RestParser

*Defined in [platform/platform-express/src/index.ts:11](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/index.ts#L11)*

###  response

• **response**: *RestResponse* = RestResponse

*Defined in [platform/platform-express/src/index.ts:12](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/index.ts#L12)*

###  static

• **static**: *serveStatic* = express.static

*Defined in [platform/platform-express/src/index.ts:10](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/index.ts#L10)*

___

### `Const` options

### ▪ **options**: *object*

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:12](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L12)*

###  cert

• **cert**: *Buffer‹›* = fs.readFileSync(path.join(process.cwd(), './certs/cert.txt'))

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:16](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L16)*

###  key

• **key**: *Buffer‹›* = fs.readFileSync(path.join(process.cwd(), './certs/key.txt'))

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:15](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L15)*

###  passphrase

• **passphrase**: *string* = "puravida"

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:17](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L17)*

###  port

• **port**: *string | number* = process.env.PORT || 8020

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:13](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L13)*

###  secured

• **secured**: *boolean* = true

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:14](https://github.com/nodulusteam/methodus.dev/blob/3099105/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L14)*
