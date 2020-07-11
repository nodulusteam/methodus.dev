[Methodus - framework commons](../globals.md) › [MethodError](modules/framework/common/methoderror.md)

# Class: MethodError

## Hierarchy

* [Error](modules/framework/common/methoderror.md#static-error)

* [Error](modules/framework/common/methoderror.md#static-error)

  ↳ **MethodError**

## Index

### Constructors

* [constructor](modules/framework/common/methoderror.md#constructor)

### Properties

* [additional](modules/framework/common/methoderror.md#additional)
* [error](modules/framework/common/methoderror.md#error)
* [message](modules/framework/common/methoderror.md#message)
* [name](modules/framework/common/methoderror.md#name)
* [stack](modules/framework/common/methoderror.md#optional-stack)
* [statusCode](modules/framework/common/methoderror.md#statuscode)
* [statusText](modules/framework/common/methoderror.md#optional-statustext)
* [Error](modules/framework/common/methoderror.md#static-error)

## Constructors

###  constructor

\+ **new MethodError**(`error`: [Error](modules/framework/common/methoderror.md#static-error) | string, `statusCode?`: undefined | number, `additional?`: [Dictionary](../globals.md#dictionary)): *[MethodError](methoderror.md)*

Defined in lib/response/method.error.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`error` | [Error](modules/framework/common/methoderror.md#static-error) &#124; string |
`statusCode?` | undefined &#124; number |
`additional?` | [Dictionary](../globals.md#dictionary) |

**Returns:** *[MethodError](modules/framework/common/methoderror.md)*

## Properties

###  additional

• **additional**: *any*

Defined in lib/response/method.error.d.ts:6

*Defined in [src/response/method.error.ts:8](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/response/method.error.ts#L8)*

___

###  error

• **error**: *string*

Defined in lib/response/method.error.d.ts:3

*Defined in [src/response/method.error.ts:5](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/response/method.error.ts#L5)*

___

###  message

• **message**: *string*

*Inherited from [MethodError](modules/framework/common/methoderror.md).[message](methoderror.md#message)*

*Overrides [MethodError](modules/framework/common/methoderror.md).[message](methoderror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [MethodError](modules/framework/common/methoderror.md).[name](methoderror.md#name)*

*Overrides [MethodError](modules/framework/common/methoderror.md).[name](methoderror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [MethodError](modules/framework/common/methoderror.md).[stack](methoderror.md#optional-stack)*

*Overrides [MethodError](modules/framework/common/methoderror.md).[stack](methoderror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

###  statusCode

• **statusCode**: *number*

Defined in lib/response/method.error.d.ts:4

*Defined in [src/response/method.error.ts:6](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/response/method.error.ts#L6)*

___

### `Optional` statusText

• **statusText**? : *undefined | string*

Defined in lib/response/method.error.d.ts:5

*Defined in [src/response/method.error.ts:7](modules/framework/common/https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-commons/src/response/method.error.ts#L7)*

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
