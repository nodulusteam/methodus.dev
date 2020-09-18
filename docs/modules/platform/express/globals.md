[Methodus - platform/express](README.md) › [Globals](globals.md)

# Methodus - platform/express

## Index

### Classes

* [ExpressRouter](classes/expressrouter.md)
* [ExpressSessionTestModule](classes/expresssessiontestmodule.md)
* [ExpressTestModule](classes/expresstestmodule.md)
* [ExpressTestServer](classes/expresstestserver.md)
* [ParserResponse](classes/parserresponse.md)
* [Verbs](classes/verbs.md)

### Interfaces

* [ExpressOptions](interfaces/expressoptions.md)
* [ExpressSessionOptions](interfaces/expresssessionoptions.md)

### Variables

* [Express](globals.md#const-express)

### Functions

* [AuthMiddleware](globals.md#authmiddleware)
* [MethodMiddleware](globals.md#methodmiddleware)

### Object literals

* [options](globals.md#const-options)

## Variables

### `Const` Express

• **Express**: *ServerDefinition*

Defined in platform/platform-express/dist/index.d.ts:3

## Functions

###  AuthMiddleware

▸ **AuthMiddleware**(`req`: any, `res`: any, `next`: any): *any*

Defined in platform/platform-express/dist/tests/middlewares/auth.middleware.d.ts:1

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

Defined in platform/platform-express/dist/tests/middlewares/method.middleware.d.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |
`next` | any |

**Returns:** *any*

## Object literals

### `Const` options

### ▪ **options**: *object*

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:14](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L14)*

*Defined in [platform/platform-express/src/tests/http/express.server.http.ts:9](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/http/express.server.http.ts#L9)*

*Defined in [platform/platform-express/src/tests/session/express.server.session.ts:8](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/session/express.server.session.ts#L8)*

###  cert

• **cert**: *Buffer‹›* = fs.readFileSync(path.join(process.cwd(), './certs/cert.txt'))

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:18](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L18)*

###  cors

• **cors**: *false* = false

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:22](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L22)*

*Defined in [platform/platform-express/src/tests/http/express.server.http.ts:13](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/http/express.server.http.ts#L13)*

*Defined in [platform/platform-express/src/tests/session/express.server.session.ts:12](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/session/express.server.session.ts#L12)*

###  fileMaxSize

• **fileMaxSize**: *number* = 10 * 1000

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:21](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L21)*

###  fileUpload

• **fileUpload**: *true* = true

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:20](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L20)*

*Defined in [platform/platform-express/src/tests/http/express.server.http.ts:12](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/http/express.server.http.ts#L12)*

*Defined in [platform/platform-express/src/tests/session/express.server.session.ts:11](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/session/express.server.session.ts#L11)*

###  key

• **key**: *Buffer‹›* = fs.readFileSync(path.join(process.cwd(), './certs/key.txt'))

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:17](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L17)*

###  passphrase

• **passphrase**: *string* = "puravida"

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:19](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L19)*

###  port

• **port**: *string | number* = process.env.PORT || 8031

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:15](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L15)*

*Defined in [platform/platform-express/src/tests/http/express.server.http.ts:10](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/http/express.server.http.ts#L10)*

*Defined in [platform/platform-express/src/tests/session/express.server.session.ts:9](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/session/express.server.session.ts#L9)*

###  secured

• **secured**: *false* = false

*Defined in [platform/platform-express/src/tests/https/express.server.https.ts:16](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/https/express.server.https.ts#L16)*

*Defined in [platform/platform-express/src/tests/http/express.server.http.ts:11](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/http/express.server.http.ts#L11)*

*Defined in [platform/platform-express/src/tests/session/express.server.session.ts:10](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/session/express.server.session.ts#L10)*

▪ **session**: *object*

*Defined in [platform/platform-express/src/tests/session/express.server.session.ts:13](https://github.com/nodulusteam/methodus.dev/blob/0787b65/modules/platform/platform-express/src/tests/session/express.server.session.ts#L13)*

* **secret**: *string* = "mySecret"

* **cookie**: *object*

  * **maxAge**: *60000* = 60000
