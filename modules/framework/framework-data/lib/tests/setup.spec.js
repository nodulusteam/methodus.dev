"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateCollections = exports.getConnection = void 0;
const path = require("path");
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer;
const opts = { useMongoClient: true }; // remove this option if you use mongoose 5 and above
const localServer = "mongodb://localhost:27017";
const config = {
    db: {
        mongo: {
            server: localServer,
            db: "test",
        },
    },
};
const connect_1 = require("../connect");
connect_1.DBHandler.config = {
    connections: {
        default: {
            server: localServer,
            db: "test",
            poolSize: 10,
            ssl: false,
            exchanges: ["event-bus", "cache-bus"],
            readPreference: "primaryPreferred",
        },
    },
};
const mongo = require("mongodb");
const collectionsNames = ["Alert", "Case", "Company", "User"];
let connection = null;
let mongoUri;
async function getConnection() {
    return new Promise(async (resolve, reject) => {
        mongo.MongoClient.connect(mongoUri, { poolSize: 10, useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return reject(err);
            }
            resolve(client.db(config.db.mongo.db));
        });
    });
}
exports.getConnection = getConnection;
function init() {
    afterEach(async () => {
        await truncateCollections();
    });
    before(async () => {
        try {
            mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
            mongoUri = localServer; //await mongoServer.getUri();
            const connection = await getConnection();
            connect_1.DBHandler.config = {
                connections: {
                    default: {
                        server: mongoUri,
                        db: "test",
                        poolSize: 10,
                        ssl: false,
                        exchanges: ["event-bus", "cache-bus"],
                        readPreference: "primaryPreferred",
                    },
                },
            };
            await Promise.all(collectionsNames.map((x) => {
                try {
                    connection.createCollection(x);
                }
                catch (error) {
                    console.log(error);
                }
            }));
            console.log(`The following collections created: ${collectionsNames.join(",")}`);
        }
        catch (err) {
            console.log(`Database failure: ${err}`);
        }
    });
    after(async () => {
        await mongoServer.stop();
    });
}
init();
async function truncateCollections() {
    console.log("Removing all collections from db");
    connection = await getConnection();
    const names = (await connection.listCollections({}).toArray()).map((collection) => collection.name);
    if (names.length === 0) {
        console.log("No collections were found in db to remove");
        return;
    }
    try {
        await Promise.all(names.map((collectionName) => connection.collection(collectionName).drop()));
        console.log(`Removed all collections from db: ${names}`);
    }
    finally {
    }
}
exports.truncateCollections = truncateCollections;
//# sourceMappingURL=setup.spec.js.map