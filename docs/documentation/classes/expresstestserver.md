[A Methodus guide](../README.md) > [ExpressTestServer](../classes/expresstestserver.md)

# Class: ExpressTestServer

## Hierarchy

↳  [ConfiguredServer](configuredserver.md)

↳  [ConfiguredServer](configuredserver.md)

 `ConfiguredServer`

 `ConfiguredServer`

**↳ ExpressTestServer**

## Index

### Constructors

* [constructor](expresstestserver.md#constructor)

### Properties

* [server](expresstestserver.md#server)
* [target](expresstestserver.md#target)
* [defaultMaxListeners](expresstestserver.md#defaultmaxlisteners)

### Methods

* [addListener](expresstestserver.md#addlistener)
* [emit](expresstestserver.md#emit)
* [eventNames](expresstestserver.md#eventnames)
* [getMaxListeners](expresstestserver.md#getmaxlisteners)
* [init](expresstestserver.md#init)
* [kill](expresstestserver.md#kill)
* [listenerCount](expresstestserver.md#listenercount)
* [listeners](expresstestserver.md#listeners)
* [off](expresstestserver.md#off)
* [on](expresstestserver.md#on)
* [once](expresstestserver.md#once)
* [prependListener](expresstestserver.md#prependlistener)
* [prependOnceListener](expresstestserver.md#prependoncelistener)
* [rawListeners](expresstestserver.md#rawlisteners)
* [removeAllListeners](expresstestserver.md#removealllisteners)
* [removeListener](expresstestserver.md#removelistener)
* [setMaxListeners](expresstestserver.md#setmaxlisteners)
* [listenerCount](expresstestserver.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ExpressTestServer**(): [ExpressTestServer](expresstestserver.md)

⊕ **new ExpressTestServer**(): [ExpressTestServer](expresstestserver.md)

*Overrides [ConfiguredServer](configuredserver.md).[constructor](configuredserver.md#constructor)*

*Defined in lib/decorators/module/module.spec.d.ts:6*

**Returns:** [ExpressTestServer](expresstestserver.md)

*Defined in lib/di/tests/server.d.ts:6*

**Returns:** [ExpressTestServer](expresstestserver.md)

___

## Properties

<a id="server"></a>

### `<Optional>` server

**● server**: *[Server](server.md)*

*Inherited from [ConfiguredServer](configuredserver.md).[server](configuredserver.md#server)*

*Overrides [ConfiguredServer](configuredserver.md).[server](configuredserver.md#server)*

*Defined in lib/server.configured.d.ts:5*

___
<a id="target"></a>

###  target

**● target**: *`any`*

*Inherited from [ConfiguredServer](configuredserver.md).[target](configuredserver.md#target)*

*Overrides [ConfiguredServer](configuredserver.md).[target](configuredserver.md#target)*

*Defined in lib/server.configured.d.ts:6*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Overrides EventEmitter.defaultMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:18*

___

## Methods

<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.addListener*

*Overrides EventEmitter.addListener*

*Defined in node_modules/@types/node/events.d.ts:20*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

*Inherited from EventEmitter.emit*

*Overrides EventEmitter.emit*

*Defined in node_modules/@types/node/events.d.ts:32*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| `Rest` args | `any`[] |

**Returns:** `boolean`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): `Array`<`string` \| `symbol`>

*Inherited from EventEmitter.eventNames*

*Overrides EventEmitter.eventNames*

*Defined in node_modules/@types/node/events.d.ts:33*

**Returns:** `Array`<`string` \| `symbol`>

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:29*

**Returns:** `number`

___
<a id="init"></a>

###  init

▸ **init**(): `Promise`<`void`>

*Inherited from [ConfiguredServer](configuredserver.md).[init](configuredserver.md#init)*

*Overrides [ConfiguredServer](configuredserver.md).[init](configuredserver.md#init)*

*Defined in lib/server.configured.d.ts:8*

**Returns:** `Promise`<`void`>

___
<a id="kill"></a>

###  kill

▸ **kill**(): `void`

*Inherited from [ConfiguredServer](configuredserver.md).[kill](configuredserver.md#kill)*

*Overrides [ConfiguredServer](configuredserver.md).[kill](configuredserver.md#kill)*

*Defined in lib/server.configured.d.ts:9*

**Returns:** `void`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(type: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in node_modules/@types/node/events.d.ts:34*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `string` \| `symbol` |

**Returns:** `number`

___
<a id="listeners"></a>

###  listeners

▸ **listeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.listeners*

*Overrides EventEmitter.listeners*

*Defined in node_modules/@types/node/events.d.ts:30*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="off"></a>

###  off

▸ **off**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.off*

*Overrides EventEmitter.off*

*Defined in node_modules/@types/node/events.d.ts:26*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="on"></a>

###  on

▸ **on**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.on*

*Overrides EventEmitter.on*

*Defined in node_modules/@types/node/events.d.ts:21*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.once*

*Overrides EventEmitter.once*

*Defined in node_modules/@types/node/events.d.ts:22*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="prependlistener"></a>

###  prependListener

▸ **prependListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in node_modules/@types/node/events.d.ts:23*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="prependoncelistener"></a>

###  prependOnceListener

▸ **prependOnceListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in node_modules/@types/node/events.d.ts:24*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="rawlisteners"></a>

###  rawListeners

▸ **rawListeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.rawListeners*

*Overrides EventEmitter.rawListeners*

*Defined in node_modules/@types/node/events.d.ts:31*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(event?: *`string` \| `symbol`*): `this`

*Inherited from EventEmitter.removeAllListeners*

*Overrides EventEmitter.removeAllListeners*

*Defined in node_modules/@types/node/events.d.ts:27*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `string` \| `symbol` |

**Returns:** `this`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *`string` \| `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in node_modules/@types/node/events.d.ts:25*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| listener | `function` |

**Returns:** `this`

___
<a id="setmaxlisteners"></a>

###  setMaxListeners

▸ **setMaxListeners**(n: *`number`*): `this`

*Inherited from EventEmitter.setMaxListeners*

*Overrides EventEmitter.setMaxListeners*

*Defined in node_modules/@types/node/events.d.ts:28*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `this`

___
<a id="listenercount-1"></a>

### `<Static>` listenerCount

▸ **listenerCount**(emitter: *`EventEmitter`*, event: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in node_modules/@types/node/events.d.ts:17*

*__deprecated__*: since v4.0.0

**Parameters:**

| Name | Type |
| ------ | ------ |
| emitter | `EventEmitter` |
| event | `string` \| `symbol` |

**Returns:** `number`

___

