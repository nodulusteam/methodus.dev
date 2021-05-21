const path = require('path');
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
const opts = { useMongoClient: true }; // remove this option if you use mongoose 5 and above
const localServer = process.env.MONGO_URL;
const config: any = {
    db: {
        mongo: {
            server: localServer,
            db: 'test',
        },
    },
};

// import { DBHandler } from '../connect';
// DBHandler.config = {
//     connections: {
//         default: {
//             server: localServer,
//             db: 'test',
//             poolSize: 10,
//             ssl: false,
//             exchanges: ['event-bus', 'cache-bus'],
//             readPreference: 'primaryPreferred',
//         },
//     },
// };

import * as mongo from 'mongodb';
import { Alert, Case, Company, User } from './models';

const collectionsNames = ['Alert', 'Case', 'Company', 'User'];
let connection: any = null;
let mongoUri;

export async function getConnection(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        mongo.MongoClient.connect(process.env.MONGO_URL, { poolSize: 10, useUnifiedTopology: true }, function (err: any, client: any) {
            if (err) {
                return reject(err);
            }
            resolve(client.db(config.db.mongo.db));
        });
    });
}


export async function truncateCollections() {
    await Alert.delete({},Alert,false);
    await Company.delete({},Company,false);
    await User.delete({},User,false);
    await Case.delete({},Case,false);
    
    connection = await getConnection();
    const names = (await connection.listCollections({}).toArray()).map((collection: any) => collection.name);

    if (names.length === 0) {
        // console.log('No collections were found in db to remove');
        return;
    }
    try {
        await Promise.all(names.map((collectionName: any) => connection.collection(collectionName).drop()));
        // console.log(`Removed all collections from db: ${names}`);
    } finally {
    }
}
