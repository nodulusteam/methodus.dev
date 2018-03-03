'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Connection = require('./connection');
let connections = {};
class Producer {
    constructor() {
        this.topics = {};
    }
    on(eventName, cb) {
        switch (eventName) {
            case 'ready':
                cb();
        }
    }
    send(payloads, cb) {
        cb(null, payloads[0].messages);
    }
    createTopics(topic, cb) {
        this.topics[topic] = cb;
    }
}
exports.Producer = Producer;
class KeyedMessage {
}
exports.KeyedMessage = KeyedMessage;
class Client {
    constructor() {
    }
}
exports.Client = Client;
class KafkaClient {
    constructor() {
    }
    on(eventName, cb) {
        switch (eventName) {
            case 'ready':
                cb();
        }
    }
}
exports.KafkaClient = KafkaClient;
//# sourceMappingURL=index.js.map