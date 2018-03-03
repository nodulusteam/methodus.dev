# `amqplib-mocks`

[![NPM Version][npm-image]][npm-url]
[![Build][ci-image]][ci-url]
[![Coverage][coverage-image]][coverage-url]

A simple mocking framework for amqplib.  Currently supports the following:
* Multiple connections
* Routing messages based on routingKey
* Retrieving any published messages on a channel
* Asserting topology
* The server remotely closing a channel

## Usage

```javascript
const amqplib = require( 'amqplib-mocks' );
const proxyquire = require( 'proxyquire' );

const server = proxyquire( './app', { amqplib } );
server.listen();
```

[npm-image]: https://badge.fury.io/js/amqplib-mocks.svg
[npm-url]: https://npmjs.org/package/amqplib-mocks
[ci-image]: https://travis-ci.org/Bunk/amqplib-mocks.svg?branch=master
[ci-url]: https://travis-ci.org/Bunk/amqplib-mocks
[coverage-image]: https://coveralls.io/repos/github/Bunk/amqplib-mocks/badge.svg
[coverage-url]: https://coveralls.io/github/Bunk/amqplib-mocks
