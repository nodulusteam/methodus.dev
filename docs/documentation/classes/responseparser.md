[A Methodus guide](../README.md) > [ResponseParser](../classes/responseparser.md)

# Class: ResponseParser

this function parses values from the request object into the function args @param {any} args - the arguments sent to the original function. @param {\[string\]} paramsMap - express route string.

## Hierarchy

**ResponseParser**

## Index

### Constructors

* [constructor](responseparser.md#constructor)

### Properties

* [parser](responseparser.md#parser)
* [response](responseparser.md#response)

### Methods

* [parse](responseparser.md#parse)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ResponseParser**(type: *[ServerType](../enums/servertype.md)*): [ResponseParser](responseparser.md)

*Defined in build/rest.d.ts:12*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [ServerType](../enums/servertype.md) |

**Returns:** [ResponseParser](responseparser.md)

___

## Properties

<a id="parser"></a>

###  parser

**● parser**: *`any`*

*Defined in build/rest.d.ts:11*
*Defined in [src/rest.ts:22](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/rest.ts#L22)*

___
<a id="response"></a>

###  response

**● response**: *`any`*

*Defined in build/rest.d.ts:12*
*Defined in [src/rest.ts:23](https://github.com/nodulusteam/methodus.dev/blob/9494017/src/rest.ts#L23)*

___

## Methods

<a id="parse"></a>

###  parse

▸ **parse**(args: *`any`*, paramsMap: *`any`*, functionArgs: *`any`*): `any`

*Defined in build/rest.d.ts:14*

**Parameters:**

| Name | Type |
| ------ | ------ |
| args | `any` |
| paramsMap | `any` |
| functionArgs | `any` |

**Returns:** `any`

___

