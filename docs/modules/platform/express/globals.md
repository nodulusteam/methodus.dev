[Methodus - platform/express](README.md) › [Globals](globals.md)

# Methodus - platform/express

## Index

### Classes

* [ExpressRouter](classes/expressrouter.md)
* [ExpressTestServer](classes/expresstestserver.md)
* [ExtressTestModule](classes/extresstestmodule.md)
* [ParserResponse](classes/parserresponse.md)
* [Verbs](classes/verbs.md)

### Interfaces

* [ExpressOptions](interfaces/expressoptions.md)

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

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:14](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L14)*

*Defined in [platform/platform-express/src/tests/servers/express.server.http.ts:9](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.http.ts#L9)*

###  cert

• **cert**: *Buffer‹›* = fs.readFileSync(path.join(process.cwd(), './certs/cert.txt'))

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:18](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L18)*

###  cors

• **cors**: *false* = false

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:22](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L22)*

*Defined in [platform/platform-express/src/tests/servers/express.server.http.ts:13](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.http.ts#L13)*

###  fileMaxSize

• **fileMaxSize**: *number* = 10 * 1000

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:21](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L21)*

###  fileUpload

• **fileUpload**: *true* = true

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:20](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L20)*

*Defined in [platform/platform-express/src/tests/servers/express.server.http.ts:12](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.http.ts#L12)*

###  key

• **key**: *Buffer‹›* = fs.readFileSync(path.join(process.cwd(), './certs/key.txt'))

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:17](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L17)*

###  passphrase

• **passphrase**: *string* = "puravida"

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:19](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L19)*

###  port

• **port**: *string | number* = process.env.PORT || 8030

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:15](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L15)*

*Defined in [platform/platform-express/src/tests/servers/express.server.http.ts:10](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.http.ts#L10)*

###  secured

• **secured**: *false* = false

*Defined in [platform/platform-express/src/tests/servers/express.server.https.ts:16](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.https.ts#L16)*

*Defined in [platform/platform-express/src/tests/servers/express.server.http.ts:11](https://github.com/nodulusteam/methodus.dev/blob/a3e1495/modules/platform/platform-express/src/tests/servers/express.server.http.ts#L11)*
