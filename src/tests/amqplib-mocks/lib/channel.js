"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const shortid = require('shortid');
const sinon = require('sinon');
function setIfUndefined(object, prop, value) {
    if (!object[prop]) {
        object[prop] = value;
    }
}
function findHandlers(connection, exchange, routingKey) {
    if (!exchange) {
        return {};
    }
    const filtered = exchange.bindings.filter(binding => binding.regex.test(routingKey));
    return __1.fp.transform(filtered, (result, binding) => {
        if (binding.queueName) {
            const queue = connection.queues[binding.queueName];
            return Object.assign(result, queue.consumers || {});
        }
        if (binding.exchangeName) {
            const boundExchange = connection.exchanges[binding.exchangeName];
            const consumers = findHandlers(connection, boundExchange, routingKey);
            return Object.assign(result, consumers || {});
        }
        return false;
    }, {});
}
function routeMessages(consumers, message) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(consumers.forEach((handler) => __awaiter(this, void 0, void 0, function* () {
            var buf = Buffer.from(JSON.stringify({ result: { 'add': 'added' } }), 'utf8');
            let messageResult = { properties: message.properties, content: buf };
            return handler(messageResult);
        })));
        return true;
    });
}
function generateBindingRegex(pattern) {
    pattern = (pattern || '#')
        .replace('.', '\\.')
        .replace('#', '(\\w|\\.)+')
        .replace('*', '\\w+');
    return new RegExp(`^${pattern}$`);
}
class Channel {
    constructor(connection) {
        this.connection = connection;
        this.ack = sinon.stub();
        this.nack = sinon.stub();
        this.reject = sinon.stub();
        this.prefetch = sinon.stub();
        this.on = sinon.stub();
        this.once = sinon.stub();
        this.trackedMessages = [];
    }
    close() {
        return true;
    }
    assertQueue(queue, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (queue === '')
                queue = shortid.generate();
            setIfUndefined(this.connection.queues, queue, { messages: [], consumers: {}, options: opt });
            return { queue, messageCount: 0, consumerCount: 0 };
        });
    }
    assertExchange(exchange, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            setIfUndefined(this.connection.exchanges, exchange, { bindings: [], options: opt });
            return { exchange };
        });
    }
    bindExchange(destination, source, pattern, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection.exchanges[source]) {
                throw new Error(`Bind to non-existing exchange: ${source}`);
            }
            const regex = generateBindingRegex(pattern);
            this.connection.exchanges[source].bindings.push({ regex, exchangeName: destination });
            return {};
        });
    }
    bindQueue(queue, exchange, pattern, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection.exchanges[exchange]) {
                throw new Error(`Bind to non-existing exchange: ${exchange}`);
            }
            const regex = generateBindingRegex(pattern);
            this.connection.exchanges[exchange].bindings.push({ regex, queueName: queue });
            return {};
        });
    }
    consume(queueName, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            const queue = this.connection.queues[queueName];
            if (!queue) {
                throw new Error(`Consuming from non-existing queue: ${queueName}`);
            }
            const consumerTag = shortid.generate();
            queue.consumers[consumerTag] = handler;
            return { consumerTag };
        });
    }
    publish(exchangeName, routingKey, content, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = this.connection.exchanges[exchangeName];
            if (!exchange) {
                throw new Error(`Publish to non-existing exchange: ${exchangeName}`);
            }
            const consumers = findHandlers(this.connection, exchange, routingKey);
            const message = { fields: { routingKey, exchange: exchangeName }, content, properties };
            this.trackedMessages.push(message);
            return routeMessages(consumers, message);
        });
    }
    deleteQueue(queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.connection.queues[queueName];
        });
    }
    sendToQueue(queueName, content, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            if (properties.replyTo) {
                queueName = properties.replyTo;
            }
            const queue = this.connection.queues[queueName];
            if (!queue) {
                return true;
            }
            const message = { fields: { routingKey: queueName }, content, properties };
            this.trackedMessages.push(message);
            return routeMessages(queue.consumers, message);
        });
    }
    // amqplib sends a null message when it receives a close event from Rabbit
    closeConsumer(queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const queue = this.connection.queues[queueName];
            if (!queue) {
                return true;
            }
            return routeMessages(queue.consumers, null);
        });
    }
}
module.exports = Channel;
//# sourceMappingURL=channel.js.map