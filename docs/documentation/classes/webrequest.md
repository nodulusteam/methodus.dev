[A Methodus guide](../README.md) > [WebRequest](../classes/webrequest.md)

# Class: WebRequest

## Hierarchy

**WebRequest**

## Index

### Constructors

* [constructor](webrequest.md#constructor)

### Properties

* [auth](webrequest.md#auth)
* [authOptions](webrequest.md#authoptions)

### Methods

* [promiseToTry](webrequest.md#promisetotry)
* [sendRequest](webrequest.md#sendrequest)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new WebRequest**(auth?: *[AuthType](../enums/authtype.md)*, authOptions?: *`any`*): [WebRequest](webrequest.md)

*Defined in build/transports/rest/web-request.d.ts:7*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` auth | [AuthType](../enums/authtype.md) |
| `Optional` authOptions | `any` |

**Returns:** [WebRequest](webrequest.md)

___

## Properties

<a id="auth"></a>

###  auth

**● auth**: *[AuthType](../enums/authtype.md)*

*Defined in build/transports/rest/web-request.d.ts:6*

___
<a id="authoptions"></a>

###  authOptions

**● authOptions**: *`any`*

*Defined in build/transports/rest/web-request.d.ts:7*

___

## Methods

<a id="promisetotry"></a>

###  promiseToTry

▸ **promiseToTry**(requestOptions: *`any`*): `request.RequestPromise`<`any`>

*Defined in build/transports/rest/web-request.d.ts:10*

**Parameters:**

| Name | Type |
| ------ | ------ |
| requestOptions | `any` |

**Returns:** `request.RequestPromise`<`any`>

___
<a id="sendrequest"></a>

###  sendRequest

▸ **sendRequest**(verb: *`Verbs`*, uri: *`string`*, params: *`any`[]*, paramsMap: *`any`[]*, securityContext?: *`any`*): `request.RequestPromise`<`any`>

*Defined in build/transports/rest/web-request.d.ts:9*

**Parameters:**

| Name | Type |
| ------ | ------ |
| verb | `Verbs` |
| uri | `string` |
| params | `any`[] |
| paramsMap | `any`[] |
| `Optional` securityContext | `any` |

**Returns:** `request.RequestPromise`<`any`>

___

