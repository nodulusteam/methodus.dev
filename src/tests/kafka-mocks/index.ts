
export class Producer {
	topics: {};
	constructor() {
		this.topics = {};
	}
	on(eventName: string, cb: () => {}) {
		switch (eventName) {
			case 'ready':
				cb();
		}
	}
	send(payloads: any, cb: (err, msg) => {}) {
		cb(null, payloads[0].messages);
	}
	createTopics(topic: string, cb: (err, msg) => {}) {
		this.topics[topic] = cb;
	}
}

export class KeyedMessage {

}

export class Client {

}

export class KafkaClient {
	on(eventName: string, cb: () => {}) {
		switch (eventName) {
			case 'ready':
				cb();
		}
	}
}
