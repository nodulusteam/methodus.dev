import { Client } from './client';

class Redis {
	public createClient() {
		return new Client();
	}
}

const redis = new Redis();
module.exports = redis;
