'use strict';

const Connection = require('./connection');

let connections = {};


export class Producer {
	constructor() {
		this.topics = {};
	}
	topics: {};
	on(eventName: string, cb: Function) {
		switch (eventName) {
			case 'ready':
				cb();
		}
	}
	send(payloads: any, cb: Function) {
		cb(null, payloads[0].messages);
	}
	createTopics(topic: string, cb: Function) {
		this.topics[topic] = cb;
	}
}

export class KeyedMessage {

}

export class Client {
	constructor() {

	}

}

export class KafkaClient {
	constructor() {

	}

	on(eventName: string, cb: Function) {
		switch (eventName) {
			case 'ready':
				cb();
		}
	}
}



