[Methodus - tools/contracts](../README.md) › [Globals](/modules/tools/contracts/globals.md) › [BuildOptions](/modules/tools/contracts/buildoptions.md)

# Class: BuildOptions

## Hierarchy

* **BuildOptions**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [compilerOptions](#optional-compileroptions)
* [isClient](#isclient)
* [isMocked](#optional-ismocked)
* [isProtobuf](#optional-isprotobuf)
* [publish](#publish)
* [source](#source)
* [target](#target)
* [tsConfig](#optional-tsconfig)

## Constructors

###  constructor

\+ **new BuildOptions**(`isClient`: any, `publish`: any, `isMocked?`: any): *[BuildOptions](/modules/tools/contracts/buildoptions.md)*

*Defined in [builder-models/interfaces.ts:51](#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`isClient` | any |
`publish` | any |
`isMocked?` | any |

**Returns:** *[BuildOptions](/modules/tools/contracts/buildoptions.md)*

## Properties

### `Optional` compilerOptions

• **compilerOptions**? : *CompilerOptions*

*Defined in [builder-models/interfaces.ts:62](#L62)*

___

###  isClient

• **isClient**: *boolean*

*Defined in [builder-models/interfaces.ts:57](#L57)*

___

### `Optional` isMocked

• **isMocked**? : *undefined | false | true*

*Defined in [builder-models/interfaces.ts:59](#L59)*

___

### `Optional` isProtobuf

• **isProtobuf**? : *undefined | false | true*

*Defined in [builder-models/interfaces.ts:60](#L60)*

___

###  publish

• **publish**: *boolean*

*Defined in [builder-models/interfaces.ts:58](#L58)*

___

###  source

• **source**: *string* = ""

*Defined in [builder-models/interfaces.ts:64](#L64)*

___

###  target

• **target**: *string* = ""

*Defined in [builder-models/interfaces.ts:63](#L63)*

___

### `Optional` tsConfig

• **tsConfig**? : *undefined | string*

*Defined in [builder-models/interfaces.ts:61](#L61)*
