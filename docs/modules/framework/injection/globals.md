[Methodus - framework injection](modules/framework/injection/README.md) › [Globals](globals.md)

# Methodus - framework injection

## Index

### Namespaces

* [injection](modules/framework/injection/modules/injection.md)

### Enumerations

* [RegistrationTypes](modules/framework/injection/enums/registrationtypes.md)

### Classes

* [ClassA](modules/framework/injection/classes/classa.md)
* [ClassB](modules/framework/injection/classes/classb.md)
* [InjectorType](modules/framework/injection/classes/injectortype.md)
* [Main](modules/framework/injection/classes/main.md)

### Variables

* [ANNOTATIONS](#const-annotations)
* [Injector](#const-injector)
* [RegExInsideParentheses](#const-regexinsideparentheses)
* [RegExParenthesesAndSpaces](#const-regexparenthesesandspaces)

### Functions

* [GetArgumentNames](#const-getargumentnames)
* [Inject](#inject)
* [Injectable](#injectable)
* [Singleton](#singleton)
* [getConstructorArgumentsNames](#getconstructorargumentsnames)

## Variables

### `Const` ANNOTATIONS

• **ANNOTATIONS**: *"__annotations__"* = "__annotations__"

*Defined in [src/decorators/singleton.ts:4](#L4)*

___

### `Const` Injector

• **Injector**: *[InjectorType](modules/framework/injection/classes/injectortype.md)*

Defined in dist/injector/index.d.ts:17

___

### `Const` RegExInsideParentheses

• **RegExInsideParentheses**: *RegExp‹›* = /[(][^)]*[)]/

*Defined in [src/decorators/inject.ts:35](#L35)*

___

### `Const` RegExParenthesesAndSpaces

• **RegExParenthesesAndSpaces**: *RegExp‹›* = /[()\s]/g

*Defined in [src/decorators/inject.ts:36](#L36)*

## Functions

### `Const` GetArgumentNames

▸ **GetArgumentNames**(`functionString`: any): *string[]*

*Defined in [src/decorators/inject.ts:37](#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`functionString` | any |

**Returns:** *string[]*

___

###  Inject

▸ **Inject**(`name?`: undefined | string, `propertyName?`: undefined | string): *any*

Defined in dist/decorators/inject.d.ts:1

**Parameters:**

Name | Type |
------ | ------ |
`name?` | undefined &#124; string |
`propertyName?` | undefined &#124; string |

**Returns:** *any*

___

###  Injectable

▸ **Injectable**(`name?`: undefined | string): *function*

Defined in dist/decorators/injectable.d.ts:3

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

Defined in dist/decorators/singleton.d.ts:3

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

*Defined in [src/decorators/inject.ts:29](#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`constructor` | any |
`index` | number |

**Returns:** *any*
