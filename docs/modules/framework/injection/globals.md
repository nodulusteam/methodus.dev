[Methodus - framework injection](README.md) › [Globals](globals.md)

# Methodus - framework injection

## Index

### Namespaces

* [injection](modules/injection.md)

### Enumerations

* [RegistrationTypes](enums/registrationtypes.md)

### Classes

* [ClassA](classes/classa.md)
* [ClassB](classes/classb.md)
* [InjectorType](classes/injectortype.md)
* [Main](classes/main.md)

### Variables

* [ANNOTATIONS](globals.md#const-annotations)
* [Injector](globals.md#const-injector)
* [RegExInsideParentheses](globals.md#const-regexinsideparentheses)
* [RegExParenthesesAndSpaces](globals.md#const-regexparenthesesandspaces)

### Functions

* [GetArgumentNames](globals.md#const-getargumentnames)
* [Inject](globals.md#inject)
* [Injectable](globals.md#injectable)
* [Singleton](globals.md#singleton)
* [getConstructorArgumentsNames](globals.md#getconstructorargumentsnames)

## Variables

### `Const` ANNOTATIONS

• **ANNOTATIONS**: *"__annotations__"* = "__annotations__"

*Defined in [src/decorators/singleton.ts:4](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-injection/src/decorators/singleton.ts#L4)*

___

### `Const` Injector

• **Injector**: *[InjectorType](classes/injectortype.md)*

Defined in lib/injector/index.d.ts:17

___

### `Const` RegExInsideParentheses

• **RegExInsideParentheses**: *RegExp‹›* = /[(][^)]*[)]/

*Defined in [src/decorators/inject.ts:35](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-injection/src/decorators/inject.ts#L35)*

___

### `Const` RegExParenthesesAndSpaces

• **RegExParenthesesAndSpaces**: *RegExp‹›* = /[()\s]/g

*Defined in [src/decorators/inject.ts:36](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-injection/src/decorators/inject.ts#L36)*

## Functions

### `Const` GetArgumentNames

▸ **GetArgumentNames**(`functionString`: any): *string[]*

*Defined in [src/decorators/inject.ts:37](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-injection/src/decorators/inject.ts#L37)*

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

*Defined in [src/decorators/inject.ts:29](https://github.com/nodulusteam/methodus.dev/blob/0650919/modules/framework/framework-injection/src/decorators/inject.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`constructor` | any |
`index` | number |

**Returns:** *any*
