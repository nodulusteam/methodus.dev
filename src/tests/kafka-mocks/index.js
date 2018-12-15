"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.Client = Client;
class KafkaClient {
    on(eventName, cb) {
        switch (eventName) {
            case 'ready':
                cb();
        }
    }
}
exports.KafkaClient = KafkaClient;
//# sourceMappingURL=index.js.map