[A Methodus guide](README.md)

# A Methodus guide

## Index

### Enumerations

* [RegistrationTypes](enums/registrationtypes.md)

### Classes

* [ClassA](classes/classa.md)
* [ClassB](classes/classb.md)
* [InjectorType](classes/injectortype.md)
* [Main](classes/main.md)

### Variables

* [ANNOTATIONS](README.md#const-annotations)
* [Injector](README.md#const-injector)
* [RegExInsideParentheses](README.md#const-regexinsideparentheses)
* [RegExParenthesesAndSpaces](README.md#const-regexparenthesesandspaces)

### Functions

* [GetArgumentNames](README.md#const-getargumentnames)
* [Inject](README.md#inject)
* [Injectable](README.md#injectable)
* [Singleton](README.md#singleton)
* [getConstructorArgumentsNames](README.md#getconstructorargumentsnames)

## Variables

### `Const` ANNOTATIONS

• **ANNOTATIONS**: *"__annotations__"* = "__annotations__"

*Defined in [src/injector/index.ts:3](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/injector/index.ts#L3)*

*Defined in [src/decorators/singleton.ts:4](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/decorators/singleton.ts#L4)*

___

### `Const` Injector

• **Injector**: *InjectorType* = new InjectorType()

Defined in lib/injector/index.d.ts:17

*Defined in [src/injector/index.ts:122](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/injector/index.ts#L122)*

___

### `Const` RegExInsideParentheses

• **RegExInsideParentheses**: *RegExp‹›* = /[(][^)]*[)]/

*Defined in [src/decorators/inject.ts:35](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/decorators/inject.ts#L35)*

___

### `Const` RegExParenthesesAndSpaces

• **RegExParenthesesAndSpaces**: *RegExp‹›* = /[()\s]/g

*Defined in [src/decorators/inject.ts:36](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/decorators/inject.ts#L36)*

## Functions

### `Const` GetArgumentNames

▸ **GetArgumentNames**(`functionString`: any): *string[]*

*Defined in [src/decorators/inject.ts:37](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/decorators/inject.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`functionString` | any |

**Returns:** *string[]*

___

###  Inject

▸ **Inject**(`name?`: undefined | string, `propertyName?`: undefined | string): *any*

Defined in lib/decorators/inject.d.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |
`propertyName?` | undefined &#124; string |

**Returns:** *any*

___

###  Injectable

▸ **Injectable**(`name?`: undefined | string): *function*

Defined in lib/decorators/injectable.d.ts:3

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`cls`: ClassRef | any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`cls` | ClassRef &#124; any |

___

###  Singleton

▸ **Singleton**(`name?`: undefined | string): *function*

Defined in lib/decorators/singleton.d.ts:3

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |

**Returns:** *function*

▸ (`cls`: ClassRef | any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`cls` | ClassRef &#124; any |

___

###  getConstructorArgumentsNames

▸ **getConstructorArgumentsNames**(`constructor`: any, `index`: number): *any*

*Defined in [src/decorators/inject.ts:29](https://github.com/nodulusteam/methodus.dev/blob/fe0d238/modules/framework-injection/src/decorators/inject.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`constructor` | any |
`index` | number |

**Returns:** *any*
