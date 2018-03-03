'use strict';

const Connection = require('./connection');

let connections = {};

class Redis {
	createClient() {
		return new Client();
	};
}

let callback: Function;
let globalcorr:string;
const redis = new Redis();
export class Client {
	constructor()
	{

	}
	subscribe(corr) {
		globalcorr = corr;
		 
	}
	on(eventname: string, cb: Function) {
		callback = cb;
		 
	}
	publish(channel, msg) {
		callback(globalcorr, msg);
	}
}
module.exports = redis;
